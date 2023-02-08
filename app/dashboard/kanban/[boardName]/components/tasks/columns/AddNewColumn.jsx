import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddNewColumn({ uid, boardId }) {
  const [isOpenInput, setIsOpenInput] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleOpen = () => {
    setIsOpenInput((prev) => !prev);
  };

  const sendData = async (data) => {
    await fetch("/api/addColumn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column: data.column,
        uid: uid,
        boardId: boardId,
      }),
    });
    reset();
  };

  return (
    <div className="w-[500px] bg-[#F5F5F5]  mt-3 mr-3 px-4 rounded-lg">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <button
          onClick={handleOpen}
          className={
            "bg-white rounded-lg shadow-lg w-full py-3" +
            (isOpenInput ? " hidden" : " ")
          }
        >
          Add new column
        </button>
        <div className={isOpenInput ? " " : " hidden"}>
          <form onSubmit={handleSubmit(sendData)}>
            <div className="relative w-full flex justify-center items-center">
              <input
                className="w-full py-2 px-1 pr-10"
                placeholder="Enter a column name"
                {...register("column")}
              />
              <button
                type="submit"
                className="absolute right-0 bg-blue-500 text-white py-2 px-3"
              >
                Add
              </button>
            </div>
          </form>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="colorPicker"
            >
              Choose color
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
