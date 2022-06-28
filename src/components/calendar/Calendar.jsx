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
  closeModalHandler,
  setIsModalVisible,
  formData,
  setFormData,
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
    setFormData({
      title: '',
      date: moment(new Date(new Date().getFullYear(), month, day)).format(
        'YYYY-MM-DD'
      ),
      startTime: moment(
        new Date(new Date().getFullYear(), month, day, time - 1)
      ).format('HH:mm'),
      endTime: moment(
        new Date(new Date().getFullYear(), month, day, time)
      ).format('HH:mm'),
      description: '',
    });
  };

  return (
    <section className="calendar">
      {isModalVisible && (
        <Modal
          closeModalHandler={closeModalHandler}
          createNewEvent={createNewEvent}
          formData={formData}
          setFormData={setFormData}
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
  closeModalHandler: propTypes.func.isRequired,
  setIsModalVisible: propTypes.func.isRequired,
  formData: propTypes.object.isRequired,
  setFormData: propTypes.func.isRequired,
};
