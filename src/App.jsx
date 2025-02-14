import "./App.css";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header";
import IdeaTile from "./components/IdeaTile/IdeaTile";
import { useState } from "react";

const App = () => {
  const [ideas, setIdeas] = useState([]);

  function createIdea() {
    if (typeof ideas[0] !== "undefined") {
      if (ideas[0].title === "" && ideas[0].content === "") {
        return;
      }
    }

    const newIdea = {
      id: Date.now(),
      title: "",
      content: "",
    };
    setIdeas([newIdea, ...ideas]);
    console.log(newIdea);
  }

  function updateIdea(titleValue, contentValue, targetId) {
    setIdeas((prevIdeas) => {
      const ideasCopy = [...prevIdeas];
      const index = prevIdeas.findIndex((idea) => idea.id === targetId);

      ideasCopy[index] = {
        ...ideasCopy[index],
        title: titleValue,
        content: contentValue,
      };

      console.log(ideasCopy);
      return ideasCopy;
    });
  }

  function deleteIdea(targetId) {
    setIdeas((prevIdeas) => {
      const ideasCopy = [...prevIdeas];
      const index = prevIdeas.findIndex((idea) => idea.id === targetId);

      ideasCopy.splice(index, 1);

      console.log(ideasCopy);
      return ideasCopy;
    });
  }

  return (
    <div>
      <Header createIdea={createIdea} />
      <div className="wrapper">
        <div className="idea-grid">
          {ideas.length > 0 &&
            ideas.map((idea) => (
              <IdeaTile
                key={idea.id}
                idea={idea}
                id={idea.id}
                updateIdea={updateIdea}
                deleteIdea={deleteIdea}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
