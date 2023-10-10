import TaskAPI, { generateID } from "@/infrastructure/task.api";
import { TaskStatus } from "@/enums/task.enum";

describe("TaskAPI", () => {
  let taskAPI: TaskAPI;

  beforeEach(() => {
    taskAPI = new TaskAPI();
  });

  describe("fetchTasks", () => {
    it("should return an array of tasks", async () => {
      const tasks = await taskAPI.fetchTasks();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.length).toBeGreaterThan(0);
      tasks.forEach((task) => {
        expect(task).toHaveProperty("id");
        expect(task).toHaveProperty("title");
        expect(task).toHaveProperty("description");
        expect(task).toHaveProperty("status");
      });
    });
  });

  describe("create", () => {
    it("should create a new task", async () => {
      const title = "New Task";
      const task = await taskAPI.create(title);
      expect(task).toHaveProperty("id");
      expect(task.title).toBe(title);
      expect(task.description).toBe("");
      expect(task.status).toBe(TaskStatus.CREATED);
    });
  });

  describe("update", () => {
    it("should update an existing task", async () => {
      const tasks = await taskAPI.fetchTasks();
      const taskToUpdate = tasks[0];
      const updatedTask = { ...taskToUpdate, title: "Updated Task" };
      const result = await taskAPI.update(updatedTask);
      expect(result).toEqual(updatedTask);
    });
  });

  describe("delete", () => {
    it("should delete an existing task", async () => {
      const tasks = await taskAPI.fetchTasks();
      const taskToDelete = tasks[0];
      const result = await taskAPI.delete(taskToDelete.id);
      expect(result).toBe(taskToDelete.id);
    });
  });

  describe("changeStatus", () => {
    it("should change the status of an existing task", async () => {
      const tasks = await taskAPI.fetchTasks();
      const taskToChange = tasks[0];
      const newStatus = TaskStatus.IN_PROGRESS;
      const result = await taskAPI.changeStatus(taskToChange.id, newStatus);
      expect(result).toEqual({ ...taskToChange, status: newStatus });
    });
  });

  describe("generateID", () => {
    it("should generate a unique ID", () => {
      const id1 = generateID();
      const id2 = generateID();
      expect(id1).not.toBe(id2);
    });
  });
});
