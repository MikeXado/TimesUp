import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
