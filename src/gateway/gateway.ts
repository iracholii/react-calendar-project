const baseUrl = 'https://627b8319a01c46a8531fa362.mockapi.io/api/v1/events';

import { IEvent, IEventData } from '../types';

export const getEvents = () =>
  fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        alert("Internal Server Error. Can't display events");
      }
      return response.json();
    })
    .then((events: IEvent[]) =>
      events.map((event: IEvent) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }))
    );

export const addNewEvent = (eventData: IEventData) =>
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then((response) => {
    if (!response.ok) {
      alert("Internal Server Error. Can't create new event");
    }
  });

export const deleteEvent = (eventId: string) =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      alert("Internal Server Error. Can't delete event");
    }
  });
