import React, { useRef } from "react";

function VoicePlayer({ audioUrl }) {
  return <audio src={audioUrl} controls />;
}

export default VoicePlayer;
