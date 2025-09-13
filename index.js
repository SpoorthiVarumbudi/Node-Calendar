const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory event storage
let events = [
  { id: 1, title: "Meeting with Alex", date: "2025-09-16", startTime: "10:00", endTime: "11:30", description: "Discuss project status" },
  { id: 2, title: "Doctor", date: "2025-09-17", startTime: "15:00", endTime: "16:00", description: "Checkup" },
];

// Health check
app.get("/", (req, res) => {
  res.send("Calendar backend is running!");
});

// Get events (optionally by date range)
app.get("/events", (req, res) => {
  const { start, end } = req.query;

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const filteredEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= startDate && eventDate <= endDate;
    });

    return res.json(filteredEvents);
  }

  res.json(events);
});

// Add new event
app.post("/events", (req, res) => {
  const newEvent = { id: events.length + 1, ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
