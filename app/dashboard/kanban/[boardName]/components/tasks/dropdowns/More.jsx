import { useRouter } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "../../../../../../../utils/fetcher";
import EditTask from "./Edit";

export default React.memo(function More({ isOpen, setIsOpen, task }) {
  const removeTask = useMutation("/api/deleteTask");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const deleteTask = async () => {
    setIsDeleting(true);
    removeTask({ taskId: task.id, boardId: task.boardId, uid: task.uid });
    setIsDeleting(false);
    toast.success("Task deleted successfully");
  };

  return (
    <div
      ref={wrapperRef}
      className={
        "z-10 absolute top-5 right-0 shadow-lg  bg-[#111c44] rounded-lg  w-44  " +
        (isOpen ? " " : " hidden")
      }
    >
      <ul className="py-2 text-sm text-gray-700  px-4">
        <EditTask task={task} />
        <button
          onClick={deleteTask}
          className="bg-red-500 text-white py-2 px-10 flex justify-center w-full rounded-lg"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </ul>
    </div>
  );
});
