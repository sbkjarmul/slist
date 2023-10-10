import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import TasksColumn from "@/presentation/components/tasks/TasksColumn";
import { column } from "@/tests/unit/presentation/mocks/tasks.mock";

describe("TaskColumn", () => {
  const onDeleteTaskSpy = jest.fn();
  const onUpdateColumnSpy = jest.fn();
  const onUpdateTaskSpy = jest.fn();

  it("renders the column title", () => {
    const tasks = column.tasks;
    const columnTitle = column.title;
    const { getByText, getAllByTestId } = render(
      <TasksColumn
        column={column}
        onDeleteTask={onDeleteTaskSpy}
        onUpdateColumn={onUpdateColumnSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );
    expect(getByText(columnTitle)).toBeInTheDocument();
    expect(getAllByTestId("task-item")).toHaveLength(tasks.length);
  });

  it("renders the column title in edit mode and fire onUpdateColumn", () => {
    const { getByTestId } = render(
      <TasksColumn
        column={column}
        onDeleteTask={onDeleteTaskSpy}
        onUpdateColumn={onUpdateColumnSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const title = getByTestId("column-title");

    fireEvent(title, new MouseEvent("click", { bubbles: true }));

    const input = getByTestId("column-title-input");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(column.title);

    const newTitle = "New title";

    fireEvent.change(input, { target: { value: newTitle } });

    expect(onUpdateColumnSpy).toHaveBeenCalled();
  });
});
