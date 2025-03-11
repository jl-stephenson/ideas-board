import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function IdeaTile({ idea, updateIdea, deleteIdea, isNew }) {
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      title: idea.title,
      content: idea.content,
    },
  });

  const [charCount, setCharCount] = useState(0);
  const charLimit = 140;

  useEffect(() => {
    if (idea.isNew) {
      setFocus("title");
    }
  }, [isNew, setFocus]);

  function getTimestamp() {
    if (idea.updatedTimestamp) {
      return `Updated at ${new Date(idea.updatedTimestamp).toLocaleString()}`;
    }

    return `Created at ${new Date(idea.createdTimestamp).toLocaleString()}`;
  }

  function onKeyDown(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  return (
    <form className="idea-tile" id={idea.id}>
      <input
        {...register("title")}
        type="text"
        aria-label="Idea title"
        className="title-input"
        placeholder="Title"
        onKeyDown={onKeyDown}
        onBlur={handleSubmit((data) => {
          updateIdea(data.title, data.content, idea.id);
        })}
        maxLength={25}
      />
      <textarea
        {...register("content", {
          onChange: (event) => {
            setCharCount(event.target.value.length);
          },
        })}
        rows={5}
        aria-label="Idea content"
        className="content-input"
        placeholder="Idea"
        maxLength={charLimit}
        onBlur={handleSubmit((data) => {
          updateIdea(data.title, data.content, idea.id);
        })}
        onKeyDown={onKeyDown}
      ></textarea>
      <p className={`char-countdown ${charCount >= 120 && "active"}`}>
        {charCount}/{charLimit}
      </p>
      <footer className="idea-footer">
        <p className="timestamp">{getTimestamp()}</p>
        <button className="delete-button" onClick={() => deleteIdea(idea.id)}>
          Delete
        </button>
      </footer>
    </form>
  );
}
