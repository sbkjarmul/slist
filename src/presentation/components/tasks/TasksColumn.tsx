import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { CSS } from "@dnd-kit/utilities";
import { TaskModel } from "@/models/task.model";
import { useState, KeyboardEvent, ChangeEvent, useMemo } from "react";
import { DraggableItemEnum, KeyboardKeysEnum } from "@/enums/shared.enum";
import { TaskStatus } from "@/enums/task.enum";

interface TasksColumnProps {
  id: number;
  title: string;
  tasks: TaskModel[];
  onUpdateColumn: (columnId: number, title: TaskStatus) => void;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (task: TaskModel) => void;
}

const TasksColumn = ({
  id,
  title,
  tasks,
  onUpdateColumn,
  onDeleteTask,
  onUpdateTask,
}: TasksColumnProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: DraggableItemEnum.COLUMN,
      column: { id, title, tasks },
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const tasksIds = useMemo(() => tasks?.map((task) => task.id), [tasks]);

  const handleTitleClick = () => {
    setEditMode(true);
  };

  const handleTitleBlur = () => {
    setEditMode(false);
  };

  const handleTitleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyboardKeysEnum.ENTER) {
      setEditMode(false);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateColumn(id, event.target.value as TaskStatus);
  };

  if (isDragging) {
    return (
      <div
        className="structure__column structure__column--is-dragging"
        ref={setNodeRef}
        style={style}
      >
        <h2
          className="structure__column__title"
          {...attributes}
          {...listeners}
        />
      </div>
    );
  }

  return (
    <div className="structure__column" ref={setNodeRef} style={style}>
      <header className="structure__column__header">
        <h2
          className="structure__column__title"
          onClick={handleTitleClick}
          {...attributes}
          {...listeners}
        >
          {!editMode && title}
          {editMode && (
            <input
              value={title}
              autoFocus
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />
          )}
        </h2>
      </header>
      <SortableContext items={tasksIds}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default TasksColumn;
