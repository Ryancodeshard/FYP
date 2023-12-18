'use client'

import LoginBox from "@/_components/Login";
import { useState } from "react";

export default function Home() {
  async function FetchInfo() {
    try {
      const response = await fetch('/api/db_info');
      const data = await response.json();
      console.log('GET request response:', data);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  }
  const [ event, setEvent] = useState([])

  async function FetchAllEvents() {
    try {
      const response = await fetch('/api/event');
      const data = await response.json();
      console.log('All events:', data);
      setEvent(data[0].name)
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  }
  return (
    <>
      {/* Home
      <button onClick={()=>FetchInfo()}>Click me</button>
      <div>
      <button onClick={()=>FetchAllEvents()}>Get all events</button>
      {event}
      </div> */}
      <LoginBox/>
    </>
  )
}
