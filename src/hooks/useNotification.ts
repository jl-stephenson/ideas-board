import { useState } from "react";

interface UseNotificationReturn {
  visible: boolean;
  showNotification: (duration: number) => void;
}

export function useNotification(): UseNotificationReturn {
  const [visible, setVisible] = useState(false);

  function showNotification(duration: number) {
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
