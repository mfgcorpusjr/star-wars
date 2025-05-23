export type Film = {
  title: string;
  episode_id: number;
  url: string;
  release_date: string;
  director: string;
  producer: string;
  opening_crawl: string;
};

export type People = {
  uid: string;
  name: string;
  url: string;
};

export type Character = {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
};
