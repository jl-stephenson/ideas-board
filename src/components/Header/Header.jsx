export default function Header({ createIdea }) {
  return (
    <header className="header">
      <button className="create-button" onClick={createIdea}>Create New Idea</button>
    </header>
  );
}
