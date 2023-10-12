import {
  getTypeFromDragStartEvent,
  getCurrentFromDragStartEvent,
  getTaskFromDragStartEvent,
  getColumnFromDragStartEvent,
  generateColumns,
} from "@/presentation/utils/task.utils";
import { TaskStatus } from "@/enums/task.enum";
import { TaskModel } from "@/models/task.model";
import { Active, DragStartEvent } from "@dnd-kit/core";
import { DraggableItemEnum } from "@/enums/shared.enum";

describe("getTypeFromDragStartEvent", () => {
  it("should return the type from the DragStartEvent", () => {
    const event: DragStartEvent = {
      active: {
        data: {
          current: {
            type: DraggableItemEnum.TASK,
          },
        },
      } as unknown as Active,
    };

    const result = getTypeFromDragStartEvent(event);

    expect(result).toEqual(DraggableItemEnum.TASK);
  });
});

describe("getCurrentFromDragStartEvent", () => {
  it("should return the current data from the DragStartEvent", () => {
    const event: DragStartEvent = {
      active: {
        data: {
          current: {
            type: DraggableItemEnum.TASK,
            task: {
              id: 1,
              title: "Task 1",
              description: "Description 1",
              status: TaskStatus.CREATED,
            },
            column: {
              id: 1,
              title: TaskStatus.CREATED,
              tasks: [],
            },
          },
        },
      } as unknown as Active,
    };

    const result = getCurrentFromDragStartEvent(event);

    expect(result).toEqual({
      type: DraggableItemEnum.TASK,
      task: {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status: TaskStatus.CREATED,
      },
      column: {
        id: 1,
        title: TaskStatus.CREATED,
        tasks: [],
      },
    });
  });
});

describe("getTaskFromDragStartEvent", () => {
  it("should return the task from the DragStartEvent", () => {
    const event: DragStartEvent = {
      active: {
        data: {
          current: {
            type: DraggableItemEnum.TASK,
            task: {
              id: 1,
              title: "Task 1",
              description: "Description 1",
              status: TaskStatus.CREATED,
            },
          },
        },
      } as unknown as Active,
    };

    const result = getTaskFromDragStartEvent(event);

    expect(result).toEqual({
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status: TaskStatus.CREATED,
    });
  });
});

describe("getColumnFromDragStartEvent", () => {
  it("should return the column from the DragStartEvent", () => {
    const event: DragStartEvent = {
      active: {
        data: {
          current: {
            type: DraggableItemEnum.TASK,
            column: {
              id: 1,
              title: TaskStatus.CREATED,
              tasks: [],
            },
          },
        },
      } as unknown as Active,
    };

    const result = getColumnFromDragStartEvent(event);

    expect(result).toEqual({
      id: 1,
      title: TaskStatus.CREATED,
      tasks: [],
    });
  });
});

describe("generateColumns", () => {
  it("should generate columns based on the tasks provided", () => {
    const tasks: TaskModel[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status: TaskStatus.CREATED,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        status: TaskStatus.OPEN,
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        status: TaskStatus.IN_PROGRESS,
      },
      {
        id: 4,
        title: "Task 4",
        description: "Description 4",
        status: TaskStatus.DONE,
      },
    ];

    const result = generateColumns(tasks);

    expect(result).toEqual([
      {
        id: 1,
        title: TaskStatus.CREATED,
        tasks: [
          {
            id: 1,
            title: "Task 1",
            description: "Description 1",
            status: TaskStatus.CREATED,
          },
        ],
      },
      {
        id: 2,
        title: TaskStatus.OPEN,
        tasks: [
          {
            id: 2,
            title: "Task 2",
            description: "Description 2",
            status: TaskStatus.OPEN,
          },
        ],
      },
      {
        id: 3,
        title: TaskStatus.IN_PROGRESS,
        tasks: [
          {
            id: 3,
            title: "Task 3",
            description: "Description 3",
            status: TaskStatus.IN_PROGRESS,
          },
        ],
      },
      {
        id: 4,
        title: TaskStatus.DONE,
        tasks: [
          {
            id: 4,
            title: "Task 4",
            description: "Description 4",
            status: TaskStatus.DONE,
          },
        ],
      },
    ]);
  });
});
