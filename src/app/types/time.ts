export type CustomRange = {
  name: string;
  color: string;
  start: Date;
  end: Date;
}

export type CustomEvent = {
  name: string;
  remarks: string | null;
  moment: Date;
}

export type TimeLine = {
  name: string;
  start: Date;
  end: Date;
  events?: Array<CustomEvent>;
  ranges?: Array<CustomRange>;
}

