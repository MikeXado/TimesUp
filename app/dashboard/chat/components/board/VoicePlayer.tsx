import React from "react";


function VoicePlayer({ audioUrl }) {


  return (
    <>
      <audio
        src={audioUrl}
     
        controls
      />
     
    </>
  );
}

export default VoicePlayer;
