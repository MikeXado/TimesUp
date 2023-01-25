import { useRouter } from "next/navigation";

export default function User({
  user,
  setIsTyping,
  setIsFetching,
  startTransition,
}) {
  const router = useRouter();
  const handleAddPreferUser = async () => {
    setIsFetching(true);
    await fetch("/api/createChatDb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());

    setIsTyping(false);

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <button
      onClick={handleAddPreferUser}
      className="flex w-full justify-start text-start text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
    >
      <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
      <div className="flex-grow font-medium px-2">{user.displayName}</div>
    </button>
  );
}
