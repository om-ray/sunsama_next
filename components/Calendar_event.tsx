/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoreHoriz } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

function Calendar_event(props: any) {
  const [time, setTime] = useState("");
  const [height, setHeight] = useState(30);
  const maxContainerHeight = props.maximized ? 3220 : 1610;
  const [top, setTop] = useState(
    props.event.y >= 170
      ? props.event.y >= maxContainerHeight - 30
        ? maxContainerHeight - 30
        : Math.ceil(props.event.y / 5) * 5
      : 170
  );
  const documentElement = document.documentElement;
  // const colorArray = [
  //   "blue",
  //   "red",
  //   "yellow",
  //   "green",
  //   "indigo",
  //   "purple",
  //   "pink",
  //   "orange",
  //   "amber",
  //   "lime",
  //   "emerald",
  //   "teal",
  //   "cyan",
  //   "sky",
  //   "violet",
  //   "fuchsia",
  //   "rose",
  // ];
  const bottom =
    top + height > maxContainerHeight ? maxContainerHeight : top + height;
  const timeHeight = props.maximized ? 120 : 60;
  const hourPositionsArray: any[] = [];
  for (let index = props.timesArray.length - 1; index >= 0; index--) {
    hourPositionsArray.push({
      hour: props.timesArray[index],
      position: ((timeHeight * index) / 5) * 5 + 170,
    });
  }

  const returnMinutes = function (minPos: number, currentPos: number) {
    return JSON.stringify(Math.round((((currentPos - 170) / 60) * 60) % 60));
  };

  // const RandomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

  const updateTimesForEvent = function () {
    const startHourArrayIndex = hourPositionsArray.findIndex(
      (pair: any) => pair.position <= top
    );
    const currentStartHour = hourPositionsArray[
      startHourArrayIndex
    ].hour.substring(
      0,
      hourPositionsArray[startHourArrayIndex].hour.length - 3
    );
    const currentStartPosition = hourPositionsArray[currentStartHour].position;
    const currentStartMinute =
      JSON.parse(returnMinutes(currentStartPosition, top)) > 9
        ? returnMinutes(currentStartPosition, top)
        : returnMinutes(currentStartPosition, top).padStart(2, "0");
    const startTime = `${currentStartHour}:${currentStartMinute}`;

    const endHourArrayIndex = hourPositionsArray.findIndex(
      (pair: any) => pair.position <= bottom
    );
    let currentEndHour = hourPositionsArray[endHourArrayIndex].hour.substring(
      0,
      hourPositionsArray[endHourArrayIndex].hour.length - 3
    );
    const currentEndPosition = hourPositionsArray[currentEndHour].position;
    if (bottom == maxContainerHeight) {
      currentEndHour = hourPositionsArray[
        hourPositionsArray.length - 1
      ].hour.substring(
        0,
        hourPositionsArray[hourPositionsArray.length - 1].hour.length - 3
      );
    }
    const currentEndMinute =
      JSON.parse(returnMinutes(currentEndPosition, bottom)) > 9
        ? returnMinutes(currentEndPosition, bottom)
        : returnMinutes(currentEndPosition, bottom).padStart(2, "0");
    const endTime = `${currentEndHour}:${currentEndMinute}`;

    setTime(`${startTime} - ${endTime}`);
  };

  const resizeEvent = function (e: any) {
    if (e.clientY % 5 == 0 && e.clientY >= top + 5) {
      const resizeHeight = e.clientY + 5 - top;
      setHeight(resizeHeight);
    }
  };

  const dragEvent = function (e: any) {
    if (
      e.clientY % 5 == 0 &&
      (maxContainerHeight - height >= e.clientY || e.clientY >= 170)
    ) {
      setTop(e.clientY);
    }
  };

  const stopResizeEvent = function () {
    documentElement.removeEventListener("mousemove", resizeEvent, false);
    documentElement.removeEventListener("mouseup", stopResizeEvent, false);
  };

  const stopDragEvent = function () {
    documentElement.removeEventListener("mousemove", dragEvent, false);
    documentElement.removeEventListener("mouseup", stopDragEvent, false);
  };

  const initEvents = function (e: any) {
    console.log(e.target.id);
    if (e.target.id == `${props.id} resize handle`) {
      documentElement.addEventListener("mousemove", resizeEvent, false);
      documentElement.addEventListener("mouseup", stopResizeEvent, false);
    }
    if (e.target.id == `${props.id} drag handle`) {
      documentElement.addEventListener("mousemove", dragEvent, false);
      documentElement.addEventListener("mouseup", stopDragEvent, false);
    }
  };

  documentElement?.addEventListener("mousedown", initEvents, false);

  useEffect(() => {
    updateTimesForEvent();
  }, [height, top]);

  return (
    <div
      style={{
        top: top + "px",
        width: "12.75rem",
        height: height + "px",
        minHeight: "10px",
        fontSize: "10px",
      }}
      className={
        "absolute bg-blue-300 dark:bg-blue-400  border-blue-400 dark:border-blue-300 pl-1 border rounded-sm ml-11 drop-shadow flex flex-col justify-between"
      }
      id={props.id}
      key={props.id}
    >
      <div className="relative w-full h-full">
        <MoreHoriz
          id={`${props.id} drag handle`}
          className="p-0 w-full h-1/3 fill-transparent absolute"
          style={{ cursor: "move" }}
        ></MoreHoriz>
        <h1 className="text-black dark:text-white">
          {props.event.event.task} {time}
        </h1>
        <MoreHoriz
          id={`${props.id} resize handle`}
          className="w-full h-1/3 fill-transparent absolute bottom-0"
          style={{ cursor: "ns-resize" }}
        ></MoreHoriz>
      </div>
    </div>
  );
}

export default Calendar_event;
