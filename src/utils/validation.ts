const eventDurationInHours = (start: string, end: string) => {
  return +end.slice(0, 2) - +start.slice(0, 2);
};

const isTimeMultipleOf15 = (time: string) => {
  return +time.slice(3, 5) % 15 === 0;
};

const isEventInPast = (time: string, date: Date) => {
  const eventDate = new Date(
    new Date(new Date(date).setHours(+time.slice(0, 2))).setMinutes(
      +time.slice(3, 5)
    )
  );
  return eventDate < new Date();
};

const isTimingValid = (start: string, end: string) => {
  if (start.slice(0, 2) === end.slice(0, 2)) {
    return start.slice(3, 5) < end.slice(3, 5);
  }
  return start.slice(0, 2) <= end.slice(0, 2);
};

export const isFormDataValid = (
  startTime: string,
  endTime: string,
  date: Date
) => {
  if (eventDurationInHours(startTime, endTime) > 6) {
    alert('Event must be no longer than 6 hours');
    return false;
  }

  if (!isTimeMultipleOf15(startTime) || !isTimeMultipleOf15(endTime)) {
    alert('Event timing must be a multiple of 15');
    return false;
  }

  if (isEventInPast(startTime, date)) {
    alert('Event can not be created in the past');
    return false;
  }

  if (!isTimingValid(startTime, endTime)) {
    alert('Event timing is not valid');
    return false;
  }

  return true;
};
