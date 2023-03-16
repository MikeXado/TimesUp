import { storage } from "../../lib/firebase";

import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

interface FormData {
  files: {
    file: {
      newFilename: string;
      filepath: string;
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await new Promise<FormData>(function (resolve, reject) {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(
      req,
      function (
        err: any,
        fields: any,
        files: FormData | PromiseLike<FormData>
      ) {
        if (err) return reject(err);
        resolve(files);
      }
    );
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
