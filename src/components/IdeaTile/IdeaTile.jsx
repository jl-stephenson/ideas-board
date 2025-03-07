import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function IdeaTile({ idea, id, updateIdea, deleteIdea, isNew }) {
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      title: idea.title,
      content: idea.content,
    },
  });

  const [charCount, setCharCount] = useState(0);
  const charLimit = 140;

  useEffect(() => {
    if (isNew) {
      setFocus("title");
    }
  }, [isNew, setFocus]);

  function onKeyDown(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  function handleDelete() {
    deleteIdea(id);
  }

  return (
    <form className="idea-tile" id={id}>
      <input
        {...register("title")}
        type="text"
        aria-label="Idea title"
        className="title-input"
        placeholder="Title"
        onKeyDown={onKeyDown}
        onBlur={handleSubmit((data) => {
          updateIdea(data.title, data.content, id);
        })}
        maxLength="25"
      />
      <textarea
        {...register("content", {
          onChange: (event) => {
            setCharCount(event.target.value.length);
          },
        })}
        rows="5"
        aria-label="Idea content"
        className="content-input"
        placeholder="Idea"
        maxLength={charLimit}
        onBlur={handleSubmit((data) => {
          updateIdea(data.title, data.content, id);
        })}
        onKeyDown={onKeyDown}
      ></textarea>
      <p className={`char-countdown ${charCount >= 120 && "active"}`}>
        {charCount}/{charLimit}
      </p>
      <footer className="idea-footer">
        <p className="timestamp">
          {idea.updatedAt === "" ? idea.createdAt : idea.updatedAt}
        </p>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </footer>
    </form>
  );
}
