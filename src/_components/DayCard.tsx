'use client'

import { isSameDay, compareAsc } from "date-fns";
import startOfDay from "date-fns/startOfDay";
import { Card, CardContent, Box, Typography } from "@mui/material";

interface DayCardProps {
    date: Date;
}
const DayCard = (props: DayCardProps) => {
    const { date } = props;

    //Extracts day from date object
    const day = date.getDate();

    //Checks if current day matches date
    const sameDayCheck = isSameDay(startOfDay(date), new Date());

    // Compare if the date is greater than or equal to today
    const isFutureOrToday = compareAsc(startOfDay(date), startOfDay(new Date())) >= 0;

    return (
        <Card
            sx={{
                backgroundColor: sameDayCheck ? "teal.light" : "white",
                border: sameDayCheck ? `3px solid teal.light` : "none",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardContent sx={{ padding: "16px 12px" }}>
                `<Box
                    sx={{
                        backgroundColor: sameDayCheck ? "teal.light" : "inherit",
                        padding: "4px 8px",
                        borderRadius: 4,
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                >
                    <Typography display="inline">
                        {day}
                    </Typography>
                </Box>`
            </CardContent>
        </Card>
    )
}

export default DayCard;