import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import EditTask from "./Edit";

export default function More({
  isOpen,
  setIsOpen,
  taskId,
  boardId,
  uid,
  setIsDeleting,
  startTransition,
  task,
}) {
  const router = useRouter();
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
    await fetch("/api/deleteTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId, boardId, uid }),
    });
    setIsDeleting(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={
        "z-10 absolute top-5 right-0 shadow-lg border bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700 dark:divide-gray-600" +
        (isOpen ? " " : " hidden")
      }
    >
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>Choose an option</div>
      </div>
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 px-4">
        <EditTask task={task} uid={uid} />
        <button
          onClick={deleteTask}
          className="bg-red-500 text-white py-2 px-10 flex justify-center w-full rounded-lg"
        >
          Delete
        </button>
      </ul>
    </div>
  );
}
