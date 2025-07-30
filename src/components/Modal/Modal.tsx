import { createPortal } from "react-dom";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./Modal.module.css";
import type { Note } from "../../types/note";

interface ModalProps {
  note: Note;
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById("modal-root")!;

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>{<NoteForm onClose={onClose} />}</div>
    </div>,
    modalRoot
  );
}
