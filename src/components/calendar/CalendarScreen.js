import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { messages } from "../../helpers/calendar-messages-es";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive, clearActiveEvent } from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);
//
// const events = [
//   {
//     title: "Cumpleaños de Aydin<3",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#fff",
//     notes: "Comprar el pastel",
//     user: {
//       id: "123",
//       name: "Ivan",
//     },
//   },
// ];

// !component
const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  // Event functions
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundcolor: "#367CF7",
      bordarRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
      wordWrap: "break-word",
    };
    return {
      style,
    };
  };

  const onSelectSlot = (e) => {
    console.log(e);
    dispatch(clearActiveEvent());
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />
      {activeEvent ? <DeleteEventFab /> : null}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
