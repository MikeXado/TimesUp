import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import { UserProps } from "../../../../../types";

export default function User({
  user,
  setIsTyping,
  setIsFetching,
  startTransition,
}: UserProps) {
  const currentUser = useContext(UserContext);
  const router = useRouter();
  const handleAddPreferUser = async (): Promise<void> => {
    setIsFetching(true);
    await fetch(`/api/v1/${currentUser}/chats/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, currentUser: currentUser }),
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
      className="flex w-full justify-start text-start text-white hover:text-white   rounded-md px-2 py-2 my-2"
    >
      <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
      <div className="flex-grow font-medium px-2">{user.displayName}</div>
    </button>
  );
}
