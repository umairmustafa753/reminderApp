export type RootStackParamList = {
  Root: undefined;
};

export type StackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Event: undefined;
  Reminder: undefined;
};

export interface usersProps {
  created_at?: string;
  email?: string;
  first_name?: string;
  last_logged_in?: number;
  last_name?: string;
  profile_picture?: string;
  push_token?: string;
}

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
