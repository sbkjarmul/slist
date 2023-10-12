import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { CSS } from "@dnd-kit/utilities";
import { ColumnModel, TaskModel } from "@/models/task.model";
import { useState, useMemo, FormEvent } from "react";
import { DraggableItemEnum } from "@/enums/shared.enum";
import { TaskStatus } from "@/enums/task.enum";
import Input from "../inputs/Input";
import { getValueFromEvent } from "@/presentation/utils/shared.utils";
import "./TasksColumn.scss";

interface TasksColumnProps {
  column: ColumnModel;
  onUpdateColumn: (columnId: number, title: TaskStatus) => void;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (task: TaskModel) => void;
}

const TasksColumn = ({
  column: { id, title, tasks },
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

  const handleOnEnter = () => {
    setEditMode(false);
  };

  const handleTitleChange = (event: FormEvent) => {
    onUpdateColumn(id, getValueFromEvent(event) as TaskStatus);
  };

  if (isDragging) {
    return (
      <div
        className="column column--is-dragging"
        ref={setNodeRef}
        style={style}
      >
        <h2 className="column__title" {...attributes} {...listeners} />
      </div>
    );
  }

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <header className="column__header">
        <h2
          className="column__title"
          onClick={handleTitleClick}
          {...attributes}
          {...listeners}
          data-testid="column-title"
        >
          {!editMode && title}
          {editMode && (
            <Input
              value={title}
              onBlur={handleTitleBlur}
              onEnter={handleOnEnter}
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
