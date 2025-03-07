export default function NotificationBox({ visible }) {
  if (!visible) {
    return <></>;
  }

  return (
    <div className="notification">
      <p>Idea Successfully Updated</p>
    </div>
  );
}
