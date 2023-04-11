import Picker from "@emoji-mart/react";
import useSWR from "swr";
export default function EmojiePicker({ setMessage , closeEmojiePicker }) {
  const getEmojies = async () => {
    const res = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");
    const emojies = await res.json();
    return emojies;
  };

  const { data } = useSWR("/api/emojies", getEmojies);
  return (
    <div className="-top-[450px] left-[0px] absolute">
      <Picker
        data={data}
        onClickOutside={() => closeEmojiePicker(false)}
        onEmojiSelect={(emojie) =>
          setMessage((prev) => {
            return {
              value: prev?.value ? prev.value + emojie.native : emojie.native,
              type: "text",
            };
          })
        }
      />{" "}
    </div>
  );
}
