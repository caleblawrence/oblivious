export interface Tweet {
  created_at: string;
  id: number;
  text: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  screen_name: string;
}
