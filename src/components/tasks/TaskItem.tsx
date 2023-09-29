interface TaskItemProps {
  title: string;
  description: string;
  onClick: () => void;
}

const TaskItem = ({ title, description, onClick }: TaskItemProps) => {
  return (
    <article className="task shadow-1" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default TaskItem;
