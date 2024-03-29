import React, { useState, useEffect } from "react";
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
import {
  eventSetActive,
  clearActiveEvent,
  eventStartLoading,
} from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

// !component
const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

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
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
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
