export interface IEvent {
  title: string;
  dateFrom: string;
  dateTo: string;
  description: string;
  id: string;
}

export interface IEventData {
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
}

export interface IInitialFormData {
  date: string | Date;
  startTime: string;
  endTime: string;
}

export interface INewEventData {
  title: string;
  description: string;
  date: Date | string;
  startTime: string;
  endTime: string;
}
