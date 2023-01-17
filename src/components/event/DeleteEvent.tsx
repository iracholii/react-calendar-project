import React, { FC, Dispatch, SetStateAction } from 'react';

type Props = {
  id: string;
  deleteEvent: Dispatch<SetStateAction<string>>;
  showDeleteEventButton: boolean;
};

const DeleteEvent: FC<Props> = ({ id, deleteEvent, showDeleteEventButton }) => {
  return (
    <>
      {showDeleteEventButton && (
        <button
          className="button delete-event-btn"
          onClick={() => deleteEvent(id)}
        >
          <i className="fas fa-trash delete-event-btn__icon" />
        </button>
      )}
    </>
  );
};

export default DeleteEvent;
