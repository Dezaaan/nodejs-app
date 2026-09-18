export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateNoteData = Omit<Note, "createdAt">;

export type NotesSortField = "createdAt" | "updatedAt" | "title";

export type SortOrder = "asc" | "desc";

export type NotesQueryOptions = {
  page: number;
  pageSize: number;

  search?: string;
  title?: string;

  sortBy: NotesSortField;
  sortOrder: SortOrder;
};
