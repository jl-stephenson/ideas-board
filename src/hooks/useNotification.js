import { useState } from "react";

export default function useNotification() {
  const [visible, setVisible] = useState(false);

  function showNotification(duration) {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration);
  }

  return {
    visible,
    showNotification,
  };
}
