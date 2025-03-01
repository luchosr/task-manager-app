import { useDroppable } from '@dnd-kit/core';

type DropTaskProps = {
  status: string;
};

export default function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 text-slate-500 cursor-pointer hover:bg-gray-100 grid place-content-center mt-5"
    >
      Soltar aquí - {status}
    </div>
  );
}
