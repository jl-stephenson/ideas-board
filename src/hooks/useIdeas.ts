import { useNotification } from "./useNotification";
import { usePersistedState } from "./usePersistedState";
import { sortIdeas } from "../utils/sortIdeas";
import { Idea } from "../utils/types/types";
import { useCallback } from "react";

export function useIdeas() {
  const { visible, showNotification } = useNotification();
  const [ideas, setIdeas] = usePersistedState<Idea[]>("ideas", []);

  const createIdea = useCallback((): void => {
    setIdeas((prevIdeas) => {
      if (ideas[0]?.title === "" && ideas[0]?.content === "") {
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
      return [newIdea, ...ideas];
    });
  }, [setIdeas]);

  const updateIdea = useCallback(
    (title: string, content: string, id: string): void => {
      setIdeas((prevIdeas) => {
        const now: number = Date.now();
        const updatedIdeas = prevIdeas.map((idea: Idea) => {
          if (idea.id === id) {
            return {
              ...idea,
              title,
              content,
              updatedTimestamp: now,
            };
          }
          return idea;
        });
        return updatedIdeas;
      });
      showNotification(2500);
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
    (sortType: string): void => {
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
