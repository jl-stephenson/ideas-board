import { Idea } from "./types/types.ts";

type SortType = "alphabeticalAsc" | "alphabeticalDesc" | "updatedAsc" | "updatedDesc";

export function sortIdeas(ideas: Idea[], sortType: SortType): Idea[] {
  if (ideas.length === 0) {
    return ideas;
  }

  switch (sortType) {
    case "alphabeticalAsc": {
      return ideas.toSorted((a, b) => {
        const aLower = a.title.toLowerCase();
        const bLower = b.title.toLowerCase();

        if (aLower > bLower) {
          return 1;
        }

        if (aLower < bLower) {
          return -1;
        }

        return 0;
      });
    }
    case "alphabeticalDesc": {
      return ideas.toSorted((a, b) => {
        const aLower = a.title.toLowerCase();
        const bLower = b.title.toLowerCase();

        if (aLower < bLower) {
          return 1;
        }

        if (aLower > bLower) {
          return -1;
        }

        return 0;
      });
    }
    case "updatedAsc": {
      return ideas.toSorted((a, b) => {
        let timeA = a.updatedTimestamp ?? 0;
        let timeB = b.updatedTimestamp ?? 0;
        return timeB - timeA;
      });
    }
    case "updatedDesc": {
      return ideas.toSorted((a, b) => {
        let timeA = a.updatedTimestamp ?? 0;
        let timeB = b.updatedTimestamp ?? 0;
        return timeA - timeB;
      });
      
    }
    default:
      return ideas;
  }
}
