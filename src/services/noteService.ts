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
  page: number,
  perPage = 12
): Promise<NotesResponse> {
  const { data } = await axios.get<NotesResponse>("/notes", {
    params: { page, perPage, search: query },
  });
  return data;
}

export async function createNote(newNote: AddNote): Promise<Note> {
  const { data } = await axios.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(deleteId: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${deleteId}`);
  return data;
}
