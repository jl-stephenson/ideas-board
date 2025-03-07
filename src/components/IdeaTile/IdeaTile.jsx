import { useState } from "react";

export default function IdeaTile({
  idea,
  id,
  updateIdea,
  deleteIdea,
  titleRef,
}) {
  const [title, setTitle] = useState(idea.title);
  const [content, setContent] = useState(idea.content);
  const [charCount, setCharCount] = useState(0);
  const charLimit = 140;

  function onKeyDown(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  function onBlur() {
    updateIdea(title, content, id);
  }

  function handleDelete() {
    deleteIdea(id);
  }

  return (
    <article className="idea-tile" id={id}>
      <input
        type="text"
        aria-label="Idea title"
        className="title-input"
        value={title}
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        ref={titleRef}
        maxLength="25"
      />
      <textarea
        rows="5"
        aria-label="Idea content"
        className="content-input"
        value={content}
        placeholder="Idea"
        maxLength={charLimit}
        onBlur={onBlur}
        onChange={(event) => {
          setContent(event.target.value);
          setCharCount(event.target.value.length);
        }}
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
    </article>
  );
}
