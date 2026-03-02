
import prismaClient from "../../prisma/index";


interface SendOrderprops {
    name: string;
    order_id: string;
}

class SendOrderService {
    async execute({name, order_id}: SendOrderprops) {
        try {
            // verificar se order_id existe
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })

            if(!order) {
                throw new Error("Falha ao enviar o pedido")
            }

            // Atualiza a propriedade DRAFT para false (enviar para cozinha)
            const updateOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    draft: false,
                    name: name
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    draft: true,
                    status: true,
                    createdAt: true
                }
            })

            return updateOrder;

        }catch (err) {
            console.log(err);
            throw new Error("Falha ao enviar o pedido ")
        }
    }
}

export { SendOrderService };