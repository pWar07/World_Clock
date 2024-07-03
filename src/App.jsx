import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import "./App.css";

const timeZones = [
  { name: "India", zone: "Asia/Kolkata" }, // Default selected
  { name: "USA", zone: "America/New_York" },
  { name: "UK", zone: "Europe/London" },
  { name: "Japan", zone: "Asia/Tokyo" },
  { name: "Australia", zone: "Australia/Sydney" },
];

const WorldClock = () => {
  const [currentTimes, setCurrentTimes] = useState({});
  const [selectedZone, setSelectedZone] = useState("Asia/Kolkata");
  const [selectedName, setSelectedName] = useState("India");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const times = {};

      timeZones.forEach(({ name, zone }) => {
        times[name] = moment(now).tz(zone).format("HH:mm:ss");
      });

      setCurrentTimes(times);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleZoneChange = (zone, name) => {
    setSelectedZone(zone);
    setSelectedName(name);
  };

  return (
    <div className="main">
      <h1>World Clock</h1>
      <div className="container">
        <div className="selectedTz">
          <p>{currentTimes[selectedName]}</p>
          <h3>{selectedName}</h3>
        </div>
        <ul>
          {timeZones.map(({ name, zone }) => (
            <li
              key={name}
              onClick={() => handleZoneChange(zone, name)}
              className={selectedZone === zone ? "selected" : ""}
            >
              <h4>{name}</h4>
              {/* {currentTimes[name]} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorldClock;
