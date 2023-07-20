import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TasksSort() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="priority">Priority</SelectItem>
        <SelectItem value="date">Created At</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default TasksSort;
