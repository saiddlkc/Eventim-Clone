import React, { useState, useEffect } from "react";
import "./Styles.css"; // Stile für die Komponente

const SeatPicker = ({ eventId }) => {
  const [seatMap, setSeatMap] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Beim Laden der Komponente Sitzplatzdaten vom Backend abrufen
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/dashboard/tickets/${eventId}/seats`
      );
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Sitzplätze");
      }
      const data = await response.json();
      setSeatMap(data.seatMap);
    } catch (error) {
      console.error("Fehler beim Abrufen der Sitzplätze:", error.message);
    }
  };

  const reserveSeat = async (rowIdx, seatIdx) => {
    try {
      const response = await fetch(
        `http://localhost:4000/dashboard/tickets/${eventId}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ row: rowIdx + 1, seat: seatIdx + 1 }),
        }
      );
      if (!response.ok) {
        throw new Error("Fehler beim Reservieren des Sitzplatzes");
      }
      const data = await response.json();
      setSeatMap(data.updatedSeatMap);
      updateSelectedSeats(rowIdx, seatIdx, true);
    } catch (error) {
      console.error("Fehler beim Reservieren des Sitzplatzes:", error.message);
    }
  };

  const updateSelectedSeats = (rowIdx, seatIdx, reserve) => {
    const seat = `${rowIdx + 1}-${seatIdx + 1}`;
    setSelectedSeats((prevSelected) => {
      if (reserve) {
        return [...prevSelected, seat];
      } else {
        return prevSelected.filter((s) => s !== seat);
      }
    });
  };

  const isSeatSelected = (rowIdx, seatIdx) => {
    return (
      seatMap[rowIdx][seatIdx].reserved ||
      selectedSeats.includes(`${rowIdx + 1}-${seatIdx + 1}`)
    );
  };

  return (
    <div className="seat-picker">
      <h2>Sitzplatz-Auswahl für Event {eventId}</h2>
      <div className="seat-map">
        {seatMap.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((seat, seatIdx) => (
              <div
                key={seatIdx}
                className={`seat ${
                  seat.reserved
                    ? "reserved"
                    : isSeatSelected(rowIdx, seatIdx)
                    ? "selected"
                    : "available"
                }`}
                onClick={() => !seat.reserved && reserveSeat(rowIdx, seatIdx)}
              >
                {seat.reserved ? "X" : `${rowIdx + 1}-${seatIdx + 1}`}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <strong>Ausgewählte Sitze:</strong> {selectedSeats.join(", ")}
      </div>
    </div>
  );
};

export default SeatPicker;
