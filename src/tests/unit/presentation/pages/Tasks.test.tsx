import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tasks from "@/presentation/pages/Tasks";
import content from "@/presentation/assets/content.json";
import taskUsecase from "@/usecases/task.usecase";
import { tasks } from "../mocks/tasks.mock";

jest.mock("@/usecases/task.usecase");

const mockedTaskUseCase = jest.mocked(taskUsecase);

describe("Tasks", () => {
  beforeEach(() => {
    mockedTaskUseCase.fetchTasks.mockResolvedValue(tasks);
  });

  it("should render the page", async () => {
    await act(async () => render(<Tasks />));
    const title = screen.getByText(content.tasks.title);
    expect(title).toBeInTheDocument();
  });

  it("should render add task button", async () => {
    await act(async () => render(<Tasks />));
    const addTaskButton = screen.getByTestId("add-task-button");
    expect(addTaskButton).toBeInTheDocument();
  });
});
