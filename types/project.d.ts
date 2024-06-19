interface Links {
  live?: string;
  code?: string;
}

interface Project {
  title: string;
  image?: string;
  description: string;
  url: Links;
}

interface Content {
  body: Project[] | Null;
}

interface Longest {
  title: number;
  description: number;
  live: number;
  code: number;
}

interface Divider {
  letter: string;
  divider: true;
}

export type { Project, Links, Content, Longest, Divider };
