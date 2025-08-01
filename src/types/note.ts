export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export interface AddNote {
  title: string;
  content: string;
  tag: Tag;
}
