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
                backgroundColor: sameDayCheck ? "grey.200" : "white",
                borderTop: 1,
                borderColor: "grey.500",
                display: "flex",
                flexDirection: "column",
                
            }}
        >
            <CardContent sx={{height: '15.5vh', padding: 0 }}>
                <Typography sx={{color: sameDayCheck ? "green": "black"}} fontWeight={sameDayCheck ? "bold" : "light"}>
                    {day}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DayCard;