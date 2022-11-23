/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import React, { useEffect, useRef, useState } from "react";
import Kanban_card from "./Kanban_card";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Calendar_view from "./Calendar_view";
import { Task_card_skeleton } from "./Task_card";

export type DayType = {
  day_of_month: string;
  day_name_shorthand: string;
  date: string;
  day_name_full: string;
  absolute_date: string;
};

export type TaskType = {
  id: string;
  task: string;
  completed: boolean;
};

function Task_view(props: any) {
  const daysArray = props.daysArray;
  const infiniScroll = props.infiniScroll;
  const [update, setUpdate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeElementValues, setActiveElementValues] = useState({
    value: "",
  });
  const [calendarEvents, setCalendarEvents]: any = useState([]);
  const today = props.today;
  const [scrolling, setScrolling] = useState(false);
  const [containers, setContainers] = useState(
    daysArray.map((day: any) => {
      return day.absolute_date;
    })
  );
  const allTasksArray: { [key: string]: any } = useRef({});
  const calendarEventArray: any = useRef([]);
  const x = useRef(0);
  const y = useRef(0);

  const pointerSensor = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    setContainers(
      daysArray.map((day: any) => {
        return day.absolute_date;
      })
    );
  }, [daysArray]);

  useEffect(() => {
    setUpdate(false);
  }, [update, daysArray]);

  useEffect(() => {
    console.log(props.scrollTo);
    setContainers(
      daysArray.map((day: any) => {
        return day.absolute_date;
      })
    );
    // if (typeof document !== "undefined") {
    //   document
    //     .getElementById(`${props.scrollTo}`)
    //     .scrollIntoView({ behavior: "smooth", inline: "start" });
    // }
  }, [props.scrollTo]);

  function onMouseUpdate(e: any) {
    x.current = e.pageX;
    y.current = e.pageY;
  }

  const handleDragStart = function (event: any) {
    console.log(event);
    document.addEventListener("mousemove", onMouseUpdate, false);
    setActiveElementValues({ value: event.active.data.current.task });
    setIsDragging(true);
  };

  function customCollisionDetectionAlgorithm(args: any) {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    return closestCenter(args);
  }

  const handleDragEnd = function (event: any) {
    document.removeEventListener("mousemove", onMouseUpdate, false);
    const oldParent = event.active.data.current.parent;
    const oldTaskId = event.active.id;
    const taskIndex = allTasksArray.current[oldParent].tasks.findIndex(
      (obj: any) => obj.id == oldTaskId
    );
    if (event.over.id !== "calendar_droppable") {
      const removedElementId = oldTaskId
        .substring(oldTaskId.indexOf("+") + 1)
        .trim();
      const newParent = event.over.id;
      const removedElement = allTasksArray.current[oldParent].tasks.splice(
        taskIndex,
        1
      );
      const removedElementIndex = allTasksArray.current[newParent].tasks.push(
        removedElement[0]
      );
      allTasksArray.current[newParent].tasks[
        removedElementIndex - 1
      ].id = `${newParent} + ${removedElementId}`;
    } else {
      const timesContainerScrollTop = document
        ?.getElementById("timesContainer")
        ?.getBoundingClientRect()?.top;
      if (timesContainerScrollTop) {
        calendarEventArray.current.push({
          event: allTasksArray.current[oldParent].tasks[taskIndex],
          x: x.current,
          y: Math.round(
            ((y.current - (timesContainerScrollTop + window.scrollY)) / 5) * 5
          ),
        });
      }
      setCalendarEvents(calendarEventArray.current);
    }
    setIsDragging(false);
    setUpdate(true);
  };

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const taskContainer = document.getElementById("taskContainer");
    if (taskContainer) {
      taskContainer.addEventListener("scroll", function () {
        if (
          taskContainer.scrollLeft ===
          taskContainer.scrollWidth - taskContainer.clientWidth
        ) {
          setScrolling(true);
        }
      });
    }
  }

  useEffect(() => {
    if (scrolling) {
      infiniScroll();
      setScrolling(false);
    }
  }, [scrolling]);

  return (
    <DndContext
      sensors={pointerSensor}
      collisionDetection={customCollisionDetectionAlgorithm}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        id="taskContainer"
        style={{
          marginLeft: "340px",
          height: "calc(100vh - 65px)",
          marginTop: "65px",
          minWidth: "100%",
        }}
        className="fixed w-full overflow-x-auto overflow-y-hidden bg-gray-200 dark:bg-zinc-900 drop-shadow-md border-y border-l dark:border-zinc-800 border-gray-400"
      >
        <div className="flex w-fit h-max">
          {containers.map((day: any, index: number) => {
            if (!allTasksArray.current.hasOwnProperty(day)) {
              allTasksArray.current[day] = { tasks: [] };
            }
            if (allTasksArray.current[day].task?.length !== 0) {
              allTasksArray.current[day].task?.forEach(
                (task: any, index: number) => {
                  if (!task.hasOwnProperty(task) || task.task == "") {
                    allTasksArray.current[day].task.splice(index, 1);
                  }
                }
              );
            }
            return (
              <Kanban_card
                key={day}
                id={day}
                today={today}
                day={daysArray[index]}
                tasks={allTasksArray.current[day].tasks}
                allTasksArray={allTasksArray.current}
              ></Kanban_card>
            );
          })}
        </div>
      </div>
      <Calendar_view
        calendarEvents={calendarEvents}
        setCalendarEvents={setCalendarEvents}
      ></Calendar_view>
      <DragOverlay>
        {isDragging ? (
          <Task_card_skeleton
            value={activeElementValues.value}
          ></Task_card_skeleton>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Task_view;
