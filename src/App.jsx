import React, { useState } from 'react';
import moment from 'moment';

import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    startTime: moment(new Date(new Date().setMinutes('00'))).format('HH:mm'),
    endTime: moment(
      new Date(new Date().setHours(new Date().getHours() + 1, '00'))
    ).format('HH:mm'),
    description: '',
  });

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const onCreateClickHandler = () => {
    setIsModalVisible(true);

    setFormData({
      title: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      startTime: moment(new Date(new Date().setMinutes('00'))).format('HH:mm'),
      endTime: moment(
        new Date(new Date().setHours(new Date().getHours() + 1, '00'))
      ).format('HH:mm'),
      description: '',
    });
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header
        onCreateClickHandler={onCreateClickHandler}
        weekDates={weekDates}
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        weekDates={weekDates}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        closeModalHandler={closeModalHandler}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default App;
