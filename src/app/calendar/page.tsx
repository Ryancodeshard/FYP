'use client'

import { Container, Paper } from "@mui/material";
import Calendar from "../../_components/Calendar";
import useDate, { DateInfo } from "../../_hooks/useDate";

const CalendarPage = () => {
    const date: DateInfo   = useDate();

    return (
        <Container sx={{ minWidth: '100%', padding: '0px', borderRadius: '0px', minHeight: '100%' }}>
            <Calendar date={date} />
        </Container>
    )
}

export default CalendarPage;