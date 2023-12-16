'use client'

import { Container, styled, Paper } from "@mui/material";
import Calendar from "../../_components/Calendar";
import useDate, { DateInfo } from "../../_hooks/useDate";

const CalendarPage = () => {
    const date: DateInfo   = useDate();
    const StyledContainer = styled(Container)({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        minHeight: '100vh',
        minWidth: '100vw',
    });
    return (
        <StyledContainer>
            <Paper component="main" elevation={0}>
                <Calendar date={date} />
            </Paper>
        </StyledContainer>
    )
}

export default CalendarPage;