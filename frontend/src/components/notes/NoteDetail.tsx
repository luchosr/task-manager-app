import { deleteNote } from '@/api/NoteAPI';
import { useAuth } from '@/hooks/useAuth';
import { Note } from '@/types/index';
import { formatDate } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type NoteDetailProps = {
  note: Note;
};
export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();

  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get('viewTask')!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.info(data);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
  });

  if (isLoading) return <p>Cargando...</p>;
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="">
        {' '}
        <p>
          {note.content} por :{' '}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-600 text-xs text-white font-bold py-2 px-4 rounded"
          onClick={() => mutate({ noteId: note._id, projectId, taskId })}
        >
          Eliminar
        </button>
      )}{' '}
    </div>
  );
}
