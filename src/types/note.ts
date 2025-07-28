export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
// Tag - це те, що у завданні названо NoteTag?

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
