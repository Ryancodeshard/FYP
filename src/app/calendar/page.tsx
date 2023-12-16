'use client'

import { Container, Paper } from "@mui/material";
import Calendar from "../../_components/Calendar";
import useDate, { DateInfo } from "../../_hooks/useDate";

const CalendarPage = () => {
    const date: DateInfo   = useDate();

    return (
        <Container>
            <Paper>
                <Calendar date={date} />
            </Paper>
        </Container>
    )
}

export default CalendarPage;