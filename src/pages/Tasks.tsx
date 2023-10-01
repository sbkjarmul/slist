import { useEffect, useMemo, useState } from "react";
import TasksColumn from "../components/tasks/TasksColumn";
import { ColumnModel, TaskModel, TaskStatus } from "../models/task.model";
import taskUseCase from "../usecases/task.usecase";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import PlusIcon from "../icons/PlusIcon";
import {
  DraggableItemEnum,
  getCurrentFromDragStartEvent,
  getTypeFromDragStartEvent,
} from "../utils/task.utils";
import { createPortal } from "react-dom";

const basicColumns = (tasks: TaskModel[]): ColumnModel[] => [
  {
    id: 1,
    title: TaskStatus.CREATED,
    tasks: tasks.filter(
      (task: TaskModel) => task.status === TaskStatus.CREATED
    ),
  },
  {
    id: 2,
    title: TaskStatus.OPEN,
    tasks: tasks.filter((task: TaskModel) => task.status === TaskStatus.OPEN),
  },
  {
    id: 3,
    title: TaskStatus.IN_PROGRESS,
    tasks: tasks.filter(
      (task: TaskModel) => task.status === TaskStatus.IN_PROGRESS
    ),
  },
  {
    id: 4,
    title: TaskStatus.DONE,
    tasks: tasks.filter((task: TaskModel) => task.status === TaskStatus.DONE),
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [columns, setColumns] = useState<ColumnModel[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnModel | null>(null);

  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    taskUseCase.fetchTasks().then((tasks: TaskModel[]) => {
      setTasks(tasks);
      setColumns(basicColumns(tasks));
    });
  }, [tasks]);

  const onTaskClick = async (task: TaskModel) => {
    const updatedTask = await taskUseCase.markTaskAsOpened(task.id);
    updateTasks(updatedTask);
  };

  const updateTasks = (updatedTask: TaskModel) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  const deleteColumn = (columnId: number) => {
    console.log(columnId);
  };
  const updateColumn = (columnId: number, title: string) => {
    const newColumns = columns.map((column) =>
      column.id === columnId ? { ...column, title } : column
    );

    setColumns(newColumns);
  };

  const createNewTask = async () => {
    await taskUseCase.createTask("title");
    setTasks([...tasks]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    // setActiveId(event.active.id);
    if (getTypeFromDragStartEvent(event) === DraggableItemEnum.COLUMN) {
      console.log(event);
      setActiveColumn(getCurrentFromDragStartEvent(event) as ColumnModel);
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    console.log(activeColumn);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <div className="structure blur-2">
      <header className="structure__header">
        <h1 className="structure__header__logo">slist.</h1>
      </header>
      <main className="structure__dashboard">
        <section className="structure__baner">
          <h1 className="structure__title">Tasks</h1>
          <button className="button" onClick={createNewTask}>
            <PlusIcon className="button__icon" />
            <span className="button__text">Add a task</span>
          </button>
        </section>

        <DndContext
          sensors={sensors}
          // collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          // onDragMove={handleDragMove}
        >
          <section className="structure__columns">
            <SortableContext items={columnsIds}>
              {columns.map((column) => (
                <TasksColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  onTaskClick={onTaskClick}
                  onDeleteColumn={deleteColumn}
                  onUpdateColumn={updateColumn}
                />
              ))}
            </SortableContext>
          </section>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <TasksColumn
                  id={activeColumn.id}
                  title={activeColumn.title}
                  tasks={activeColumn.tasks}
                  onTaskClick={onTaskClick}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </main>
      <footer className="structure__footer"></footer>
    </div>
  );
};

export default Tasks;
