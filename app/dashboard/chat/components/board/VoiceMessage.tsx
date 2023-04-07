import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserProvider";

function VoiceMessage({ setMessage, recording, setRecording }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const constraints: MediaStreamConstraints = { audio: true };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorder.start();
        setRecording(true);
        setStream(stream);

        const audioChunks: BlobPart[] = [];
        mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          setRecording(false);
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          setMessage({
            value: audioBlob,
            type: "audio",
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stopRecording = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <>
      <span className="absolute items-center inset-y-0 right-2 flex ">
        {recording ? (
          <div className="flex items-center">
            <span className="flex w-3 h-3 bg-red-600 rounded-full animate-pulse mr-2"></span>
            <button className="text-white" onClick={stopRecording}>
              Stop
            </button>
          </div>
        ) : (
          <button
            onClick={startRecording}
            type="button"
            className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
        )}
      </span>
    </>
  );
}

export default VoiceMessage;
