interface HeaderProps {
  createIdea: () => void;
  handleSort: (sortType: string) => void;
}

export default function Header({ createIdea, handleSort }: HeaderProps) {
  return (
    <header className="bg-primary-accent min-h-12 w-full py-4">
      <div className="wrapper flex flex-col justify-between gap-4 items-center md:flex-row">
        <button
          className="hover:text-action-positive hover:border-action-positive mx-8 my-2 rounded-lg border-2 border-white p-4 text-white outline-0 md:max-w-40"
          onClick={createIdea}
        >
          Create New Idea
        </button>
        <div>
          <label className="mr-4 text-white" htmlFor="sortSelect">
            Sort by:
          </label>
          <select
            className="mr-8 p-2 rounded-lg"
            id="sortSelect"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handleSort(event.currentTarget.value)
            }
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
