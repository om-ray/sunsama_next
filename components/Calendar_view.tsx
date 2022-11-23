/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import moment from "moment";
import { Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Current_time_indicator from "./Current_time_indicator";
import Calendar_event from "./Calendar_event";
import { Droppable } from "./Droppable";

type propTypes = {
  calendarEvents: any[];
  setCalendarEvents: React.Dispatch<any[]>;
};

const TIMES = () => {
  const times = [];
  const timeStart = moment.utc().startOf("day");
  const timeEnd = moment.utc().endOf("day").subtract(1, "hour");
  while (timeEnd.diff(timeStart, "hour") >= 0) {
    times.push(timeStart.format("h a"));
    timeStart.add(1, "h");
  }
  return times;
};

function Calendar_view(props: propTypes) {
  const [maximize, setMaximize] = useState(false);
  const timesArray = useRef(TIMES());

  function scrollToCurrentTime() {
    if (typeof window !== "undefined") {
      document
        ?.getElementById("current_time_indicator_container")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Box
      right="0px"
      position="fixed"
      width="250px"
      height="100vh"
      className="bg-zinc-100 border-l dark:bg-zinc-900 border-gray-400 dark:border-zinc-800 overflow-y-scroll"
    >
      <div
        style={{ height: "66px" }}
        className="p-5 border-b bg-zinc-100
        dark:bg-zinc-900 border-gray-400 dark:border-zinc-800 fixed w-full z-10"
      >
        <h1 className="capitalize font-semibold text-black dark:text-white">
          Calendar
        </h1>
      </div>
      <div
        style={{
          height: "90px",
          top: "66px",
          width: "250px",
        }}
        className="border-b bg-zinc-100
        dark:bg-zinc-900 border-gray-400 dark:border-zinc-800 flex justify-start items-center fixed z-10"
      >
        <div className="border-r justify-center items-center flex border-gray-400 dark:border-zinc-800 h-full w-3/12 p-3">
          <IconButton
            onClick={() => {
              setMaximize(!maximize);
              scrollToCurrentTime();
            }}
            className="h-10 w-10"
          >
            {!maximize ? <Add></Add> : <Remove></Remove>}
          </IconButton>
        </div>
        <div className="relative p-4 uppercase dark:text-white text-black">
          <h1 style={{ fontSize: "10px", position: "absolute", top: "0px" }}>
            {moment().format("ddd")}
          </h1>
          <h1 className="text-2xl font-bold">{moment().format("DD")}</h1>
        </div>
      </div>
      <Droppable id="calendar_droppable" key="calendar_droppable">
        <Box
          id="timesContainer"
          height={maximize ? "3220px" : "1610px"}
          maxHeight={maximize ? "3220px" : "1610px"}
          width="250px"
          paddingTop="170px"
          className="flex flex-col justify-between text-black dark:text-zinc-500"
        >
          <Current_time_indicator
            timeArray={timesArray.current}
          ></Current_time_indicator>
          <>
            {timesArray.current.map((time: string, index: number) => {
              return (
                <h2
                  id={`${time} + ${index}`}
                  style={{
                    lineHeight: "0.1em",
                    height: maximize ? "120px" : "60px",
                  }}
                  className={
                    " border-t border-gray-400 dark:border-zinc-800 w-full text-justify justify-end uppercase text-xs"
                  }
                  key={`${time} + ${index}`}
                >
                  <span
                    style={{ padding: "0 5px" }}
                    className="bg-zinc-100 dark:bg-zinc-900"
                  >
                    {time}
                  </span>
                </h2>
              );
            })}
            {props.calendarEvents.map((event) => {
              return (
                <Calendar_event
                  key={event.event.id}
                  id={event.event.id}
                  event={event}
                  height={
                    document.getElementById("timesContainer")?.scrollHeight
                  }
                  maximized={maximize}
                  timesArray={timesArray.current}
                ></Calendar_event>
              );
            })}
          </>
        </Box>
      </Droppable>
    </Box>
  );
}

export default Calendar_view;
