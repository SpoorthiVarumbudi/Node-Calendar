const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let events = [
  { id: 1, title: "Meeting with Alex", date: "2025-09-16", startTime: "10:00", endTime: "11:30", description: "Discuss project status" },
  { id: 2, title: "Doctor", date: "2025-09-17", startTime: "15:00", endTime: "16:00", description: "Checkup" },
];

app.get("/", (req, res) => {
  res.send("Calendar backend is running!");
});

// Get events (optional date range)
app.get("/events", (req, res) => {
  const { start, end } = req.query;
  console.log("GET /events called with query:", req.query);

  let filteredEvents = events;

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    filteredEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  console.log("Returning events:", filteredEvents);
  res.json(filteredEvents);
});

// Add event
app.post("/events", (req, res) => {
  console.log("POST /events body:", req.body);

  const { title, date, startTime, endTime, description } = req.body;
  if (!title || !date || !startTime || !endTime) {
    console.warn("Invalid event data, missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newEvent = { id: events.length + 1, title, date, startTime, endTime, description };
  events.push(newEvent);
  console.log("Event created:", newEvent);

  res.status(201).json(newEvent);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
