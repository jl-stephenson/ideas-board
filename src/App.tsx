import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import IdeaTile from "./components/IdeaTile";
import NotificationBox from "./components/NotificationBox";
import { sortIdeas } from "./utils/sortIdeas";
import { getCurrentDateTime } from "./utils/getCurrentDateTime";
import useNotification from "./hooks/useNotification";
import { Idea } from "./utils/types/types";
import "./App.css";

export default function App() {
  const { visible, showNotification } = useNotification();

  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const savedIdeas = localStorage.getItem("ideas");

    if (savedIdeas) {
      return JSON.parse(savedIdeas);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  function createIdea(): void {
      if (ideas[0]?.title === "" && ideas[0]?.content === "") {
        return;
      }

    const now = Date.now()

    const newIdea = {
      id: now,
      title: "",
      content: "",
      createdTimestamp: now,
      updatedTimestamp: undefined,
      isNew: true,
    };
    setIdeas([newIdea, ...ideas]);
  }

  function updateIdea(title: string, content: string, id: number): void {
    setIdeas(() => {
      const now = Date.now();

      const updatedIdeas = ideas.map((idea: Idea) => {
        if (idea.id === id) {
          return {
            ...idea,
            title,
            content,
            updatedTimestamp: now,
            isNew: false,
          };
        }
        return idea;
      });
      showNotification(2500);
      return updatedIdeas;
    });
  }

  function deleteIdea(id: number): void {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  }

  function handleSort(sortType: string): void {
    setIdeas(() => sortIdeas(ideas, sortType));
  }

  return (
    <>
      <Header createIdea={createIdea} handleSort={handleSort} />
      <main className="wrapper">
        <div className="idea-grid">
          {ideas.length > 0 &&
            ideas.map((idea) => (
              <IdeaTile
                key={idea.id}
                idea={idea}
                id={idea.id}
                updateIdea={updateIdea}
                deleteIdea={deleteIdea}
                isNew={idea.isNew}
              />
            ))}
        </div>
        {visible && <NotificationBox />}
      </main>
    </>
  );
}
