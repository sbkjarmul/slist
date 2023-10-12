import { useEffect, useMemo, useState } from "react";
import TasksColumn from "@/presentation/components/tasks/TasksColumn";
import { TaskModel, ColumnModel } from "@/models/task.model";
import taskUseCase from "@/usecases/task.usecase";
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
import PlusIcon from "@/presentation/icons/PlusIcon";
import {
  generateColumns,
  getColumnFromDragStartEvent,
  getTaskFromDragStartEvent,
  getTypeFromDragStartEvent,
} from "@/presentation/utils/task.utils";
import { createPortal } from "react-dom";
import TaskItem from "@/presentation/components/tasks/TaskItem";
import { DraggableItemEnum } from "@/enums/shared.enum";
import { TaskStatus } from "@/enums/task.enum";
import content from "@/presentation/assets/content.json";
import "./Tasks.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [columns, setColumns] = useState<ColumnModel[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnModel | null>(null);
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

  const updateColumn = (columnId: number, title: TaskStatus) => {
    const newColumns: ColumnModel[] = columns.map((column) =>
      column.id === columnId ? { ...column, title } : column
    );

    setColumns(newColumns);
  };

  const createNewTask = async () => {
    await taskUseCase.createTask("New task");
    setTasks([...tasks]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (getTypeFromDragStartEvent(event) === DraggableItemEnum.COLUMN) {
      setActiveColumn(getColumnFromDragStartEvent(event) as ColumnModel);
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
    <main className="tasks">
      <section className="tasks__baner">
        <h1 className="tasks__title">{content.tasks.title}</h1>
        <button className="button" onClick={createNewTask}>
          <PlusIcon className="button__icon button__icon--white" />
          <span className="button__text" data-testid="add-task-button">
            {content.tasks.addTask}
          </span>
        </button>
      </section>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <section className="tasks__columns">
          <SortableContext items={columnsIds}>
            {columns.map((column) => (
              <TasksColumn
                key={column.id}
                column={column}
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
                column={activeColumn}
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
