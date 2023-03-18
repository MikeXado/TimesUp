import { useState } from "react";
import { KanbanTaskType, SubtasksType } from "../../../../../../../types";
import { useMutation } from "../../../../../../../utils/fetcher";
export default function Subtask({
  subtask,
  task,
}: {
  subtask: SubtasksType;
  task: KanbanTaskType | undefined;
}) {
  const [done, setDone] = useState(subtask.done);
  const changeSubtasks = useMutation(
    `/api/v1/${task?.uid}/kanban/${task?.boardId}/${task?.id}/${subtask.id}`
  );
  const handleChange = async (e: { target: { checked: any } }) => {
    let done = e.target.checked;
    setDone(done);

    await changeSubtasks(
      {
        id: subtask.id,
        title: subtask.title,
        done: done,
        taskId: task?.id,
        boardId: task?.boardId,
        uid: task?.uid,
      },
      [`/api/v1/${task?.uid}/kanban/${task?.boardId}/${task?.id}/subtasks`],
      "PUT"
    );
  };
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="done"
          type="checkbox"
          value=""
          checked={done}
          className="w-4 h-4 text-[#6e6ae4] bg-transparent border-[#6e6ae4]  rounded focus:ring-[#6e6ae4] dark:focus:ring-[#6e6ae4]  focus:ring-2 "
          onChange={handleChange}
        />

        <label
          htmlFor="done"
          className={
            "ml-2 text-sm font-medium text-white " +
            (done ? " line-through" : " ")
          }
        >
          {subtask.title}
        </label>
      </div>
    </>
  );
}
