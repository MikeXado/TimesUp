"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useForm } from "react-hook-form";

const Chart = dynamic(() => import("./Chart"));
export default function KanbanStatistics({ boards }) {
  const { register, watch } = useForm();

  const selectedBoard = watch("board");
  return (
    <div className="bg-[#111c44] h-full rounded-lg px-3 py-3">
      <form>
        <label
          htmlFor="boards"
          className="block mb-2 text-lg font-semibold text-white"
        >
          Kanban Totals
        </label>
        <select
          id="boards"
          className="appearance-none bg-[#192555] text-white border border-indigo-700  mb-6 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
          {...register("board")}
        >
          <option value="">Choose an board</option>
          {boards.map((board) => {
            return (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            );
          })}
        </select>
      </form>

      {!selectedBoard ? (
        <div className="flex justify-center text-white text-lg font-semibold">
          No board selected
        </div>
      ) : (
        <Chart selectedBoard={selectedBoard} />
      )}
    </div>
  );
}
