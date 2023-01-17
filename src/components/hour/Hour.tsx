import React, { FC } from 'react';

import Event from '../event/Event';
import CurrentTimeLine from './CurrentTimeLine';

import { formatMins } from '../../utils/dateUtils';
import { IEvent } from '../../types';

type Props = {
  dataHour: number;
  dataDay: number;
  currentMonth: number;
  hourEvents: IEvent[];
  deleteEvent: (id: string) => void;
};

const Hour: FC<Props> = ({
  dataHour,
  dataDay,
  currentMonth,
  hourEvents,
  deleteEvent,
}) => {
  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      data-day={dataDay}
      data-month={currentMonth}
    >
      {dataHour === new Date().getHours() &&
        dataDay === new Date().getDate() &&
        currentMonth === new Date().getMonth() && <CurrentTimeLine />}

      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            height={
              (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
              (1000 * 60)
            }
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            id={id}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Hour;
