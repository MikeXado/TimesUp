import Picker from "@emoji-mart/react";
import useSWR from "swr";
export default function EmojiePicker({ setMessage }) {
  const getEmojies = async () => {
    const res = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
    const emojies = await res.json();
    return emojies;
  };

  const { data, isLoading } = useSWR("/api/emojies", getEmojies);
  return (
    <div className="-top-[450px] left-[300px] absolute">
      <Picker
        data={data && data}
        onEmojiSelect={(emojie) =>
          setMessage((prev) => {
            return { value: prev.value + emojie.native, type: "text" };
          })
        }
      />{" "}
    </div>
  );
}
