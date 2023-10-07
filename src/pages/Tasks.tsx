import { useEffect, useMemo, useState } from "react";
import TasksColumn from "../components/tasks/TasksColumn";
import { TaskModel, TaskStatus } from "../models/task.model";
import taskUseCase from "../usecases/task.usecase";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import PlusIcon from "../icons/PlusIcon";
import {
  generateColumns,
  getColumnFromDragStartEvent,
  getTaskFromDragStartEvent,
  getTypeFromDragStartEvent,
} from "../utils/task.utils";
import { createPortal } from "react-dom";
import TaskItem from "../components/tasks/TaskItem";
import { Column } from "@/types/shared.types";
import { DraggableItemEnum } from "@/enums/shared.enum";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<TaskModel | null>(null);

  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  useEffect(() => {
    taskUseCase.fetchTasks().then((tasks: TaskModel[]) => {
      setTasks(tasks);
      setColumns(generateColumns(tasks));
    });
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const deleteTask = async (taskId: number) => {
    await taskUseCase.deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = async (task: TaskModel) => {
    await taskUseCase.updateTask(task);
    setTasks([...tasks]);
  };

  const updateColumn = (columnId: number, title: string) => {
    const newColumns: Column[] = columns.map((column) =>
      column.id === columnId ? { ...column, title } : column
    );

    setColumns(newColumns);
  };

  const createNewTask = async () => {
    await taskUseCase.createTask("title");
    setTasks([...tasks]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (getTypeFromDragStartEvent(event) === DraggableItemEnum.COLUMN) {
      setActiveColumn(getColumnFromDragStartEvent(event) as Column);
      return;
    }

    if (getTypeFromDragStartEvent(event) === DraggableItemEnum.TASK) {
      setActiveTask(getTaskFromDragStartEvent(event) as TaskModel);
      return;
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === DraggableItemEnum.TASK;
    const isOverTask = over.data.current?.type === DraggableItemEnum.TASK;

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].status = tasks[overIndex].status;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverColumn = over.data.current?.type === DraggableItemEnum.COLUMN;

    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = columns.findIndex((column) => column.id === overId);

        tasks[activeIndex].status = columns[overIndex].title as TaskStatus;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeId
      );

      const overColumnIndex = columns.findIndex(
        (column) => column.id === overId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <main className="structure__dashboard">
      <section className="structure__baner">
        <h1 className="structure__title">Tasks</h1>
        <button className="button" onClick={createNewTask}>
          <PlusIcon className="button__icon button__icon--white" />
          <span className="button__text ">Add a task</span>
        </button>
      </section>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <section className="structure__columns">
          <SortableContext items={columnsIds}>
            {columns.map((column) => (
              <TasksColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={column.tasks}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
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
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
                onUpdateColumn={updateColumn}
              />
            )}
            {activeTask && (
              <TaskItem
                task={activeTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </main>
  );
};

export default Tasks;
