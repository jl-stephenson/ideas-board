import Header from "./components/Header";
import IdeaGrid from "./components/IdeaGrid";
import IdeaTile from "./components/IdeaTile";
import NotificationBox from "./components/NotificationBox";
import { useIdeas } from "./hooks/useIdeas";

export default function App() {
  const { ideas, createIdea, updateIdea, deleteIdea, handleSort, visible } =
    useIdeas();

  return (
    <>
      <Header createIdea={createIdea} handleSort={handleSort} />
      <main className="wrapper">
        <IdeaGrid>
          {ideas.length > 0 &&
            ideas.map((idea) => (
              <IdeaTile
                key={idea.id}
                idea={idea}
                updateIdea={updateIdea}
                deleteIdea={deleteIdea}
              />
            ))}
        </IdeaGrid>
        {visible && <NotificationBox />}
      </main>
    </>
  );
}
