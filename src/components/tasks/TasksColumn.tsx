import { TaskModel } from "../../models/task.model";
import TaskItem from "./TaskItem";

interface TasksColumnProps {
  title: string;
  tasks: TaskModel[];
  onTaskClick: (task: TaskModel) => void;
}

const TasksColumn = ({ title, tasks, onTaskClick }: TasksColumnProps) => {
  return (
    <div className="structure__column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
          onClick={() => onTaskClick(task)}
        />
      ))}
    </div>
  );
};

export default TasksColumn;
