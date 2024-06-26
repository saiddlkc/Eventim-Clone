import React, { useEffect, useState } from "react";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [ticketTypeFilter, setTicketTypeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Zustand für das Anzeigen/Verstecken der Filter

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      formattedDate: date
        .toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        .toUpperCase(),
      weekday: date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase(),
      month: date.toLocaleDateString("en-US", { month: "long" }).toUpperCase(),
      day: date.toLocaleDateString("en-US", { day: "numeric" }).toUpperCase(),
      year: date.toLocaleDateString("en-US", { year: "numeric" }).toUpperCase(),
    };
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/dashboard/tickets/`);
        console.log(res);
        setTickets(res.data);
        setFilteredTickets(res.data); // Initialize filteredTickets with all tickets
      } catch (error) {
        console.error("Fehler beim Abrufen der Tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Filter function
  const applyFilters = () => {
    let filtered = tickets.filter((ticket) => {
      // Filter by city
      if (cityFilter && ticket.city !== cityFilter) {
        return false;
      }
      // Filter by ticket type
      if (ticketTypeFilter && ticket.ticketType !== ticketTypeFilter) {
        return false;
      }
      return true;
    });

    setFilteredTickets(filtered);
  };

  // Handle city filter change
  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };

  // Handle ticket type filter change
  const handleTicketTypeChange = (e) => {
    setTicketTypeFilter(e.target.value);
  };

  // Toggle function for showing/hiding filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [cityFilter, ticketTypeFilter]); // Reapply filters when cityFilter or ticketTypeFilter changes

  return (
    <div className="">
      {/* Filter toggle button */}
      <button
        onClick={toggleFilters}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg  mb-2 my-5"
      >
        {showFilters ? (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <p>Filter</p>
          </div>
        ) : (
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            <p>Filter anzeigen</p>
          </div>
        )}
      </button>

      {/* Filter section */}
      {showFilters && (
        <div className="filter-container flex flex-wrap gap-4 items-center my-5 bg-white rounded-md justify-between p-2 ">
          <label htmlFor="city-filter" className="mr-2">
            Stadt: {cityFilter}
          </label>
          <select
            id="city-filter"
            onChange={handleCityChange}
            value={cityFilter}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          >
            <option value="">Alle</option>
            <option value="Berlin">Berlin</option>
            <option value="Hamburg">Hamburg</option>
            <option value="München">München</option>
            <option value="Köln">Köln</option>
            <option value="Frankfurt">Frankfurt</option>
            <option value="LEIPZIG">Leipzig</option>
            <option value="Bremen">Bremen</option>
            <option value="Hannover">Hannover</option>
            <option value="Stuttgart">Stuttgart</option>
            <option value="Koblenz">Koblenz</option>
            <option value="Mainz">Mainz</option>
            <option value="Wiesbaden">Wiesbaden</option>
            <option value="Mannheim">Mannheim</option>
            {/* Add more cities as needed */}
          </select>

          <label htmlFor="ticket-type-filter" className="mr-2">
            Ticketart:
          </label>
          <select
            id="ticket-type-filter"
            onChange={handleTicketTypeChange}
            value={ticketTypeFilter}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          >
            <option value="">Alle</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            {/* Add more ticket types as needed */}
          </select>
        </div>
      )}

      {/* Ticket list */}
      <div className="">
        {filteredTickets.map((ticket) => {
          const { formattedDate, weekday, month, day, year } = formatDate(
            ticket.date
          );

          return (
            <div
              key={ticket.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-1xl overflow-hidden md:max-w-4xl mb-4 "
            >
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    src={ticket.image || ticketImage}
                    alt="Event image"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <p className="text-black text-3xl">{ticket.city}</p>

                  <p className="mt-2 text-slate-500">
                    <span className="">{weekday}</span>,
                    <span className="text-blue-500 px-4 text-3xl">{day}</span>
                    <span className="text-black"> {month} </span>.
                    <span className=" px-2 text-black">{year}</span>
                  </p>
                  <p className="mt-2 text-slate-500">{ticket.title}</p>
                  <p>{ticket.eventLocation}</p>
                </div>
                <div className="flex  items-center justify-center p-4  ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 flex items-center justify-center  hover:bg-gray-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 flex items-center justify-center  hover:bg-gray-200 mx-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                    />
                  </svg>
                  <div>
                    <div className="flex justify-center">
                      <p className="">ab {ticket.currency}</p>
                      <p className="mx-2"> {ticket.price}</p>
                    </div>
                    <button className="bg-blue-500 text-white px-10 py-1 rounded-xl hover:bg-blue-900">
                      Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketList;
