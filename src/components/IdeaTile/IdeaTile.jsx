import { useState } from "react";

export default function IdeaTile({
  idea,
  id,
  updateIdea,
  deleteIdea,
  titleRef,
}) {
  const [editingTitleValue, setEditingTitleValue] = useState(idea.title);
  const [editingContentValue, setEditingContentValue] = useState(idea.content);

  function onChange(e) {
    if (e.target.tagName === "INPUT") {
      setEditingTitleValue(e.target.value);
    } else {
      setEditingContentValue(e.target.value);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || event.key === "Escape") {
      e.target.blur();
    }
  }

  function onBlur() {
    updateIdea(editingTitleValue, editingContentValue, id);
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
        value={editingTitleValue}
        placeholder="Title"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        ref={titleRef}
      />
      <textarea
        rows="5"
        aria-label="Idea content"
        className="content-input"
        value={editingContentValue}
        placeholder="Idea"
        maxLength="140"
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
      ></textarea>
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
