'use client'

import { Box, Grid, Typography } from "@mui/material";
import DayCard from "./DayCard";

interface CalendarProps {
    calendarGridDayObjects: { date: Date; }[];
}
const TestDayList = (props: CalendarProps) => {
    const { calendarGridDayObjects } = props;
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
            }}
        >
            {/* Days of the week */}
            <Grid container spacing={2}>
                {daysOfWeek.map((day, index) => (
                    <Grid key={day} item xs={1.7}>
                        <Typography
                            sx={{
                                color: [6, 0].includes(index) ? "error.main" : "text.primary",
                                backgroundColor: "background.paper",
                                padding: "8px 0",
                                textAlign: "left",
                                fontWeight: "bold",
                            }}
                        >
                            {day}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid container>
                {calendarGridDayObjects.map((day: {date: Date}) => (
                    <Grid key={day.date.toUTCString()} item xs={1.7}>
                        <Box
                            sx={{
                                backgroundColor: "background.paper",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <DayCard date={day.date} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            
        </Box>
    );
};
    


export default TestDayList;