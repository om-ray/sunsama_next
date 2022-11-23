import { AddCircleOutline } from "@mui/icons-material";
import { Card, IconButton } from "@mui/material";
import React, { useState } from "react";
import { TaskType } from "./Task_view";

type PropsType = {
  update: React.Dispatch<boolean>;
  tasks: TaskType[];
  setTasks: React.Dispatch<TaskType[]>;
  id: string;
};

function addTaskCard(
  update: React.Dispatch<boolean>,
  tasksArray: TaskType[],
  setTasks: React.Dispatch<TaskType[]>,
  id: string
) {
  const tasksArrayDupe = tasksArray;
  tasksArrayDupe.push({ id: id, task: "", completed: false });
  console.log(tasksArrayDupe);
  setTasks(tasksArrayDupe);
  update(true);
}

function Add_task_button(props: PropsType) {
  const [tasks, setTasks] = useState(props.tasks);

  return (
    <Card
      onClick={() => {
        addTaskCard(props.update, tasks, setTasks, props.id);
      }}
      className="w-full h-8 px-3 items-center flex dark:bg-zinc-800 bg-zinc-100"
    >
      <IconButton className="w-4 h-4 mr-2 flex justify-center items-center m-0">
        <AddCircleOutline className="text-xl font-normal fill-zinc-500"></AddCircleOutline>
      </IconButton>
      <p className="m-0 p-0 text-sm font-medium text-zinc-500">Add a task</p>
    </Card>
  );
}

export default Add_task_button;
