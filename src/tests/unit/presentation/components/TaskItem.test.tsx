import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskModel } from "@/models/task.model";
import TaskItem from "@/presentation/components/tasks/TaskItem";

it("Render App", () => {
  render(
    <TaskItem
      task={{} as TaskModel}
      onDeleteTask={() => {}}
      onUpdateTask={() => {}}
    />
  );
  expect(true).toBeTruthy();
});
