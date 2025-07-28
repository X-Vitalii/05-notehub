import axios from "axios";
import type { Note, AddNote } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number
): Promise<NotesResponse> {
  const { data } = await axios.get<NotesResponse>("/notes", {
    params: { page, ...(query && { search: query }) },
  });
  return data;
}

const newNote = {
  title: "Next note",
  content: "test",
  tag: "Todo",
};

export async function createNote(newNote: AddNote) {
  const { data } = await axios.post<NotesResponse>("/notes", newNote);
  // .then((response) => console.log(response.data.addNote.id)) // як повернути останню створену нотатку?
  // .catch((error) => console.log(error));
  return data; // як повернути останню створену нотатку?
}

const deleteId = 1;

export function deleteNote(deleteId: number) {
  axios
    .delete(`/notes/${deleteId}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
  return "1"; //повертає інформацію про видалену нотатку у відповіді
}
