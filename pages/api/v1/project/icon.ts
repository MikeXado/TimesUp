import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { storage } from "@/models/firebase-admin";
import parseForm from "@/lib/parseForm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    const { files } = await parseForm(form, req);

    const file = files.file as any;

    if (!file && !file.filepath) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    try {
      const filename = file.newFilename;
      await storage.upload(file.filepath, {
        destination: `private/projects/icons/${filename}`,
      });

      res.status(200).json({ filename });
    } catch (err) {
      res.status(500).json({ message: "Error while uploading icon" });
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
