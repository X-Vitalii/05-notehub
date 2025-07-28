import { useState, useEffect, type ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import type { Note } from "../../types/note";
import Modal from "../Modal/Modal";
import { useDebounce } from "use-debounce";

import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";

import { Toaster, toast } from "react-hot-toast";

import styles from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounce(query, 3000);
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", debouncedValue, page],
    queryFn: () => fetchNotes(debouncedValue, page),
    placeholderData: keepPreviousData,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <>
      <div className={styles.app}>
        <header className={styles.toolbar}>
          <SearchBox value={query} onChangeQuery={onChangeQuery} />
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
          <button className={styles.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm />
          </Modal>
        )}
      </div>
    </>
  );
}
