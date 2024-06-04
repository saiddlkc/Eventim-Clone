import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

const StadiumSeating = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/dashboard/tickets/");
        setTickets(res.data);
        setSelectedSeats(
          res.data.map((ticket) => ticket.additional_info.seating.seat_number)
        );
        console.log(
          res.data.map((ticket) => ticket.additional_info.seating.seat_number)
        );
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const initialSeats = Array.from({ length: 1 }, (_, row) =>
    Array.from({ length: 1000 }, (_, col) => ({
      id: row * 25 + col + 1,
      row: row + 1,
      number: col + 1,
      // isReserved: Math.random() < 0.2,
      isSelected: false,
    }))
  );

  const [seats, setSeats] = useState(initialSeats);
  console.log(seats);
  const handleSeatClick = (rowIndex, seatIndex) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((seat, sIdx) =>
              sIdx === seatIndex
                ? { ...seat, isSelected: !seat.isSelected }
                : seat
            )
          : row
      )
    );
  };

  const handleBooking = () => {
    console.log(selectedSeats);
    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((seat) =>
          seat.isSelected
            ? { ...seat, isReserved: true, isSelected: false }
            : seat
        )
      )
    );
  };

  return (
    <div>
      <h1>Stadion Sitzplan</h1>
      <div className="stadium-seating">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, seatIndex) => (
              <div
                key={seat.id}
                className={`seat ${
                  selectedSeats.includes(seat.number)
                    ? "reserved"
                    : seat.isReserved
                    ? "reserved"
                    : seat.isSelected
                    ? "selected"
                    : "available"
                }`}
                onClick={() =>
                  !seat.isReserved && handleSeatClick(rowIndex, seatIndex)
                }
              >
                {seat.number}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleBooking}>Buchen</button>
    </div>
  );
};

export default StadiumSeating;
