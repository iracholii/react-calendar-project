import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';

import { getEvents, addNewEvent, deleteEvent } from '../../gateway/gateway';

import './calendar.scss';

const Calendar = ({
  weekDates,
  isModalVisible,
  setIsModalVisible,
  initialFormData,
  setInitialFormData,
}) => {
  const [events, setEvents] = useState([]);

  const createNewEvent = (eventData) => {
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

  const deleteEventHandler = (id) => {
    deleteEvent(id).then(() => {
      getEvents().then((data) => setEvents(data));
    });
  };

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const onCalendarClickHandler = (event) => {
    if (event.target.className !== 'calendar__time-slot') {
      return null;
    }

    const { time, day, month } = event.target.dataset;

    setIsModalVisible(true);
    setInitialFormData({
      date: moment(new Date(new Date().getFullYear(), month, day)).format(
        'YYYY-MM-DD'
      ),
      startTime: moment(
        new Date(new Date().getFullYear(), month, day, time - 1)
      ).format('HH:mm'),
      endTime: moment(
        new Date(new Date().getFullYear(), month, day, time)
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

Calendar.propTypes = {
  weekDates: propTypes.array.isRequired,
  isModalVisible: propTypes.bool.isRequired,
  setIsModalVisible: propTypes.func.isRequired,
  initialFormData: propTypes.object.isRequired,
  setInitialFormData: propTypes.func.isRequired,
};
