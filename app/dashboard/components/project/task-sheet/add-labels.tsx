import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

function AddLabels({
  labels,
  setLabels,
}: {
  labels: string[];
  setLabels: (prev: string[]) => void;
}) {
  const [newLabel, setNewLabel] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewLabel(e.target.value);
  };

  const handleAddLabel = () => {
    if (newLabel.trim() !== "") {
      setLabels([...labels, newLabel]);
      setNewLabel("");
    }
  };

  const handleDeleteLabel = (index: number) => {
    const updatedLabels = [...labels];
    updatedLabels.splice(index, 1);
    setLabels(updatedLabels);
  };

  return (
    <div className="w-full">
      <Label htmlFor="label" className="font-semibold">
        Add labels
      </Label>

      <ul className="list-disc pl-5 mt-5 space-y-5">
        {labels.map((label, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="mr-2">{label}</span>
            <button
              type="button"
              className="text-red-500 border-none  rounded cursor-pointer"
              onClick={() => handleDeleteLabel(index)}
            >
              <Trash2 size={25} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center space-x-2">
        <Input
          id="label"
          value={newLabel}
          onChange={handleInputChange}
          className=" rounded-lg w-full"
          placeholder="Enter label name..."
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleAddLabel();
          }}
          className="bg-orange-200 text-orange-500 border-none py-2 px-5 rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddLabels;
