import prismaClient from "../../prisma";

interface DeleteProductServiceProps {
    product_id: string;
}

class DeleteProductService {
    async execute({product_id}: DeleteProductServiceProps) {

        try {
            await prismaClient.product.update({
                where: {
                    id: product_id,  
                },
                data: {
                        disabled: true,
                },
            });

            return { message: "Produto desativado com sucesso!" };
        } catch (err) {
            console.log(err);
            throw new Error("Falha ao desativar produto");
        }

    }
}

export { DeleteProductService };