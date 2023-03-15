interface UserData {
  displayName: string;
  city: string | null;
  country: string | null;
  email: string;
  photoUrl: string | null;
  uid: string;
  id: string;
  about: string | null;
}

interface KanbanBoards {
  title: string;
  description: string;
  id: string;
}

interface ChatData {
  id: string;
  members: Array<string>;
}

interface NotificationData {
  message: string;
  displayName: string;
  email: string;
  uid: string;
  id: string;
  receiver: string;
}

interface UserProps {
  user: UserData;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  startTransition: (callback: () => void) => void;
}

interface ContextOpenType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NotificationsContextType {
  notifications: Array<{}>;
  addNotification: (notification: NotificationData) => void;
  removeNotification: (notification: NotificationData) => void;
}

interface Session {
  date: string;
  title: string;
  description: string;
  time: string;
  id: string;
}

interface SettingsFormInputType {
  displayName: string;
  email: string;
  city: string;
  country: string;
  about: string;
  photoUrl: string;
}

interface PomodoroType {
  pomo: number;
  date: string;
  time: number;
  id: string;
}

interface PomodoroPreferencesType {
  pomo: number;
  untilLong: number;
  short: number;
  long: number;
  sound: boolean;
}

interface EventsType {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  date: string;
  uid: string;
  id: string;
}

interface KanbanColumnsType {
  column: string;
  id: string;
}

interface KanbanTaskType {
  boardId: string;
  uid: string;
  status: string;
  title: string;
  description: string;
  progress: number;
  id: string;
}

interface SubtasksType {
  title: string;
  done: boolean;
  id: string | null;
}

interface EditSubtasksProps {
  subtask: SubtasksType;
  uid: string | undefined;
  boardId: string | undefined;
  taskId: string | undefined;
  setSubtasks: (subtasks: SubtasksType[]) => void;
  subtasks: SubtasksType[];
  setNewSubtasks: (newSubtasks: { title: string; done: boolean }[]) => void;
  newSubtasks: { title: string; done: boolean }[];
}
export type {
  UserData,
  ChatData,
  UserProps,
  KanbanBoards,
  NotificationData,
  ContextOpenType,
  NotificationsContextType,
  Session,
  SettingsFormInputType,
  PomodoroType,
  PomodoroPreferencesType,
  EventsType,
  KanbanColumnsType,
  KanbanTaskType,
  SubtasksType,
  EditSubtasksProps,
};
