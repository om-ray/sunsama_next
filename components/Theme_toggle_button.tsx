import { Brightness4Outlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

type PropsType = {
  theme: string;
  setTheme: React.Dispatch<string>;
  className?: string;
};

function Theme_toggle_button(props: PropsType) {
  return (
    <Button
      onClick={() => {
        props.theme == "dark"
          ? props.setTheme("light")
          : props.setTheme("dark");
      }}
      id="theme-toggle"
      className={`${props.className}rounded-full py-2 text-xs text-zinc-900 dark:text-white`}
    >
      <Brightness4Outlined></Brightness4Outlined>
    </Button>
  );
}

export default Theme_toggle_button;
