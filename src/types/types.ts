export type User = {
  email: string;
  uid: string;
};

export type Notes = {
  id: string;
  title: string;
  children?: Notes[];
  description: string;
  emoji?: string;
  expanded: boolean;
  level: number;
  orderNumber: number;
  parentId?: number;
};
