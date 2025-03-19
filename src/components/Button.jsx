function Button(props) {
  return (
    <button
      {...props}
      className="bg-[#334155] p-2 rounded-md text-white hover:text-[#8EDB65]"
    >
      {props.children}
    </button>
  );
}

export default Button;
