import React, { useEffect, useRef, useState } from "react";
import Task_view from "../components/Task_view";
import Task_Nav from "../components/Task_nav";
import App_sidebar from "../components/App_sidebar";
import moment from "moment";

export type TodayType = {
  day_of_month: string;
  day_name_shorthand: string;
  date: string;
  day_name_full: string;
  absolute_date: string;
};

const DAYS = (add: number) => {
  const days = [];
  const dateStart = moment.utc().startOf("month").add(add, "month");
  const daysInMonth = moment
    .utc()
    .startOf("month")
    .add(add, "month")
    .daysInMonth();
  const dateEnd = moment.utc(dateStart).add(daysInMonth, "day");
  while (dateEnd.diff(dateStart, "days") > 0) {
    days.push({
      day_of_month: dateStart.format("D"),
      day_name_shorthand: dateStart.format("ddd"),
      date: dateStart.format("MMMM D"),
      day_name_full: dateStart.format("dddd"),
      absolute_date: dateStart.format("MMMM D YYYY"),
    });
    dateStart.add(1, "days");
  }
  return days;
};

function Main_app() {
  const add = useRef(0);
  const [daysArray, setDaysArray] = useState(() => DAYS(add.current));
  const today = {
    day_of_month: moment().format("D"),
    day_name_shorthand: moment().format("ddd"),
    date: moment().format("MMMM D"),
    day_name_full: moment().format("dddd"),
    absolute_date: moment().format("MMMM D YYYY"),
  };
  const [scrollTo, setScrollTo] = useState(() => today.absolute_date);

  const infiniScroll = function () {
    const allDays = daysArray.slice();
    add.current += 1;
    allDays.push(...DAYS(add.current));
    setDaysArray(allDays);
  };

  const scrollToMonth = function (date: moment.MomentInput) {
    const allDays = daysArray.slice();
    const currentMonth = moment(
      moment(daysArray[daysArray.length - 1].absolute_date)
    );
    const targetMonth = moment(moment(date));
    const diff = targetMonth.diff(currentMonth, "month", true);
    add.current += diff;
    allDays.push(...DAYS(add.current));
    setDaysArray(allDays);
    setScrollTo(moment(date).format("MMMM D YYYY"));
  };

  const scrollToToday = function () {
    if (typeof window !== "undefined") {
      document
        ?.getElementById(`${today?.absolute_date}`)
        ?.scrollIntoView({ inline: "start" });
    }
  };

  useEffect(() => {
    scrollToToday();
  }, []);

  return (
    <div>
      <App_sidebar scrollToMonth={scrollToMonth} today={today}></App_sidebar>
      <Task_Nav today={today}></Task_Nav>
      <Task_view
        daysArray={daysArray}
        setDaysArray={setDaysArray}
        infiniScroll={infiniScroll}
        scrollTo={scrollTo}
        today={today}
      ></Task_view>
    </div>
  );
}

export default Main_app;
