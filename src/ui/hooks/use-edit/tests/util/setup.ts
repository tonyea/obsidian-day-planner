import { Moment } from "moment/moment";

import { ObsidianFacade } from "../../../../../service/obsidian-facade";
import { defaultSettingsForTests } from "../../../../../settings";
import { toMinutes } from "../../../../../util/moment";
import { useEditContext } from "../../use-edit-context";

import { baseTasks, day, nextDay } from "./fixtures";

export function createProps({ tasks } = { tasks: baseTasks }) {
  const onUpdate = jest.fn();
  const obsidianFacade = jest.fn() as unknown as ObsidianFacade;

  return {
    settings: defaultSettingsForTests,
    onUpdate,
    obsidianFacade,
    visibleTasks: tasks,
  };
}

export function setUp({ tasks } = { tasks: baseTasks }) {
  const props = createProps({ tasks });
  const { getEditHandlers, displayedTasks, confirmEdit } =
    useEditContext(props);

  const todayControls = getEditHandlers(day);
  const { pointerOffsetY } = todayControls;
  const nextDayControls = getEditHandlers(nextDay);

  function moveCursorTo(time: string, day?: Moment) {
    pointerOffsetY.set(toMinutes(time));
  }

  return {
    todayControls,
    nextDayControls,
    moveCursorTo,
    displayedTasks,
    confirmEdit,
    props,
  };
}
