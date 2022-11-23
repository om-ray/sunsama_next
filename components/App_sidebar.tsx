/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpandMoreOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { CalendarPicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Sidebar_calendar_section from "./Sidebar_calendar_section";
import Sidebar_channel_section from "./Sidebar_channel_section";
import Theme_toggle_button from "./Theme_toggle_button";

function App_sidebar(props: any) {
  const today = props.today;
  const [date, setDate] = useState(moment(today.absolute_date));
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );
  const colorTheme = theme === "dark" ? "light" : "dark";
  const scrollToMonth = props.scrollToMonth;

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <Box
      left="0"
      position="fixed"
      width="340px"
      height="100%"
      style={{ maxWidth: "340px" }}
      className="dark:bg-zinc-900 bg-gray-300 p-1"
    >
      <div className="mt-4 ml-4 flex items-center">
        <h1 className="text-xl font-semibold text-black dark:text-white ml-4">
          Home
        </h1>
        <IconButton className="p-0">
          <ExpandMoreOutlined className="fill-black dark:fill-white"></ExpandMoreOutlined>
        </IconButton>
        <Theme_toggle_button
          theme={theme}
          setTheme={setTheme}
          className="absolute right-1 w-fit left-1"
        ></Theme_toggle_button>
      </div>
      <CalendarPicker
        reduceAnimations={true}
        className="w-full p-0 mt-5 text-black fill-black dark:fill-white dark:text-white"
        date={date}
        onChange={(date) => {
          const newDate = moment(date);
          if (date) {
            const formattedDate = moment(date._d)?.format("MMMM D YYYY");
            console.log(formattedDate);
            if (document?.getElementById(formattedDate)) {
              document
                ?.getElementById(formattedDate)
                ?.scrollIntoView({ behavior: "smooth", inline: "start" });
            } else {
              scrollToMonth(formattedDate);
              setTimeout(() => {
                if (document?.getElementById(formattedDate)) {
                  document
                    ?.getElementById(formattedDate)
                    ?.scrollIntoView({ behavior: "smooth", inline: "start" });
                }
              }, 100);
            }
          }
          setDate(newDate);
        }}
      ></CalendarPicker>
      <Sidebar_channel_section></Sidebar_channel_section>
      <Sidebar_calendar_section></Sidebar_calendar_section>
    </Box>
  );
}

export default App_sidebar;
