import Header from "./components/Header";
import IdeaTile from "./components/IdeaTile";
import NotificationBox from "./components/NotificationBox";
import { useIdeas } from "./hooks/useIdeas";

export default function App() {
  const { ideas, createIdea, updateIdea, deleteIdea, handleSort, visible } =
    useIdeas();

  return (
    <>
      <Header createIdea={createIdea} handleSort={handleSort} />
      <main className="mx-auto max-w-7xl px-4">
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4 p-8 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] md:place-items-start">
          {ideas.length > 0 &&
            ideas.map((idea) => (
              <IdeaTile
                key={idea.id}
                idea={idea}
                updateIdea={updateIdea}
                deleteIdea={deleteIdea}
              />
            ))}
        </div>
        {visible && <NotificationBox />}
      </main>
    </>
  );
}
