import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { SubtaskType } from "@/types";
import { Trash2 } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { mutate } from "swr";

interface SubtasksTypeWithId extends SubtaskType {
  id?: string;
}

function AddSubtasks({
  subtasks,
  setSubtasks,

  projectId,
  taskId,
  subtaskId,
}: {
  projectId?: string;
  taskId?: string;
  subtaskId?: string;
  subtasks: SubtasksTypeWithId[];
  setSubtasks: (prev: SubtaskType[]) => void;
}) {
  const [newSubtask, setNewSubtask] = useState<string>("");
  const scrollTo = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewSubtask(e.target.value);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim() !== "") {
      setSubtasks([...subtasks, { title: newSubtask, done: false }]);
      setNewSubtask("");
      scrollToBottom();
    }
  };

  const handleDeleteSubtask = async (index: number, subtaskId?: string) => {
    if (subtaskId) {
      const res = await fetch("/api/v1/project/tasks/subtasks/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, taskId, subtaskId }),
      });
      const data = await res.json();
      if (res.ok) {
        mutate("/api/v1/project/tasks/subtasks/get", null, true);
        toast({
          title: "Success",
          description: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: data.message,
        });
      }
    }
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const scrollToBottom = () => {
    if (scrollTo.current) {
      scrollTo.current.scrollTop =
        scrollTo.current.scrollHeight - scrollTo.current.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [subtasks]);

  return (
    <div className="w-full">
      <Label htmlFor="subtask" className="font-semibold">
        Add/Edit Subtasks
      </Label>

      <ul className="list-disc pl-5 mt-5 space-y-5">
        {subtasks?.map((subtask, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="mr-2">{subtask.title}</span>
            <button
              type="button"
              className="text-red-500 border-none  rounded cursor-pointer"
              onClick={() => handleDeleteSubtask(index, subtask.id)}
            >
              <Trash2 size={25} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center space-x-2">
        <Input
          id="subtask"
          value={newSubtask}
          onChange={handleInputChange}
          className=" rounded-lg w-full"
          placeholder="Enter subtask name..."
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleAddSubtask();
          }}
          className="bg-green-200 text-green-800 border-none py-2 px-5 rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddSubtasks;
