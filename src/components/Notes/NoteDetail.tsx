import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import Loader from "../Utils/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  const params = useParams();

  const projectId = params.projejectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const { data, isLoading } = useAuth();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(data);
    },
  });

  if (isLoading) return <Loader />;

  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  if (data)
    return (
      <>
        <div className="p-3 flex justify-between items-center">
          <div>
            <p className="font-bold">{note.content}</p>
            <p>{formatDate(note.createdAt)}</p>
          </div>

          {canDelete && (
            <button
              className="bg-red-400 hover:-bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
              type="button"
              onClick={() => mutate({ projectId, taskId, noteId: note._id })}
            >
              Delete
            </button>
          )}
        </div>
      </>
    );
};

export default NoteDetail;
