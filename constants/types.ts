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
