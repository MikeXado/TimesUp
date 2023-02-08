export default function ChatsWrapper({ children }) {
  return (
    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
      {children}
    </ul>
  );
}
