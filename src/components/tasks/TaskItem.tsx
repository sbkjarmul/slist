import { useState, KeyboardEvent, FormEvent } from "react";
import TrashIcon from "../../icons/TrashIcon";
import { DragAndDropEnum, KeyboardKeysEnum } from "../../enums/shared.enum";
import { TaskModel } from "../../models/task.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskItemProps {
  task: TaskModel;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (task: TaskModel) => void;
}

const TaskItem = ({ task, onDeleteTask, onUpdateTask }: TaskItemProps) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: DragAndDropEnum.TASK,
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleTaskDelete = (id: number) => {
    onDeleteTask(id);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
  };

  const handleOnEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === KeyboardKeysEnum.ENTER) {
      onUpdateTask(task);
      toggleEditMode();
    }
  };

  const handleOnChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    onUpdateTask({ ...task, description: value });
  };

  if (isDragging) {
    return (
      <article
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task task--is-dragging shadow-1"
      ></article>
    );
  }

  if (editMode) {
    return (
      <article
        className="task shadow-1"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="task__text">
          <h3>{task.title}</h3>
          <textarea
            className="task__description--edit"
            value={task.description}
            autoFocus
            placeholder="Task description here"
            onBlur={toggleEditMode}
            onKeyDown={handleOnEnter}
            onChange={handleOnChange}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className="task shadow-1"
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="task__text">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task__action">
        {mouseIsOver && (
          <button
            className="button button--delete"
            onClick={() => handleTaskDelete(task.id)}
          >
            <TrashIcon className="button__icon" />
          </button>
        )}
      </div>
    </article>
  );
};

export default TaskItem;
