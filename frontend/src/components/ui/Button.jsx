export function Button({ onClick, children }) {
  return (
    <button
      className="bg-amber-300 px-8 py-1 rounded-md my-2 disabled:bg-amber-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
