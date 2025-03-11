interface HeaderProps {
  createIdea: () => void;
  handleSort: (sortType: string) => void;
}

export default function Header({ createIdea, handleSort }: HeaderProps) {
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
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleSort(event.currentTarget.value)}
          >
            {/* <option value="">Select an option</option> */}
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
