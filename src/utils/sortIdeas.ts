import { Idea } from "./types/types.ts";

export function sortIdeas(ideas: Idea[], sortType: string) {
  const sorted = [...ideas];

  switch (sortType) {
    case "alphabeticalAsc": {
      ideas.toSorted((a, b) => {
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
      break;
    }
    case "alphabeticalDesc": {
      ideas.sort((a, b) => {
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
      break;
    }
    case "updatedAsc": {
      ideas.toSorted((a, b) => b.updatedTimestamp - a.updatedTimestamp);
      break;
    }
    case "updatedDesc": {
      ideas.toSorted((a, b) => a.updatedTimestamp - b.updatedTimestamp);
      break;
    }
    default:
      break;
  }

  return sorted;
}
