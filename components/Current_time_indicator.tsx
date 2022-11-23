/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React, { useRef, useState } from "react";

const useRequestAnimationFrame = (callback: any) => {
  const requestRef = React.useRef(0);
  const previousTimeRef = React.useRef(0);

  const animate = (time: number) => {
    if (previousTimeRef.current) callback(time - previousTimeRef.current);
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};

function Current_time_indicator(props: any) {
  const [currentTimeIndicatorTop, setCurrentTimeIndicatorTop] = useState(0);
  if (typeof window !== "undefined") {
    const timeArray = props.timeArray;
    const hour = moment().format("h a");
    const minutes = JSON.parse(moment().format("m"));
    const currentHourElement = useRef(
      document.getElementById(`${hour} + ${timeArray.indexOf(hour)}`)
    );

    currentHourElement.current = document.getElementById(
      `${hour} + ${timeArray.indexOf(hour)}`
    );

    useRequestAnimationFrame(() => {
      updateCurrentTimeIndicator(currentHourElement, minutes);
    });
  }

  const updateCurrentTimeIndicator = function (
    currentHourElement: React.MutableRefObject<HTMLElement | null>,
    minutes: number
  ) {
    if (currentHourElement.current) {
      const currentHourTop =
        currentHourElement.current.getBoundingClientRect().top;
      const relativeMinuteOffset =
        (currentHourElement.current.getBoundingClientRect().height / 60) *
        minutes;
      const currentMinuteOffset = currentHourTop + relativeMinuteOffset;
      setCurrentTimeIndicatorTop(
        Math.round(Math.round(currentMinuteOffset) / 5) * 5
      );
    }
  };

  return (
    <div
      id="current_time_indicator_container"
      style={{
        position: "fixed",
        right: "0px",
        width: "200px",
        zIndex: 1,
        top: `${currentTimeIndicatorTop}px`,
      }}
    >
      <hr style={{ borderColor: "#A64537" }} />
    </div>
  );
}

export default Current_time_indicator;
