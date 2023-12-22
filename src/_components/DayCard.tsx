"use client";

import { isSameDay, compareAsc } from "date-fns";
import startOfDay from "date-fns/startOfDay";
import { Card, CardContent, Box, Typography } from "@mui/material";

interface DayCardProps {
  date: Date;
  height: number;
}
const DayCard = (props: DayCardProps) => {
  const { date, height } = props;
  //Extracts day from date object
  const day = date.getDate();

  //Checks if current day matches date
  const sameDayCheck = isSameDay(startOfDay(date), new Date());

  // Compare if the date is greater than or equal to today
  const isFutureOrToday =
    compareAsc(startOfDay(date), startOfDay(new Date())) >= 0;

  return (
    <Card
      sx={{
        borderTop: 1,
        borderColor: "grey.500",
        display: "flex",
        flexDirection: "column",
        height: `${height}px`,
        boxShadow: 0,
        borderRadius: 0,
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography
          sx={{
            backgroundColor: sameDayCheck ? "grey.300" : "white",
            paddingTop: "5px",
          }}
          fontWeight={sameDayCheck ? "bold" : "light"}
        >
          {day}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DayCard;
