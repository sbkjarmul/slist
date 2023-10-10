import { ITaskUseCase, TaskUseCase } from "@/usecases/task.usecase";
import TaskAPI from "@/infrastructure/task.api";
import { TaskModel } from "@/models/task.model";
import { TaskStatus } from "@/enums/task.enum";

jest.mock("@/infrastructure/task.api");

describe("TaskUseCase", () => {
  let taskUseCase: ITaskUseCase;
  let taskAPI: TaskAPI;

  beforeEach(() => {
    taskAPI = new TaskAPI();
    taskUseCase = new TaskUseCase(taskAPI);
  });

  describe("fetchTasks", () => {
    it("should call taskAPI.fetchTasks", async () => {
      await taskUseCase.fetchTasks();
      expect(taskAPI.fetchTasks).toHaveBeenCalled();
    });
  });

  describe("createTask", () => {
    it("should call taskAPI.createTask with the given title", async () => {
      const title = "Test task";
      await taskUseCase.createTask(title);
      expect(taskAPI.create).toHaveBeenCalledWith(title);
    });
  });

  describe("updateTask", () => {
    it("should call taskAPI.updateTask with the given task", async () => {
      const task: TaskModel = {
        id: 1,
        title: "Test task",
        description: "",
        status: TaskStatus.CREATED,
      };
      await taskUseCase.updateTask(task);
      expect(taskAPI.update).toHaveBeenCalledWith(task);
    });
  });

  describe("deleteTask", () => {
    it("should call taskAPI.deleteTask with the given id", async () => {
      const id = 1;
      await taskUseCase.deleteTask(id);
      expect(taskAPI.delete).toHaveBeenCalledWith(id);
    });
  });
});
