import { differenceBy } from "lodash/fp";
import { Moment } from "moment";
import { derived, get, Readable } from "svelte/store";

import { DayPlannerSettings } from "../../settings";
import { PlacedTask, TasksForDay } from "../../types";
import { getEndTime, getNotificationKey } from "../../util/task-utils";

interface UseNewlyStartedTasksProps {
  settings: Readable<DayPlannerSettings>;
  currentTime: Readable<Moment>;
  tasksForToday: Readable<TasksForDay>;
}

// todo: move file
export function useNewlyStartedTasks(props: UseNewlyStartedTasksProps) {
  const { settings, currentTime, tasksForToday } = props;
  let previousTasksInProgress: PlacedTask[] = [];

  return derived([settings, currentTime], ([$settings, $currentTime]) => {
    if (!$settings.showTaskNotification) {
      return [];
    }

    const tasksInProgress = get(tasksForToday).withTime.filter(
      (task: PlacedTask) => {
        return (
          task.startTime.isBefore($currentTime) &&
          getEndTime(task).isAfter($currentTime)
        );
      },
    );

    const newlyStarted = differenceBy(
      getNotificationKey,
      tasksInProgress,
      previousTasksInProgress,
    );

    previousTasksInProgress = tasksInProgress;

    return newlyStarted;
  });
}
