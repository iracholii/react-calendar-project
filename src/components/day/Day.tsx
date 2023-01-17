import React, { FC } from 'react';

import Hour from '../hour/Hour';

import { hours } from '../../utils/dateUtils';
import { IEvent } from '../../types';

import './day.scss';

type Props = {
  dataDay: number;
  currentMonth: number;
  dayEvents: IEvent[];
  deleteEvent: (id: string) => void;
};

const Day: FC<Props> = ({ dataDay, currentMonth, dayEvents, deleteEvent }) => {
  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            dataDay={dataDay}
            currentMonth={currentMonth}
            hourEvents={hourEvents}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Day;
