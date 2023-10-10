import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "@/presentation/components/tasks/TaskItem";
import { task } from "@/tests/unit/presentation/mocks/tasks.mock";

describe("TaskItem component", () => {
  it("should render the component with task data", () => {
    const { getByTestId } = render(
      <TaskItem task={task} onDeleteTask={() => {}} onUpdateTask={() => {}} />
    );

    const taskItem = getByTestId("task-item");

    expect(taskItem).toBeInTheDocument();
    expect(taskItem).toHaveTextContent(task.title);
    expect(taskItem).toHaveTextContent(task.description);
  });
});
