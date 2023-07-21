import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

function UserIconForm({ setFile }: { setFile: (prev: File | null) => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      createBlob(file);
      setFile(file);
    }
  };

  function createBlob(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const blob = new Blob([event.target?.result as ArrayBuffer], {
        type: file.type,
      });

      displayImage(blob);
    };

    reader.readAsArrayBuffer(file);
  }

  const displayImage = (blob: Blob) => {
    const imageUrl = URL.createObjectURL(blob);
    setPreviewUrl(imageUrl);
  };

  return (
    <div className="flex items-center mt-5">
      <label
        htmlFor="dropzone-file"
        className=" w-[100px] h-[100px] rounded-full border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50   hover:bg-gray-100 "
      >
        <div className="flex items-center w-full h-full justify-center ">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="image"
              width={300}
              height={300}
              className="h-[90px] w-[90px] rounded-full"
            />
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-8 h-8  text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </>
          )}
        </div>

        <input
          id="dropzone-file"
          type="file"
          accept=".jpg, .png, .gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default UserIconForm;
