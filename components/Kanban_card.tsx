/* eslint-disable @typescript-eslint/no-explicit-any */
import { Droppable } from "./Droppable";
import { CardContent, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TodayType } from "../pages/Main_app";
import Add_task_button from "./Add_task_button";
import Task_card from "./Task_card";
import { DayType, TaskType } from "./Task_view";
import { v4 as uuidv4 } from "uuid";

type PropsType = {
  id: string;
  day: DayType;
  tasks: Array<TaskType>;
  today: TodayType;
  allTasksArray: { [key: string]: any };
};

const normalise = (value: number, MIN: number, MAX: number) =>
  ((value - MIN) * 100) / (MAX - MIN);

function Kanban_card(props: PropsType) {
  const [tasks, setTasks] = useState(props.tasks);
  const [updates, setUpdates] = useState(false);
  const id = props.id;
  const day = props.day;
  const totalTasks = tasks.length;
  let completedTasks = 0;
  const [progressBarValue, setProgressBarValue] = useState(
    normalise(completedTasks, 0, totalTasks !== 0 ? totalTasks : 1)
  );
  const [shouldUpdateProgressBar, setShouldUpdateProgressBar] = useState(false);

  useEffect(() => {
    tasks.map((task) => {
      if (task.completed == true) {
        completedTasks += 1;
      }
    });
    props.allTasksArray[id].tasks = tasks;
    setProgressBarValue(
      normalise(completedTasks, 0, totalTasks !== 0 ? totalTasks : 1)
    );
    setShouldUpdateProgressBar(false);
  }, [shouldUpdateProgressBar]);

  useEffect(() => {
    setUpdates(false);
  }, [updates]);

  return (
    <div
      id={id}
      className="mr-3 ml-2 pt-5 pl-6 text-black dark:text-white h-screen"
      style={{ minWidth: "232px", maxWidth: "232px" }}
    >
      <div className="fixed" style={{ width: "208px" }}>
        <h1 className="text-2xl font-semibold">{day.day_name_full}</h1>
        <h2 className="text-sm font-medium text-zinc-500">{day.date}</h2>
        {id == props.today.absolute_date ? (
          <LinearProgress
            variant="determinate"
            className="rounded-md h-2 my-3 bg-zinc-100 dark:bg-zinc-600"
            sx={{
              ".MuiLinearProgress-bar": {
                borderRadius: "6px",
                backgroundColor: "rgb(34 197 94)",
                color: "rgb(34 197 94)",
              },
            }}
            value={progressBarValue}
          ></LinearProgress>
        ) : (
          <div className="rounded-md w-full h-2 my-3 bg-zinc-100 dark:bg-zinc-600 opacity-0">
            <div className="rounded-md bg-green-500 w-2/3 h-2 opacity-0"></div>
          </div>
        )}
        <Add_task_button
          update={setUpdates}
          tasks={tasks}
          setTasks={setTasks}
          id={`${props.id} + ${uuidv4()}`}
        ></Add_task_button>
      </div>
      <CardContent
        className="p-0 h-fit overflow-y-scroll"
        style={{ marginTop: "55%" }}
      >
        <Droppable id={id}>
          {tasks.map((task: TaskType, index: number) => {
            return (
              <Task_card
                key={task.id}
                update={setUpdates}
                allTasks={tasks}
                setTasks={setTasks}
                id={task.id}
                value={task.task}
                completed={task.completed}
                index={index}
                parent={task.id.substring(0, task.id.indexOf("+")).trim()}
                updateProgressBar={setShouldUpdateProgressBar}
              ></Task_card>
            );
          })}
        </Droppable>
      </CardContent>
    </div>
  );
}

export default Kanban_card;
