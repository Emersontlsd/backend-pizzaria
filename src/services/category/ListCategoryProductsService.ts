import prismaClient from "../../prisma/index";

interface ListCategoryProductsProps {
    category_id: string;
}

class ListCategoryProductsService {
    async execute({ category_id }: ListCategoryProductsProps) {
        const products = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                disabled: true,
                category_id: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return products;
    }
}

export default ListCategoryProductsService;