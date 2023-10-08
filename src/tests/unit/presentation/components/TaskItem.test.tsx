import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskModel } from "@/models/task.model";
import TaskItem from "@/presentation/components/tasks/TaskItem";

test("Render App", () => {
  render(
    <TaskItem
      task={{} as TaskModel}
      onDeleteTask={() => {}}
      onUpdateTask={() => {}}
    />
  );
  expect(true).toBeTruthy();
});
