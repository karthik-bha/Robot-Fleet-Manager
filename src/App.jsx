import React, { useState, useEffect } from "react";
import RobotTable from "./Components/RobotTable";
import MapView from "./Components/MapView";
import { connectWebSocket, closeWebSocket } from "./Services/websocket";
import Filter from "./Components/Filter";

const App = () => {
  const [robots, setRobots] = useState([]);
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const handleWebSocketMessage = (data) => {
      setRobots(data); // Update the robots state with real-time data
    };

    connectWebSocket("ws://127.0.0.1:8000/ws", handleWebSocketMessage);

    return () => {
      closeWebSocket(); // Clean up WebSocket connection on unmount
    };
  }, []);

  // Filter robots based on selected filterValue
  const filteredRobots = robots.filter((robot) => {
    if (filterValue === "all") return true;
    if (filterValue === "online" && robot.status) return true;
    if (filterValue === "offline" && !robot.status) return true;
    if (filterValue === "low_battery" && robot.battery < 20) return true;
    return false;
  });

  return (
    <div className="text-center">
      <div className="w-full bg-black text-white text-center">
        <h1 className="text-2xl p-6">Robot Fleet Dashboard</h1>
      </div>
    
     <h1 className="font-bold text-2xl"> List of Robots below</h1>
     <div className=" p-4 flex justify-center ">
        <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      </div>
      <div className=" p-4 flex justify-center ">
      <RobotTable robots={filteredRobots} />
      </div>
      <div className=" px-40">
        <MapView robots={filteredRobots} />
      </div>
    </div>
  );
};

export default App;
