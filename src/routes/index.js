import { completeTaskRoute } from "./tasks/complete-task.route.js";
import { createTaskRoute } from "./tasks/create-task.route.js";
import { deleteTaskRoute } from "./tasks/delete-task.route.js";
import { getTaskRoute } from "./tasks/get-task.route.js";
import { listTaskRoute } from "./tasks/list-task.route.js";
import { updateTaskRoute } from "./tasks/update-task.route.js";
import { uploadFileTasks } from "./tasks/upload-file-tasks.route.js";

export const routes = [
  createTaskRoute,
  getTaskRoute,
  deleteTaskRoute,
  listTaskRoute,
  updateTaskRoute,
  completeTaskRoute,
  uploadFileTasks
]