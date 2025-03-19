import { useEffect, useState } from "react";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  let bgColor;
  let textColor;

  switch (type) {
    case "success":
      bgColor = "bg-green-400";
      textColor = "text-white";
      break;
    case "error":
      bgColor = "bg-red-500";
      textColor = "text-white";
      break;
  }

  return (
    <>
      {visible && (
        <div className={`${textColor} ${bgColor} p-2 rounded-md text-center`}>
          {msg}
        </div>
      )}
    </>
  );
}

export default Message;
