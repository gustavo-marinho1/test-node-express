import express from "express";
import { tasks } from "./tasks.js";

const server = express();

server.use(express.json());

server.get("/tasks", (_, res) => {
  res.status(200).json(tasks);
});

server.post("/tasks", (req, res) => {
  const item = {
    ...req.body,
    id: tasks.length + 1,
  };
  tasks.push(item);
  res.json({message: "Task created!", item: item});
});

server.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = tasks.find(item => item.id === id);

  if (!item) {
    res.status(404).json({message: "Task not found"});
  }
  else {
    Object.assign(item, req.body);
    res.json({message: "Task updated!", item});
  }
});

server.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({message: "Task not found"});
  }
  
  const item = tasks.splice(index, 1)[0];
  res.json({message: "Task deleted!", item: item});
});

server.listen(3300);