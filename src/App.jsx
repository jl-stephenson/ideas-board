import "./App.css";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header";
import IdeaTile from "./components/IdeaTile/IdeaTile";
import { timeCreated } from "./utils/timeCreated";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdeaId, setNewIdeaId] = useState(null);
  const titlesRef = useRef(null);

  useEffect(() => {
    if (newIdeaId !== null) {
      focusNewTitle(newIdeaId);
    }
  }, [newIdeaId]);

  function createIdea() {
    if (typeof ideas[0] !== "undefined") {
      if (ideas[0].title === "" && ideas[0].content === "") {
        return;
      }
    }

    const { timestamp, date, time } = timeCreated();

    const newIdea = {
      id: timestamp,
      title: "",
      content: "",
      createdAt: `Created at: ${date} ${time}`,
      updatedAt: "",
    };
    setIdeas([newIdea, ...ideas]);
    console.log(newIdea);
    setNewIdeaId(newIdea.id);
  }

  function updateIdea(titleValue, contentValue, targetId) {
    setIdeas((prevIdeas) => {
      const ideasCopy = [...prevIdeas];
      const index = prevIdeas.findIndex((idea) => idea.id === targetId);

      const { date, time } = timeCreated();

      ideasCopy[index] = {
        ...ideasCopy[index],
        title: titleValue,
        content: contentValue,
        updatedAt: `Updated at ${date} ${time}`,
      };

      console.log(ideasCopy);
      return ideasCopy;
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

  function sortAlphabetically() {
    setIdeas((prevIdeas) => {
      const sorted = [...prevIdeas].sort((a, b) => {
        const aLower = a.title.toLowerCase();
        const bLower = b.title.toLowerCase();

        if (aLower < bLower) {
          return -1;
        }

        if (aLower > bLower) {
          return 1;
        }

        return 0;
      });
      return sorted;
    });
  }

  return (
    <>
      <Header createIdea={createIdea} handleSort={sortAlphabetically} />
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
      </main>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
