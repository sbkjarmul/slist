import {
  useState,
  KeyboardEvent,
  FormEvent,
  MouseEvent,
  useRef,
  FocusEvent,
} from "react";
import TrashIcon from "../../icons/TrashIcon";
import { DragAndDropEnum, KeyboardKeysEnum } from "../../enums/shared.enum";
import { TaskModel } from "../../models/task.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { setCursorOnEnd } from "../../utils/shared.utils";

interface TaskItemProps {
  task: TaskModel;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (task: TaskModel) => void;
}

const TaskItem = ({ task, onDeleteTask, onUpdateTask }: TaskItemProps) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);

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

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

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

    if (editMode) {
      onUpdateTask({ ...task, title, description });
    }
  };

  const onBlurHandler = (
    event:
      | FocusEvent<HTMLTextAreaElement | HTMLInputElement>
      | MouseEvent<HTMLElement>
  ) => {
    if (
      event.relatedTarget !== titleRef.current &&
      (event as FocusEvent).relatedTarget !== descriptionRef.current
    ) {
      toggleEditMode();
    }
  };

  const handleOnEnter = (event: KeyboardEvent) => {
    if (event.key === KeyboardKeysEnum.ENTER) {
      onUpdateTask({ ...task, description });
      toggleEditMode();
    }
  };

  const handleTitleChange = (event: FormEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    setTitle(value);
  };

  const handleDescriptionChange = (event: FormEvent) => {
    const { value } = event.target as HTMLTextAreaElement;
    setDescription(value);
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
          <input
            type="text"
            value={title}
            onKeyDown={handleOnEnter}
            onChange={handleTitleChange}
            onBlur={onBlurHandler}
            onFocus={setCursorOnEnd}
            ref={titleRef}
          />
          <textarea
            className="task__description--edit"
            value={description}
            ref={descriptionRef}
            placeholder="Task description here"
            onBlur={onBlurHandler}
            onKeyDown={handleOnEnter}
            onChange={handleDescriptionChange}
            onFocus={setCursorOnEnd}
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
