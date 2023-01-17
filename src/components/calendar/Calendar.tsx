import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import moment from 'moment';

import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import { getEvents, addNewEvent, deleteEvent } from '../../gateway/gateway';
import { IInitialFormData, INewEventData } from '../../types';

import './calendar.scss';

type Props = {
  weekDates: Date[];
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  initialFormData: IInitialFormData;
  setInitialFormData: Dispatch<SetStateAction<IInitialFormData>>;
};

const Calendar: FC<Props> = ({
  weekDates,
  isModalVisible,
  setIsModalVisible,
  initialFormData,
  setInitialFormData,
}) => {
  const [events, setEvents] = useState([]);

  const createNewEvent = (eventData: INewEventData) => {
    const { title, date, startTime, endTime, description } = eventData;
    const newEvent = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`),
    };

    addNewEvent(newEvent).then(() => {
      getEvents().then((data) => setEvents(data));
    });
  };

  const deleteEventHandler = (id: string) => {
    deleteEvent(id).then(() => {
      getEvents().then((data) => setEvents(data));
    });
  };

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const onCalendarClickHandler = (event: React.MouseEvent): null | void => {
    const target = event.target as HTMLElement;

    if (target.className !== 'calendar__time-slot') {
      return null;
    }

    const { time, day, month } = target.dataset;

    setIsModalVisible(true);
    setInitialFormData({
      date: moment(new Date(new Date().getFullYear(), +month, +day)).format(
        'YYYY-MM-DD'
      ),
      startTime: moment(
        new Date(new Date().getFullYear(), +month, +day, +time - 1)
      ).format('HH:mm'),
      endTime: moment(
        new Date(new Date().getFullYear(), +month, +day, +time)
      ).format('HH:mm'),
    });
  };

  return (
    <section className="calendar">
      {isModalVisible && (
        <Modal
          setIsModalVisible={setIsModalVisible}
          createNewEvent={createNewEvent}
          initialFormData={initialFormData}
          setInitialFormData={setInitialFormData}
        />
      )}
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div
          className="calendar__week-container"
          onClick={onCalendarClickHandler}
        >
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            deleteEvent={deleteEventHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
