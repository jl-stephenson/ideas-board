export default function Header({ createIdea }) {
  return (
    <header className="header">
      <div className="wrapper header-grid">
        <button className="create-button" onClick={createIdea}>
          Create New Idea
        </button>
      </div>
    </header>
  );
}
