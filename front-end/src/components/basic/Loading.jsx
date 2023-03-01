import React from 'react';
import { CircularProgress } from "@mui/material";

const Loading = () => {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundAttachment = "scroll";
  document.body.style.height = "auto";
  document.body.style.overflowY = "visible";

  return (
    <div style={{ marginTop: "10em" }}>
      <CircularProgress />
    </div>
  )
}

export default Loading