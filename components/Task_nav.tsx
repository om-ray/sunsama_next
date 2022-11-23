import { ChevronLeft, ExpandMore } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";
import { TodayType } from "../pages/Main_app";

type PropsType = {
  today: TodayType;
};

export default function Task_Nav(props: PropsType) {
  const scrollToToday = function () {
    if (typeof window !== "undefined") {
      document
        ?.getElementById(`${props?.today?.absolute_date}`)
        ?.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  return (
    <Box
      width="100%"
      alignContent="right"
      textAlign="right"
      position="fixed"
      top="0"
      left="340px"
    >
      <div
        style={{ width: "calc(100% - 340px - 250px)" }}
        className="text-black dark:text-white flex justify-between bg-gray-200 dark:bg-zinc-900 flex-row items-center border-l border-gray-400 h-auto py-5 dark:border-zinc-800 drop-shadow-md"
      >
        <Box display="flex">
          <ChevronLeft className="fill-gray-600 mr-4 ml-2"></ChevronLeft>
          <Box
            display="flex"
            height="25px"
            alignItems="center"
            className="pb-1 text-xl font-semibold"
          >
            <b className="text-green-500 mr-1 text-2xl font-normal">#</b>
            all
            <IconButton style={{ width: "10px", height: "10px" }}>
              <ExpandMore
                className="fill-black dark:fill-white ml-1"
                style={{ fontSize: "20px" }}
              ></ExpandMore>
            </IconButton>
          </Box>
          <Link
            href={"#today"}
            onClick={() => {
              scrollToToday();
            }}
            id="today_btn"
            className="text-gray-500 font-bold absolute top-11 left-12 text-xs"
          >
            <p>Today</p>
          </Link>
        </Box>
        <Box>
          <div style={{ display: "flex", alignContent: "center" }}>
            <Link
              href="?mainPanel=kanban&rightPanel=calendar"
              className={"text-center mr-10 text-base"}
            >
              <p className="capitalize font-semibold text-black dark:text-white">
                Tasks
              </p>
            </Link>
            <Link
              href="?mainPanel=calendar&rightPanel=kanban"
              className={"text-center mr-10 text-base"}
            >
              <p className="capitalize font-semibold text-black dark:text-white">
                Calendar
              </p>
            </Link>
          </div>
        </Box>
      </div>
    </Box>
  );
}
