import { QueryClient, useMutation } from "@tanstack/react-query";
import styles from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import type { AddNote } from "../../types/note";

interface NoteFormProps {
  onSubmit: (query: string) => void;
}

export default function NoteForm() {
  const mutation = useMutation({
    mutationFn: (newNote: AddNote) => createNote(newNote),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  // const handleSubmit = (FormData: FormData) => {
  //   mutation.mutate({
  //     text: FormData.get("text") as string.
  //   });
  // };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={styles.input} />
        <span name="title" className={styles.error} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={styles.textarea}
        />
        <span name="content" className={styles.error} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={styles.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span name="tag" className={styles.error} />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          // disabled=false
        >
          Create note
        </button>
      </div>
    </form>
  );
}
