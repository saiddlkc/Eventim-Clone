import React, { useState } from "react";
import Seat from "./Seat"; // Assuming Seat component is defined separately
import "./Styles.css";
const StadiumSeatingChart = () => {
  // Example seating data (can be fetched from an API or defined statically)
  const rows = ["A", "B", "C", "D", "E"]; // Example rows
  const seatsPerRow = 10; // Example seats per row

  // State to manage selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to handle selecting a seat
  const toggleSeatSelection = (row, seatNumber) => {
    const seat = `${row}${seatNumber}`;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="stadium-seating-chart">
      {rows.map((row) => (
        <div key={row} className="row">
          {Array.from({ length: seatsPerRow }, (_, index) => (
            <Seat
              key={`${row}${index + 1}`}
              row={row}
              seatNumber={index + 1}
              selected={selectedSeats.includes(`${row}${index + 1}`)}
              onClick={toggleSeatSelection}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default StadiumSeatingChart;
