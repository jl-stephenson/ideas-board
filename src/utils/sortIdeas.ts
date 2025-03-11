import { Idea } from "./types/types.ts";

export function sortIdeas(ideas: Idea[], sortType: string) {
  if (ideas.length === 0) {
    return ideas;
  }

  let sortedIdeas: Idea[] = ideas;

  switch (sortType) {
    case "alphabeticalAsc": {
      sortedIdeas = ideas.toSorted((a, b) => {
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
      sortedIdeas = ideas.toSorted((a, b) => {
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
      sortedIdeas = ideas.toSorted((a, b) => {
        let timeA = a.updatedTimestamp ?? 0;
        let timeB = b.updatedTimestamp ?? 0;
        return timeB - timeA;
      });
      break;
    }
    case "updatedDesc": {
      sortedIdeas = ideas.toSorted((a, b) => {
        let timeA = a.updatedTimestamp ?? 0;
        let timeB = b.updatedTimestamp ?? 0;
        return timeA - timeB;
      });
      break;
    }
    default:
      break;
  }

  return sortedIdeas;
}
