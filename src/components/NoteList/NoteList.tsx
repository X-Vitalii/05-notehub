import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import styles from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  // onDelete: (id: string) => void;
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { deleteNote } = await import("../../services/noteService");
      return deleteNote(id);
    },
    onSuccess: () => {
      toast.success("Note deleted");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  if (notes.length === 0) return null;

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li className={styles.listItem} key={note.id}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>

          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              className={styles.button}
              // onClick={() => onDelete(note.id)}
              onClick={() => handleDelete(note.id)}
              // disabled={deleteNoteMutation.isPending}
            >
              {/* {deleteNoteMutation.isPending ? "Deleting ..." : "Delete"} */}
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
