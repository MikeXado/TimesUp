import parseForm from "@/lib/parseForm";
import { storage } from "@/models/firebase-admin";
import { getUser } from "@/viewmodels/firebase/auth";
import { parse } from "cookie";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    const { files, fields } = await parseForm(form, req);

    const file = files.file as any;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const data = await getUser(token);

    if (!file && !file.filepath) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    try {
      const fileExtension = file.newFilename.split(".").pop();
      const filename = data.uid + `.${fileExtension}`;
      await storage.upload(file.filepath, {
        destination: `private/users/icons/${filename}`,
      });

      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      const photoUrlRef = storage.file(`private/users/icons/${filename}`);

      const url = await photoUrlRef.getSignedUrl({
        action: "read",
        expires: expires.getTime(),
      });

      res.status(200).json({ message: url[0] });
    } catch (err) {
      res.status(500).json({ message: "Error while uploading photo url" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
