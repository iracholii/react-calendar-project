import React, { useState, FC } from 'react';

import DeleteEvent from './DeleteEvent';

import './event.scss';

type Props = {
  height: number;
  marginTop: number;
  title: string;
  description: string;
  time: string;
  id: string;
  deleteEvent: (id: string) => void;
};

const Event: FC<Props> = ({
  height,
  marginTop,
  title,
  description,
  time,
  id,
  deleteEvent,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [showDeleteEventButton, setShowDeleteEventButton] = useState(false);

  const onEventClickHandler = () => {
    setShowDeleteEventButton(!showDeleteEventButton);
  };

  return (
    <div style={eventStyle} className="event" onClick={onEventClickHandler}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>

      <DeleteEvent
        id={id}
        deleteEvent={deleteEvent}
        showDeleteEventButton={showDeleteEventButton}
      />
    </div>
  );
};

export default Event;
