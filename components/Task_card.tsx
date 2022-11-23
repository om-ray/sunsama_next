/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Card, IconButton, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TaskType } from "./Task_view";
import { useDraggable } from "@dnd-kit/core";

type PropType = {
  update: React.Dispatch<boolean>;
  allTasks: TaskType[];
  setTasks: React.Dispatch<TaskType[]>;
  id: string;
  value: string;
  completed: boolean;
  index: number;
  updateProgressBar: React.Dispatch<boolean>;
  parent: string;
};

function Task_card(props: PropType) {
  const [completed, setCompleted] = useState(props.completed);
  const tasksList = props.allTasks;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: { parent: props.parent, task: props.value, completed: completed },
  });

  function deleteElement(
    event: React.FocusEvent<HTMLTextAreaElement, Element>,
    allTasks: TaskType[],
    setTasks: React.Dispatch<TaskType[]>,
    updates: React.Dispatch<boolean>,
    index: number
  ) {
    const tasksList = allTasks;
    if (event.target.value == "") {
      tasksList.splice(index, 1);
      setTasks(tasksList);
      updates(true);
    }
  }

  function updateElement(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    allTasks: TaskType[],
    setTasks: React.Dispatch<TaskType[]>,
    index: number
  ) {
    const tasksList = allTasks;
    tasksList[index].task = event.target.value;
    setTasks(tasksList);
  }

  useEffect(() => {
    tasksList[props.index].completed = completed;
    props.setTasks(tasksList);
    props.updateProgressBar(true);
  }, [completed]);

  return (
    <Card
      ref={setNodeRef}
      className="w-full my-2 h-fit flex items-center py-1 px-3 dark:bg-zinc-800 bg-zinc-100"
      style={{
        // transform: CSS.Transform.toString(transform),
        minHeight: "2rem",
      }}
      id={props.id}
    >
      <IconButton
        onClick={() => {
          setCompleted(!completed);
        }}
        className="w-4 h-4 mr-2 flex justify-center items-center m-0"
      >
        {!completed ? (
          <CheckCircleOutline className="text-xl font-normal fill-zinc-500"></CheckCircleOutline>
        ) : (
          <CheckCircle className="text-xl font-normal fill-green-500"></CheckCircle>
        )}
      </IconButton>
      <TextareaAutosize
        spellCheck={false}
        onBlur={(e) => {
          deleteElement(
            e,
            tasksList,
            props.setTasks,
            props.update,
            props.index
          );
        }}
        onChange={(e) => {
          updateElement(e, props.allTasks, props.setTasks, props.index);
        }}
        {...listeners}
        {...attributes}
        autoFocus={true}
        defaultValue={props.value}
        placeholder="Task description..."
        className={`${
          !completed ? "" : "line-through"
        } w-full h-4 bg-transparent text-sm focus:outline-none dark:text-zinc-500 text-black resize-none`}
      />
    </Card>
  );
}

export function Task_card_skeleton(props: any) {
  return (
    <Card className="w-full my-2 h-8 flex items-center px-3 dark:bg-zinc-800 bg-zinc-100 opacity-50">
      <IconButton className="w-4 h-4 mr-2 flex justify-center items-center m-0">
        <CheckCircleOutline className="text-xl font-normal fill-zinc-500"></CheckCircleOutline>
      </IconButton>
      <TextareaAutosize
        defaultValue={props.value}
        className={
          "w-full h-4 bg-transparent text-sm focus:outline-none dark:text-zinc-500 text-black resize-none"
        }
      />
    </Card>
  );
}

export default Task_card;
