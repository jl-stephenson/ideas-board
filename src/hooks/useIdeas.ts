import { useNotification } from "./useNotification";
import { usePersistedState } from "./usePersistedState";
import { sortIdeas } from "../utils/sortIdeas";
import { Idea, SortType } from "../utils/types/types";
import { useCallback } from "react";

export function useIdeas() {
  const { visible, showNotification } = useNotification();
  const [ideas, setIdeas] = usePersistedState<Idea[]>("ideas", []);

  const createIdea = useCallback((): void => {
    setIdeas((prevIdeas) => {
      if (prevIdeas[0]?.title === "" && prevIdeas[0]?.content === "") {
        return prevIdeas;
      }

      const now: number = Date.now();
      const newIdea = {
        id: String(now),
        title: "",
        content: "",
        createdTimestamp: now,
        updatedTimestamp: undefined,
      };
      return [newIdea, ...prevIdeas];
    });
  }, [setIdeas]);

  const updateIdea = useCallback(
    (title: string, content: string, id: string): void => {
      const now: number = Date.now();
      let wasModified: boolean = false;
      const updatedIdeas = ideas.map((idea: Idea) => {
        if (idea.id === id) {
          if (idea.title !== title || idea.content !== content) {
            wasModified = true;
            return {
              ...idea,
              title,
              content,
              updatedTimestamp: now,
            };
          }
        }
        return idea;
      });
      if (wasModified) {
        setIdeas(updatedIdeas);
        showNotification(2500);
      }
    },
    [setIdeas, showNotification],
  );

  const deleteIdea = useCallback(
    (id: string): void => {
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
    },
    [setIdeas],
  );

  const handleSort = useCallback(
    (sortType: SortType): void => {
      setIdeas((prevIdeas) => sortIdeas(prevIdeas, sortType));
    },
    [setIdeas],
  );

  return {
    ideas,
    createIdea,
    updateIdea,
    deleteIdea,
    handleSort,
    visible,
  };
}
