export function sortIdeas(ideas, sortType) {
  const sorted = [...ideas];

  switch (sortType) {
    case "alphabeticalAsc": {
      sorted.sort((a, b) => {
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
      sorted.sort((a, b) => {
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
      sorted.sort((a, b) => b.updatedTimestamp - a.updatedTimestamp);
      break;
    }
    case "updatedDesc": {
      sorted.sort((a, b) => a.updatedTimestamp - b.updatedTimestamp);
      break;
    }
    default:
      break;
  }

  return sorted;
}
