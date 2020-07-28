export interface Tweet {
  created_at: string;
  id: number;
  text: string;
  user: User;
  entities?: Entities;
}

interface Entities {
  media?: any;
  urls?: any;
}

interface User {
  id: number;
  name: string;
  screen_name: string;
  profile_image_url_https: string;
}
