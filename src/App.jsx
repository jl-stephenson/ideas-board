import "./App.css";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header";
import IdeaTile from "./components/IdeaTile/IdeaTile";
import { useState } from "react";

const App = () => {
  const [contentValue, setContentValue] = useState(
    "This sentence is crafted to be exactly one hundred and forty characters long, balancing brevity with clear and precise wording. It is ideal!",
  );
  const [titleValue, setTitleValue] = useState("");
  return (
    <div>
      <Header />
      <div className="idea-grid">
        <IdeaTile
          contentValue={contentValue}
          setContentValue={setContentValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
        />
          <IdeaTile
          contentValue={contentValue}
          setContentValue={setContentValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
        />
          <IdeaTile
          contentValue={contentValue}
          setContentValue={setContentValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
        />
          <IdeaTile
          contentValue={contentValue}
          setContentValue={setContentValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
        />
          <IdeaTile
          contentValue={contentValue}
          setContentValue={setContentValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
        />
          <IdeaTile
          contentValue={contentValue}
          setContentValue={setContentValue}
          titleValue={titleValue}
          setTitleValue={setTitleValue}
        />

      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
