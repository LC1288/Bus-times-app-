// App.jsx
import React, { useState, useEffect } from "react";

const MOCK_BUS_DATA = {
  "1001": [
    { line: "25", minutes: 3 },
    { line: "38", minutes: 7 },
    { line: "15", minutes: 12 },
  ],
  "1002": [
    { line: "10", minutes: 2 },
    { line: "12", minutes: 8 },
  ],
};

function App() {
  const [busStop, setBusStop] = useState("");
  const [busTimes, setBusTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBusTimes = async (stopId) => {
    setLoading(true);
    setError("");
    try {
      // Replace this with real API fetch later
      // const response = await fetch(`https://api.example.com/bus-times?stop=${stopId}`);
      // const data = await response.json();

      // Mock API
      const data = MOCK_BUS_DATA[stopId] || [];

      setBusTimes(data);
    } catch (err) {
      setError("Failed to fetch bus times.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!busStop) return;

    const interval = setInterval(() => {
      fetchBusTimes(busStop);
    }, 30000);

    return () => clearInterval(interval);
  }, [busStop]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBusTimes(busStop);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Live Bus Times</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter bus stop ID"
          value={busStop}
          onChange={(e) => setBusStop(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>Get Times</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {busTimes.length === 0 && !loading && <li>No upcoming buses</li>}
        {busTimes.map((bus, index) => (
          <li
            key={index}
            style={{
              margin: "5px 0",
              padding: "10px",
              background: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
            Bus {bus.line} - arriving in {bus.minutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
