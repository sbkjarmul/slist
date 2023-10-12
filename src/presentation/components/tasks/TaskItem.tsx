import { useState, KeyboardEvent, FormEvent, useRef } from "react";
import TrashIcon from "@/presentation/icons/TrashIcon";
import { DraggableItemEnum, KeyboardKeysEnum } from "@/enums/shared.enum";
import { TaskModel } from "@/models/task.model";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./TaskItem.scss";
import {
  getValueFromEvent,
  setCursorOnEnd,
} from "@/presentation/utils/shared.utils";
import { TaskBlurEvent } from "@/presentation/types/shared.types";
import Button, { ButtonTypeEnum } from "../button/Button";
import Input from "../inputs/Input";

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

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

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
      type: DraggableItemEnum.TASK,
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

    if (editMode) {
      onUpdateTask({ ...task, title, description });
    }
  };

  const onBlurHandler = (event: TaskBlurEvent) => {
    if (isEditElement(event)) {
      toggleEditMode();
    }
  };

  const isEditElement = (event: TaskBlurEvent) =>
    event.relatedTarget !== titleRef.current &&
    event.relatedTarget !== descriptionRef.current;

  const handleOnEnter = (event: KeyboardEvent) => {
    if (event.key === KeyboardKeysEnum.ENTER) {
      onUpdateTask({ ...task, description });
      toggleEditMode();
    }
  };

  const handleTitleChange = (event: FormEvent) => {
    setTitle(getValueFromEvent(event));
  };

  const handleDescriptionChange = (event: FormEvent) => {
    setDescription(getValueFromEvent(event));
  };

  if (isDragging) {
    return (
      <article
        className="task task--is-dragging"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
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
          <Input
            type="text"
            value={title}
            onEnter={handleOnEnter}
            onChange={handleTitleChange}
            onBlur={onBlurHandler}
            onFocus={setCursorOnEnd}
            ref={titleRef}
          />
          <Input
            type="multi"
            value={description}
            ref={descriptionRef}
            placeholder="Task description here"
            onBlur={onBlurHandler}
            onEnter={handleOnEnter}
            onChange={handleDescriptionChange}
            onFocus={setCursorOnEnd}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className="task"
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-testid="task-item"
    >
      <div className="task__text">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task__action">
        {mouseIsOver && (
          <Button
            onClick={() => handleTaskDelete(task.id)}
            type={ButtonTypeEnum.TRANSPARENT}
          >
            <TrashIcon className="button__icon" />
          </Button>
        )}
      </div>
    </article>
  );
};

export default TaskItem;
