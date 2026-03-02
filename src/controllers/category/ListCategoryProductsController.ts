import { Request, Response } from "express";
import ListCategoryProductsService from "../../services/category/ListCategoryProductsService";

class ListCategoryProductsController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;
        if (!category_id) {
            return res.status(400).json({ error: "category_id é obrigatório" });
        }
        const service = new ListCategoryProductsService();
        const products = await service.execute({ category_id });
        return res.json(products);
    }
}

export { ListCategoryProductsController };