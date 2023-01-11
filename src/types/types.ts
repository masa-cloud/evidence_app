export type User = {
  email: string;
  uid: string;
};

export type Notes = {
  id: number;
  title: string;
  children?: Notes[];
  description: string;
  emoji?: string;
  expanded: boolean;
  level: number;
  parentId?: number;
};
