import prismaClient from "../../prisma/index";

interface CreateOrderServicesProps {
  table: number;
  name: string;
}

class CreateOrderService {
  async execute({ table, name }: CreateOrderServicesProps) {
    try {
      const order = await prismaClient.order.create({
        data: {
          table: table,
          name: name ?? "",
        },
        select: {
          id: true,
          table: true,
          status: true,
          draft: true,
          name: true,
          createdAt: true,
        },
      });
      return order;
    } catch (err) {
      throw new Error("Falha ao criar pedido");
    }
  }
}

export default CreateOrderService;
