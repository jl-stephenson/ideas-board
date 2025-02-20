export default function Header({ createIdea, handleSort }) {
  return (
    <header className="header">
      <div className="wrapper header-grid">
        <button className="create-button" onClick={createIdea}>
          Create New Idea
        </button>
        <label htmlFor="sortSelect">Sort by:</label>
        <select
          id="sortSelect"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">-- Select an option --</option>
          <option value="titleAsc">Title (A - Z)</option>
        </select>
      </div>
    </header>
  );
}
