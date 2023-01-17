import React, { FC, Dispatch, SetStateAction } from 'react';

import { getMonthsToDisplay } from '../../utils/dateUtils';

import './header.scss';

type Props = {
  onCreateClickHandler: () => void;
  weekDates: Date[];
  weekStartDate: Date;
  setWeekStartDate: Dispatch<SetStateAction<Date>>;
};

const Header: FC<Props> = ({
  onCreateClickHandler,
  weekDates,
  weekStartDate,
  setWeekStartDate,
}) => {
  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={onCreateClickHandler}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>
        Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => setWeekStartDate(new Date())}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() =>
            setWeekStartDate(
              new Date(weekStartDate.setDate(weekStartDate.getDate() - 7))
            )
          }
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() =>
            setWeekStartDate(
              new Date(weekStartDate.setDate(weekStartDate.getDate() + 7))
            )
          }
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getMonthsToDisplay(weekDates)}
        </span>
      </div>
    </header>
  );
};

export default Header;
