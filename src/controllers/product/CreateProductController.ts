import { Request, Response } from "express";
import { CreateproductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        if (!req.file) {
            throw new Error("A imagem do produto é obrigatória");
        }
        // Lógica para criar um produto
    const createProduct = new CreateproductService();
    const product = await createProduct.execute({
        name: name, 
        price: parseInt(price), // convert string para int para ter o valor em centavos
        description: description, 
        category_id: category_id, 
        imageBuffer: req.file.buffer, 
        imageName: req.file.originalname,
    });
    res.json(product);
    }   

}

export { CreateProductController };