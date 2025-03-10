import { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import IdeaTile from "./components/IdeaTile/IdeaTile";
import NotificationBox from "./components/NotificationBox/NotificationBox";
import { sortIdeas } from "./utils/sortIdeas";
import { getCurrentDateTime } from "./utils/getCurrentDateTime";
import useNotification from "./hooks/useNotification";
import "./App.css";

export default function App() {
  const { visible, showNotification } = useNotification();

  const [ideas, setIdeas] = useState(() => {
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

  function createIdea() {
    if (typeof ideas[0] !== "undefined") {
      if (ideas[0].title === "" && ideas[0].content === "") {
        return;
      }
    }

    const { timestamp, date, time } = getCurrentDateTime();

    const newIdea = {
      id: timestamp,
      title: "",
      content: "",
      createdAt: `Created at: ${date} ${time}`,
      updatedAt: "",
      updatedTimestamp: timestamp,
      isNew: true,
    };
    setIdeas([newIdea, ...ideas]);
  }

  function updateIdea(title, content, targetId) {
    setIdeas((prevIdeas) => {
      const { date, time, timestamp } = getCurrentDateTime();

      const updatedIdeas = prevIdeas.map((idea) => {
        if (idea.id === targetId) {
          return {
            ...idea,
            title,
            content,
            updatedAt: `Updated at ${date} ${time}`,
            updatedTimestamp: timestamp,
            isNew: false,
          };
        }
        return idea;
      });
      showNotification(2500);
      return updatedIdeas;
    });
  }

  function deleteIdea(targetId) {
    setIdeas(ideas.filter((idea) => idea.id !== targetId));
  }

  function handleSort(sortType) {
    setIdeas((prevIdeas) => sortIdeas(prevIdeas, sortType));
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
        <NotificationBox visible={visible} />
      </main>
    </>
  );
}
