// import React, { useState } from "react";
// import "./Styles.css"; // Stile für die Komponente

// const Seat = ({ rows, seatsPerRow }) => {
//   const [seatMap, setSeatMap] = useState(
//     Array(rows)
//       .fill()
//       .map(() => Array(seatsPerRow).fill(false))
//   );
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const reserveSeat = (rowIdx, seatIdx) => {
//     const newSeatMap = [...seatMap];
//     newSeatMap[rowIdx][seatIdx] = !newSeatMap[rowIdx][seatIdx];
//     setSeatMap(newSeatMap);

//     const seat = `${rowIdx + 1}-${seatIdx + 1}`;
//     setSelectedSeats((prevSelected) => {
//       if (newSeatMap[rowIdx][seatIdx]) {
//         return [...prevSelected, seat];
//       } else {
//         return prevSelected.filter((s) => s !== seat);
//       }
//     });
//   };

//   const isSeatSelected = (rowIdx, seatIdx) => {
//     return seatMap[rowIdx][seatIdx];
//   };

//   return (
//     <div className="seat-picker">
//       <h2>Sitzplatz-Auswahl</h2>
//       <div className="seat-map">
//         {seatMap.map((row, rowIdx) => (
//           <div key={rowIdx} className="row">
//             {row.map((seat, seatIdx) => (
//               <div
//                 key={seatIdx}
//                 className={`seat ${
//                   seat
//                     ? "reserved"
//                     : isSeatSelected(rowIdx, seatIdx)
//                     ? "selected"
//                     : "available"
//                 }`}
//                 onClick={() => reserveSeat(rowIdx, seatIdx)}
//               >
//                 {seat ? "X" : `${rowIdx + 1}-${seatIdx + 1}`}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="selected-seats">
//         <strong>Ausgewählte Sitze:</strong> {selectedSeats.join(", ")}
//       </div>
//     </div>
//   );
// };

// export default Seat;
