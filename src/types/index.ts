export type status = 'active' | 'done';

export type Listitem = {
  id: number;
  title: string;
  status: status;
};
