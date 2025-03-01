export default function Header({ createIdea, handleSort }) {
  return (
    <header className="header">
      <div className="wrapper header-flex">
        <button className="create-button" onClick={createIdea}>
          Create New Idea
        </button>
        <div>
          <label className="sort-label" htmlFor="sortSelect">
            Sort by:
          </label>
          <select
            className="sort-menu"
            id="sortSelect"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="alphabeticalAsc">Title (A - Z)</option>
            <option value="alphabeticalDesc">Title (Z - A)</option>
            <option value="updatedAsc">Most Recently Updated</option>
            <option value="updatedDesc">Least Recently Updated</option>
          </select>
        </div>
      </div>
    </header>
  );
}
