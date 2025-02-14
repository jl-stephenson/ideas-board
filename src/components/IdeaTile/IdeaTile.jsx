import { timeCreated } from "../../utils/timeCreated";
import { useState } from "react";

export default function IdeaTile({
  idea,
  id,
  updateIdea,
  deleteIdea,
}) {
  const [editingTitleValue, setEditingTitleValue] = useState(idea.title);
  const [editingContentValue, setEditingContentValue] = useState(idea.content);

  const { timestamp, date, time } = timeCreated();

  function onChange(e) {
    if (e.target.tagName === "INPUT") {
      setEditingTitleValue(e.target.value);
    } else {
      setEditingContentValue(e.target.value);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  function onBlur() {
    updateIdea(editingTitleValue, editingContentValue, id);
  }

  function handleDelete() {
    deleteIdea(id);
  }

  return (
    <div className="idea-tile" id={id}>
      <p>
        {date} {time}
      </p>
      <input
        type="text"
        aria-label="Idea title"
        className="title-input"
        value={editingTitleValue}
        placeholder="Title"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
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
      <div className="idea-buttons">
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
