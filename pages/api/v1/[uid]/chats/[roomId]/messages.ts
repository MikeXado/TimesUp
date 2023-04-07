import { uuidv4 } from "@firebase/util";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addMessage,
  getMessages,
  getSpecificUser,
} from "../../../../../../lib/db";
import { serverPusher } from "../../../../../../pusher";
import { MessageType } from "../../../../../../types";
import formidable from "formidable";
import { storage } from "../../../../../../lib/firebase";
import fs from "fs";
import { promisify } from "util";

import Cryptr from "cryptr";
const cryptr = new Cryptr(`${process.env.KEY}`);

const readFileAsync = promisify(fs.readFile);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, roomId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "GET") {
    try {
      const messages = await getMessages(roomId, uid);
      const newMessages: MessageType[] = []
      messages.forEach(data => {
        if(data.message.type === "audio") {
           data.message.value = JSON.parse(data.message.value)
        }
        newMessages.push(data)
      })
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();

      const formData = await new Promise<any>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      const { id, message, members, currentUser } = JSON.parse(
        formData.fields.messageData
      );

      const regU = await getSpecificUser(currentUser);
      const sendingMessage: MessageType = {
        message: message,
        displayName: regU.displayName,
        email: regU.email,
        uid: regU.uid,
        id: uuidv4(),
      };

      if (message.type === "audio") {
        const options = {
          metadata: {
            contentType: "audio/webm",
            metadata: {
              firebaseStorageDownloadTokens: uuidv4(),
              authorizedUsers: JSON.stringify(members),
            },
          },
        };

        const file = formData.files.audio;

        const buffer = await readFileAsync(file.filepath);
        const ecr =  cryptr.encrypt(JSON.stringify(buffer));
        const audioRef = storage.file(
          `audioRooms/${id}/${file.newFilename}.webm`
        );
        await audioRef.save(ecr, options);

        sendingMessage.message = {
          type: "audio",
          value: audioRef.name,
        };
      }
      

   
      serverPusher.trigger("messages", "new-message", sendingMessage);
      await addMessage(id, sendingMessage, members, currentUser);
      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
