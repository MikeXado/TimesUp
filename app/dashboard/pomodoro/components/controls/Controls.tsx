import useSound from "use-sound";
import startSfx from "../../../../../public/sounds/startTimer.mp3";
import pauseSfx from "../../../../../public/sounds/pauseTimer.mp3";
import SettingsDropdown from "../dropdowns/SettingsDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { PomodoroPreferencesType } from "../../../../../types";

interface ControlsProps {
  setActive: (active: boolean) => void;
  active: boolean;
}

export default function Controls({ setActive, active }: ControlsProps) {
  const { sound } = useSelector(
    (state: { preferences: PomodoroPreferencesType }) => state.preferences
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams?.get("status");
  const volume = sound ? 1 : 0;
  const [play] = useSound(startSfx, {
    interrupt: true,
    volume: volume,
  });

  const [pause] = useSound(pauseSfx, {
    interrupt: true,
    volume: volume,
  });

  const handleSounds = (e) => {
    if (active) {
      pause();
    } else {
      play();
    }
    setActive(!active);
  };

  const changeStatusState = () => {
    if (status === "short") {
      router.replace(`/dashboard/pomodoro?status=long`);
    } else if (status === "long") {
      router.replace(`/dashboard/pomodoro`);
    } else {
      router.replace(`/dashboard/pomodoro?status=short`);
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-[90px] ">
      <SettingsDropdown />
      <button
        onClick={handleSounds}
        className={
          "rounded-[32px] py-[22px] px-[48px] ml-3" +
          (status === "short"
            ? " bg-[#4DDA6E]"
            : status === "long"
            ? " bg-[#4CACFF]"
            : " bg-[#FF4C4C]")
        }
      >
        <>
          {!active ? (
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 13C21.9992 13.3439 21.9104 13.6818 21.7419 13.9816C21.5734 14.2814 21.3309 14.533 21.0375 14.7125L3.03749 25.7C2.73766 25.89 2.3914 25.9939 2.0365 26.0006C1.68159 26.0072 1.33169 25.9162 1.02499 25.7375C0.713758 25.5667 0.454302 25.3152 0.273924 25.0095C0.093547 24.7037 -0.00108208 24.355 -6.18584e-06 24V1.99996C-0.00108208 1.64496 0.093547 1.29623 0.273924 0.990471C0.454302 0.684709 0.713758 0.433218 1.02499 0.26246C1.33169 0.0837584 1.68159 -0.00725329 2.0365 -0.000640198C2.3914 0.00597289 2.73766 0.109956 3.03749 0.29996L21.0375 11.2875C21.3309 11.4669 21.5734 11.7185 21.7419 12.0183C21.9104 12.3181 21.9992 12.6561 22 13Z"
                fill={
                  status === "short"
                    ? "#14401D"
                    : status === "long"
                    ? "#153047"
                    : "#471515"
                }
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2V22C22 22.5304 21.7893 23.0391 21.4142 23.4142C21.0391 23.7893 20.5304 24 20 24H15.5C14.9696 24 14.4609 23.7893 14.0858 23.4142C13.7107 23.0391 13.5 22.5304 13.5 22V2C13.5 1.46957 13.7107 0.960859 14.0858 0.585786C14.4609 0.210714 14.9696 0 15.5 0H20C20.5304 0 21.0391 0.210714 21.4142 0.585786C21.7893 0.960859 22 1.46957 22 2ZM6.5 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H6.5C7.03043 24 7.53914 23.7893 7.91421 23.4142C8.28929 23.0391 8.5 22.5304 8.5 22V2C8.5 1.46957 8.28929 0.960859 7.91421 0.585786C7.53914 0.210714 7.03043 0 6.5 0Z"
                fill={
                  status === "short"
                    ? "#14401D"
                    : status === "long"
                    ? "#153047"
                    : "#471515"
                }
              />
            </svg>
          )}
        </>
      </button>
      <button
        onClick={changeStatusState}
        className={
          "rounded-[24px] py-[20px] px-[24px] ml-3" +
          (status === "short"
            ? " bg-green-300"
            : status === "long"
            ? " bg-blue-300"
            : " bg-red-300")
        }
      >
        <svg
          width="30"
          height="20"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.65 9.99989C29.6515 10.3351 29.5688 10.6653 29.4093 10.9602C29.2499 11.2551 29.0189 11.5051 28.7375 11.6874L17.5875 18.8499C17.2849 19.0459 16.935 19.1565 16.5747 19.17C16.2144 19.1835 15.8572 19.0993 15.5408 18.9264C15.2244 18.7535 14.9607 18.4982 14.7775 18.1877C14.5943 17.8772 14.4984 17.5229 14.5 17.1624V11.8374L3.58752 18.8499C3.28494 19.0459 2.93499 19.1565 2.5747 19.17C2.21441 19.1835 1.85717 19.0993 1.5408 18.9264C1.22443 18.7535 0.960685 18.4982 0.777472 18.1877C0.59426 17.8772 0.498395 17.5229 0.50002 17.1624V2.83739C0.498395 2.47685 0.59426 2.12258 0.777472 1.81205C0.960685 1.50153 1.22443 1.24631 1.5408 1.07339C1.85717 0.900478 2.21441 0.816299 2.5747 0.829765C2.93499 0.84323 3.28494 0.953839 3.58752 1.14989L14.5 8.16239V2.83739C14.4984 2.47685 14.5943 2.12258 14.7775 1.81205C14.9607 1.50153 15.2244 1.24631 15.5408 1.07339C15.8572 0.900478 16.2144 0.816299 16.5747 0.829765C16.935 0.84323 17.2849 0.953839 17.5875 1.14989L28.7375 8.31239C29.0189 8.49466 29.2499 8.74472 29.4093 9.03959C29.5688 9.33445 29.6515 9.66467 29.65 9.99989Z"
            fill={
              status === "short"
                ? "#14401D"
                : status === "long"
                ? "#153047"
                : "#471515"
            }
          />
        </svg>
      </button>
    </div>
  );
}
