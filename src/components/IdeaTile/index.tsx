import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Idea } from "../../utils/types/types";
import styles from "./styles.module.css"

interface IdeaTileProps {
  idea: Idea;
  updateIdea: (title: string, content: string, id: string) => void;
  deleteIdea: (id: string) => void;
}

export default function IdeaTile({
  idea,
  updateIdea,
  deleteIdea,
}: IdeaTileProps) {
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      title: idea.title,
      content: idea.content,
    },
  });

  const [charCount, setCharCount] = useState<number>(0);
  const charLimit = 140;

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  function getDateTime() {
    if (idea.updatedTimestamp) {
      return `Updated at ${new Date(idea.updatedTimestamp).toLocaleString()}`;
    }

    return `Created at ${new Date(idea.createdTimestamp).toLocaleString()}`;
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  }

  return (
    <form className={styles.ideaTile} id={idea.id}>
      <input
        {...register("title")}
        type="text"
        aria-label="Idea title"
        className={styles.titleInput}
        placeholder="Title"
        onKeyDown={onKeyDown}
        onBlur={handleSubmit((data) => {
          updateIdea(data.title, data.content, idea.id);
        })}
        maxLength={25}
      />
      <textarea
        {...register("content", {
          onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCharCount(event.currentTarget.value.length);
          },
        })}
        rows={5}
        aria-label="Idea content"
        className={styles.contentInput}
        placeholder="Idea"
        maxLength={charLimit}
        onBlur={handleSubmit((data) => {
          updateIdea(data.title, data.content, idea.id);
        })}
        onKeyDown={onKeyDown}
      ></textarea>
      <p className={`${styles.charCountdown} ${charCount >= 120 && "active"}`}>
        {charCount}/{charLimit}
      </p>
      <footer className={styles.ideaFooter}>
        <p className="timestamp">{getDateTime()}</p>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => deleteIdea(idea.id)}
        >
          Delete
        </button>
      </footer>
    </form>
  );
}
