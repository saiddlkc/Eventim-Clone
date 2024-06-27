import axios from "axios";

const createTicketsForCities = async (eventId, eventDetails) => {
  try {
    const cities = [
      "Berlin",
      "Hamburg",
      "München",
      "Köln",
      "Frankfurt",
      "Stuttgart",
      "Düsseldorf",
      "Bremen",
      "Leipzig",
    ];

    const ticketsToCreate = cities.map((city) => ({
      eventId: eventId,
      city: city,
      date: eventDetails.startDatum,
      title: `Ticket für ${eventDetails.titel} in ${city}`,
      eventLocation: eventDetails.location,
      currency: "EUR",
      price: 29.99,
      image: eventDetails.headerUrl,
    }));

    console.log("Tickets, die erstellt und gesendet werden:", ticketsToCreate);

    const response = await axios.post(
      "http://localhost:4000/dashboard/tickets/",
      {
        tickets: ticketsToCreate,
      }
    );

    console.log("Antwort von der API:", response.data);
  } catch (error) {
    console.error("Fehler beim Erstellen und Speichern der Tickets:", error);
  }
};

export default createTicketsForCities;
