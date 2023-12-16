'use client'

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import DayCard from "./DayCard";
import { useEffect, useState } from "react";

interface CalendarProps {
    calendarGridDayObjects: { date: Date; }[];
}
const DayList = (props: CalendarProps) => {
    const { calendarGridDayObjects } = props;
    const isNarrow = useMediaQuery("(max-width: 799px");
    const numberOfRows = calendarGridDayObjects.length/7;
    const [dayHeight,setDayHeight] = useState(0);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        const height = window.innerHeight;
        setDayHeight((height-123.2)/numberOfRows);
    },[numberOfRows]);
    useEffect(() => {
        setChecked(isNarrow);
    }, [isNarrow]);

    const daysOfWeek = checked ? [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ] : ["Sunday",
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
            <Grid container columnSpacing={2} sx={{ width: '100%' }}>
                {daysOfWeek.map((day, index) => (
                    <Grid key={day} item xs={1.7}>
                        <Typography
                            sx={{
                                color: [6, 0].includes(index) ? "error.main" : "black",
                                backgroundColor: "white",
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
                                backgroundColor: "white",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <DayCard date={day.date} height={dayHeight} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            
        </Box>
    );
};
    


export default DayList;