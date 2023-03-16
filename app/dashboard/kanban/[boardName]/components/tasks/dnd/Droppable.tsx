import { useDroppable } from "@dnd-kit/core";
export default function Droppable({ children, dropableName }) {
  const { setNodeRef } = useDroppable({
    id: dropableName,
  });

  return (
    <ul ref={setNodeRef} className={"flex flex-col w-full"}>
      {children}
    </ul>
  );
}
