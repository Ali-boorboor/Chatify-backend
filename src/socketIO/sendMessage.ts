import { editOneChatByID } from "#s/chats.service";
import { createMessage } from "#s/messages.service";
import type { FastifyInstance } from "fastify/types/instance";
import type { messageDatasSocketType } from "#t/types";
import type { Socket } from "socket.io";

const sendMessage = (fastify: FastifyInstance, socket: Socket) => {
  try {
    socket.on(
      "sendNewMessage",
      async (messageDatas: messageDatasSocketType) => {
        const newMessageDatas = await createMessage({
          message: messageDatas?.message,
          sender: messageDatas?.senderID,
        });

        await editOneChatByID(messageDatas?.chatID, {
          $push: { messages: newMessageDatas?._id },
        });

        fastify.io.to(messageDatas?.chatID).emit("newMessage", newMessageDatas);
      }
    );
  } catch (err: any) {
    throw fastify.httpErrors.internalServerError(err?.message);
  }
};

export default sendMessage;
