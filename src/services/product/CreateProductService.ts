import { Readable } from "node:stream";
import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { th } from "zod/v4/locales";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateproductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    // ENVIAR PRO CLOUDINARY SALVAR A IMAGEM E PEGAR A URL
    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}-${imageName.split(".")[0]}`, // pizza calabresa . png
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        // Criar o stream do Buffer e fazer o pipe para o cloudinary
        const bufferStream = Readable.from(imageBuffer);
        bufferStream.pipe(uploadStream);
      });

      bannerUrl = result.secure_url;

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao fazer o upload da imagem");
    }

    // SALVAR A URL DA IMAGEM E OS DADOS NO BANCO COMO UM NOVO PRODUTO
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: bannerUrl,
        category_id: category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category_id: true,
        banner: true,
        createdAt: true,
      }
    });

    return product;
  }
}

export { CreateproductService };
