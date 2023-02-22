import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import { mutate } from "swr";
import { UserContext } from "../../../../../contexts/UserProvider";
import { Spinner } from "flowbite-react";
export default React.memo(function AddNewColumn({
  boardId,
  setNewWidth,
  columnsData,
}) {
  const uid = useContext(UserContext);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const handleOpen = () => {
    setIsOpenInput((prev) => !prev);
  };

  const sendData = async (data) => {
    let alreadyExist = columnsData.find((el) =>
      el.column === data.column ? true : false
    );

    if (alreadyExist) {
      setAlreadyExist(true);
      return;
    }

    setNewWidth(true);
    setIsFetching(true);
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
    mutate("/api/getColumns");
    setIsFetching(false);
    reset();
    setNewWidth(false);
    setAlreadyExist(false);
  };

  return (
    <div className="w-[400px] bg-[#192555] mt-3 mr-3  rounded-lg">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <button
          onClick={handleOpen}
          className={
            "bg-[#6e6ae4] text-white rounded-lg shadow-lg w-full py-3" +
            (isOpenInput ? " hidden" : " ")
          }
        >
          Add new column
        </button>
        <div className={isOpenInput ? " " : " hidden"}>
          <form onSubmit={handleSubmit(sendData)}>
            <div>
              <label
                className={
                  "block  font-semibold text-md" +
                  (alreadyExist ? " text-red-500" : " text-white")
                }
              >
                {alreadyExist ? "Column already exists!!" : "Enter column name"}
              </label>
              <div className="relative w-full mt-3 flex justify-center items-center">
                <input
                  className="w-[300px] py-2 pr-[60px]  bg-[#111c44] text-white placeholder-white border-none "
                  placeholder="Enter a column name"
                  {...register("column")}
                />
                <button
                  type="submit"
                  className="absolute right-0 bg-[#6e6ae4] text-white py-2 px-3"
                >
                  {isFetching ? <Spinner /> : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
