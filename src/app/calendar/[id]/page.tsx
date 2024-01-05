"use client";

import { Container } from "@mui/material";
import Calendar from "../../../_components/Calendar";
import useDate, { DateInfo } from "../../../_hooks/useDate";
import { useRef } from "react";
import CalendarHeader from "@/_components/CalendarHeader";

const CalendarPage = () => {
  const date: DateInfo = useDate();
  const canScrollMonthRef = useRef(true);
  const handleWheelScroll = (event: any) => {
    if (!canScrollMonthRef.current) return;
    canScrollMonthRef.current = false;

    if (event.deltaY > 0) {
      date.getNextMonth();
    } else {
      date.getPreviousMonth();
    }
    setTimeout(() => {
      canScrollMonthRef.current = true;
    }, 200);
  };
  return (
    <main onWheel={handleWheelScroll}>
      <CalendarHeader date={date} />
      <Container
        sx={{
          minWidth: "100%",
          paddingLeft: "10px",
          borderRadius: "0px",
        }}
      >
        <Calendar date={date} />
      </Container>
    </main>
  );
};

export default CalendarPage;
