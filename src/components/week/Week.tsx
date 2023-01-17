import React, { FC } from 'react';

import Day from '../day/Day';

import { IEvent } from '../../types';

import './week.scss';

type Props = {
  weekDates: Date[];
  events: IEvent[];
  deleteEvent: (id: string) => void;
};

const Week: FC<Props> = ({ weekDates, events, deleteEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = events.filter(
          (event) => +event.dateFrom >= +dayStart && +event.dateTo < +dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            currentMonth={dayStart.getMonth()}
            dayEvents={dayEvents}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Week;
