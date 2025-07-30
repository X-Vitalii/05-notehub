import styles from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) return null;

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li className={styles.listItem} key={note.id}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>

          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button className={styles.button} onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
