export interface Idea {
  id: string;
  title: string;
  content: string;
  createdTimestamp: number;
  updatedTimestamp: number | undefined;
}

export type SortType = "alphabeticalAsc" | "alphabeticalDesc" | "updatedAsc" | "updatedDesc";
