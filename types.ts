import { NumberLiteralType } from "typescript";

interface UserType {
  uid: string;
  displayName: string | undefined;
  email: string | undefined;
  emailVerified: boolean;
  photoURL: string | undefined;
}

interface ProjectType {
  icon?: string;
  title: string;
  type: string;
  start: string;
  end?: string;
  status: string;
  description: string;
  completed_tasks: number;
  total_tasks: number;
}

interface EventType {
  date: string;
  start: {
    hh: string;
    mm: string;
  };

  end: {
    hh: string;
    mm: string;
  };
  title: string;
  type: string;
  location: string;
}

interface TaskType {
  title: string;
  status: string;
  labels: string[];
  description?: string;
  _createdAt: string;
  priority: string;
  _updatedAt?: string;
}

interface SubtaskType {
  title: string;
  done: boolean;
}

interface ContextDatePickType {
  date: Date[] | undefined;
  setDate: (prev: Date[] | undefined) => void;
}

interface PomoType {
  id: string;
  title: string;
  estPomo: number;
  focus: number;
  short: number;
  long: number;
  untilLong: number;
  done: number;
  _updatedAt: string;
}

export type {
  UserType,
  ProjectType,
  EventType,
  TaskType,
  SubtaskType,
  ContextDatePickType,
  PomoType,
};
