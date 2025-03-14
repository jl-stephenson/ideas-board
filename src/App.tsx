import Header from "./components/Header";
import IdeaGrid from "./components/IdeaGrid";
import IdeaTile from "./components/IdeaTile";
import NotificationBox from "./components/NotificationBox";
import { sortIdeas } from "./utils/sortIdeas";
import useNotification from "./hooks/useNotification";
import { Idea } from "./utils/types/types";
import { usePersistedState } from "./hooks/usePersistedState";

export default function App() {
  const { visible, showNotification } = useNotification();

  const [ideas, setIdeas] = usePersistedState<Idea[]>("ideas", []);

  function createIdea(): void {
    if (ideas[0]?.title === "" && ideas[0]?.content === "") {
      return;
    }

    const now: number = Date.now();
    const newIdea = {
      id: String(now),
      title: "",
      content: "",
      createdTimestamp: now,
      updatedTimestamp: undefined,
    };
    setIdeas([newIdea, ...ideas]);
  }

  function updateIdea(title: string, content: string, id: string): void {
    setIdeas(() => {
      const now: number = Date.now();
      const updatedIdeas = ideas.map((idea: Idea) => {
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
  }

  function deleteIdea(id: string): void {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  }

  function handleSort(sortType: string): void {
    setIdeas(() => sortIdeas(ideas, sortType));
  }

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
