import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TasksColumn from "@/presentation/components/tasks/TasksColumn";
import { column } from "@/tests/unit/presentation/mocks/tasks.mock";

describe("TaskColumn", () => {
  const onDeleteTaskSpy = jest.fn();
  const onUpdateColumnSpy = jest.fn();
  const onUpdateTaskSpy = jest.fn();

  it("renders the column title", () => {
    const tasks = column.tasks;
    const columnTitle = column.title;
    render(
      <TasksColumn
        column={column}
        onDeleteTask={onDeleteTaskSpy}
        onUpdateColumn={onUpdateColumnSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );
    expect(screen.getByText(columnTitle)).toBeInTheDocument();
    expect(screen.getAllByTestId("task-item")).toHaveLength(tasks.length);
  });

  it("renders the column title in edit mode and fire onUpdateColumn", () => {
    render(
      <TasksColumn
        column={column}
        onDeleteTask={onDeleteTaskSpy}
        onUpdateColumn={onUpdateColumnSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const title = screen.getByText(column.title);

    fireEvent(title, new MouseEvent("click", { bubbles: true }));

    const input = screen.getByDisplayValue(column.title);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(column.title);

    const newTitle = "New title";

    fireEvent.change(input, { target: { value: newTitle } });

    expect(onUpdateColumnSpy).toHaveBeenCalled();
  });
});
