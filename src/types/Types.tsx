export type Stat = {
  label: string;
  value: number;
  sub: string;
};

export type Log = {
  app: string;
  to: string;
  status: 'sent' | 'failed';
  time: string;
};
