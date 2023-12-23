"use client";

import LoginBox from "@/_components/Login";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

async function FetchAllEvents(setEvent: Dispatch<SetStateAction<any>>) {
  try {
    const response = await fetch("/api/event");
    const data = await response.json();
    console.log("All events:", data);
    setEvent(data[0].name);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

async function FetchInfo() {
  try {
    const response = await fetch("/api/db_info");
    const data = await response.json();
    console.log("GET request response:", data);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
}

export default function Home() {
  const [event, setEvent] = useState([]);

  return (
    <Box>
      <Typography>Home</Typography>
      <button onClick={() => FetchInfo()}>Click me</button>
      <Box>
        <button onClick={() => FetchAllEvents(setEvent)}>Get all events</button>
        {event}
      </Box>
      {/* <LoginBox/> */}
    </Box>
  );
}
