import "./App.css";
import Header from "./components/Header/Header";
import IdeaTile from "./components/IdeaTile/IdeaTile";
import { sortIdeas } from "./utils/sortIdeas";
import { getCurrentDateTime } from "./utils/getCurrentDateTime";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [newIdeaId, setNewIdeaId] = useState(null);
  const titlesRef = useRef(null);

  const [ideas, setIdeas] = useState(() => {
    const savedIdeas = localStorage.getItem("ideas");

    if (savedIdeas) {
      return JSON.parse(savedIdeas);
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (newIdeaId !== null) {
      focusNewTitle(newIdeaId);
    }
  }, [newIdeaId]);

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
    };
    setIdeas([newIdea, ...ideas]);
    setNewIdeaId(newIdea.id);
  }

  function updateIdea(titleValue, contentValue, targetId) {
    setIdeas((prevIdeas) => {
      const { date, time, timestamp } = getCurrentDateTime();

      const updatedIdeas = prevIdeas.map((idea) => {
        if (idea.id === targetId) {
          return {
            ...idea,
            title: titleValue,
            content: contentValue,
            updatedAt: `Updated at ${date} ${time}`,
            updatedTimestamp: timestamp,
          };
        }
        return idea;
      });
      return updatedIdeas;
    });
  }

  function deleteIdea(targetId) {
    setIdeas(ideas.filter((idea) => idea.id !== targetId));
  }

  function getMap() {
    if (!titlesRef.current) {
      titlesRef.current = new Map();
    }
    return titlesRef.current;
  }

  function focusNewTitle(id) {
    const map = getMap();
    const node = map.get(id);
    node.focus();
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
                titleRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(idea.id, node);
                  } else {
                    map.delete(idea.id);
                  }
                }}
              />
            ))}
        </div>
        <NotificationBox visible={visible} />
      </main>
    </>
  );
}
