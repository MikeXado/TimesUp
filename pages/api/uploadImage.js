import { storage } from "../../lib/firebase";
import { uploadBytes, ref, listAll, deleteObject } from "firebase/storage";
import nextConnect from "next-connect";
import formidable from "formidable";
import { v4 } from "uuid";

export default async function handler(req, res) {
  const data = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ files });
    });
  });

  try {
    const file = storage.file(data.files.file.newFilename);
    await storage.upload(data.files.file.filepath);
    const url = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2500",
    });

    res.status(200).json(url[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
