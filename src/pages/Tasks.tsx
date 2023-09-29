import { useEffect, useState } from "react";
import TasksColumn from "../components/tasks/TasksColumn";
import { TaskModel, TaskStatus } from "../models/task.model";
import taskUseCase from "../usecases/task.usecase";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    taskUseCase.fetchTasks().then((tasks: TaskModel[]) => {
      setTasks(tasks);
    });
  }, []);

  const onTaskClick = async (task: TaskModel) => {
    const updatedTask = await taskUseCase.markTaskAsOpened(task.id);
    updateTasks(updatedTask);
  };

  const updateTasks = (updatedTask: TaskModel) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="structure blur-2">
      <header className="structure__header">
        <h1 className="structure__header__logo">slist.</h1>
      </header>
      <main className="structure__dashboard">
        <section className="structure__baner">
          <h1 className="structure__title">Tasks</h1>
          <button className="button">Add a task</button>
        </section>

        <section className="structure__columns">
          <TasksColumn
            title={TaskStatus.CREATED}
            tasks={tasks.filter((task) => task.status === TaskStatus.CREATED)}
            onTaskClick={onTaskClick}
          />
          <TasksColumn
            title={TaskStatus.OPEN}
            tasks={tasks.filter((task) => task.status === TaskStatus.OPEN)}
            onTaskClick={onTaskClick}
          />
          <TasksColumn
            title={TaskStatus.IN_PROGRESS}
            tasks={tasks.filter(
              (task) => task.status === TaskStatus.IN_PROGRESS
            )}
            onTaskClick={onTaskClick}
          />
          <TasksColumn
            title={TaskStatus.DONE}
            tasks={tasks.filter((task) => task.status === TaskStatus.DONE)}
            onTaskClick={onTaskClick}
          />
        </section>
      </main>
      <footer className="structure__footer"></footer>
    </div>
  );
};

export default Tasks;
