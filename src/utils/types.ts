export type TodoData = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type TodoInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type TodoDTO = {
  data: TodoData[];
  info: TodoInfo;
  meta: {
    totalAmount: number;
  };
};
