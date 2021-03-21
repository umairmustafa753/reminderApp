export type RootStackParamList = {
  Root: undefined;
};

export type StackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Event: undefined;
  Reminder: undefined;
};

export interface remindersProps {
  date?: string;
  time?: string;
  message?: string;
  users?: users[];
}

export interface users {
  name?: string;
  avatar?: string;
}
