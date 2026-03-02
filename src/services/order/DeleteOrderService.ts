
import prismaClient from "../../prisma/index";


interface DeleteOrderProps {
        order_id: string;
}

class DeleteOrderService {
    async execute({order_id}: DeleteOrderProps) {
        try {
            // verificar se order_id existe
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })

            if(!order) {
                throw new Error("Falha ao deletar o pedido")
            }

            // Atualiza a propriedade DRAFT para false (enviar para cozinha)
            await prismaClient.order.delete({
                where: {
                    id: order_id
                }
            })

            return { message: "Pedido deletado com sucesso!"}

        }catch (err) {
            console.log(err);
            throw new Error("Falha ao deletar o pedido ")
        }
    }
}

export { DeleteOrderService };