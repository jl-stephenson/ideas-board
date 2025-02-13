import { timeCreated } from "../../utils/timeCreated";
import { useState } from "react";

export default function IdeaTile({
  contentValue,
  setContentValue,
  titleValue,
  setTitleValue,
}) {
  const [editingTitleValue, setEditingTitleValue] = useState(titleValue);
  const [editingContentValue, setEditingContentValue] = useState(contentValue);

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

  function onBlur(e) {
    if (e.target.tagName === "INPUT") {
      setTitleValue(e.target.value);
    } else {
      setContentValue(e.target.value);
    }
  }

  function onInput(e) {
    if (e.target.scrollHeight > 33) {
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight - 16 + "px";
    }
  }

  return (
    <div className="idea" id={timestamp}>
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
        cols="20"
        aria-label="Idea content"
        className="content-input"
        value={editingContentValue}
        placeholder="Idea"
        maxLength="140"
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onInput={onInput}
      ></textarea>
      <div className="idea-buttons">
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
}
