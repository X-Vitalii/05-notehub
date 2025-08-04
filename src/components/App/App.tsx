import { useState, type ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Modal from "../Modal/Modal";
import { useDebounce } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./App.module.css";

export default function App() {
  const PER_PAGE = 12;
  // const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounce(query, 3000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedValue, page],
    queryFn: () => fetchNotes(debouncedValue, page, PER_PAGE),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  // const deleteNoteMutation = useMutation({
  //   mutationFn: (id: string) => deleteNote(id),
  //   onSuccess: () => {
  //     console.log("mutation success");
  //     toast.success("Note deleted");
  //     queryClient.invalidateQueries({
  //       queryKey: ["notes", debouncedValue, page],
  //     });
  //   },
  //   onError: () => {
  //     toast.error("Failed to delete note");
  //   },
  // });

  // const handleDelete = (id: string) => {
  //   deleteNoteMutation.mutate(id);
  // };

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Toaster position="top-right" />
      <div className={styles.app}>
        <header className={styles.toolbar}>
          <SearchBox value={query} onChangeQuery={onChangeQuery} />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(selectedPage) => setPage(selectedPage)}
            />
          )}

          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load notes</p>}

          <button className={styles.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
