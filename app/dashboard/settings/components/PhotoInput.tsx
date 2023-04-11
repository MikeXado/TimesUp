import Image from "next/image";
import React, {useState , useEffect} from "react";

export default function PhotoInput({ register , inputFile }) {
  const [previewUrl , setPreviewUrl] = useState("")
  
  useEffect(() => {
    const file = inputFile && inputFile[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
     reader.onloadend = () => {
      setPreviewUrl(`${reader.result}`);
     }
    }
  } , [inputFile])

  return (
    <>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-[70px] h-[70px]  border-2 border-[#6e6ae4] rounded-full cursor-pointer bg-[#192555] "
      >
        {previewUrl.length > 0 ? <Image src={previewUrl} height={70} width={70}  className="w-[70px] h-[70px] rounded-full" alt="user-image" />  : 
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
              fill="#6e6ae4"
            />
          </svg>
        </div>
}
        <input

          id="dropzone-file"
          type="file"
          className="hidden"
          {...register("file")}
          accept="image/png, image/jpeg"
          
        />
      </label>
    </>
  );
}
