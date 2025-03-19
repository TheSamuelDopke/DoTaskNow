function ButtonTheme({ theme, toggleTheme }) {
  return (
    <button
      className={`absolute top-30 left-10 shadow px-2 py-1 rounded-xl ${
        theme === "light"
          ? "text-[#8EDE65] shadow-[#0000004f]"
          : "text-[#8EDE65] shadow-[#525252]"
      }`}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

export default ButtonTheme;
