import { useDroppable } from "@dnd-kit/core";

export default function Droppable({ children, dropableName }) {
  const { setNodeRef } = useDroppable({ id: dropableName });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col px-1 py-1 overflow-y-auto overflow-x-hidden max-h-28 "
    >
      {children}
    </div>
  );
}
