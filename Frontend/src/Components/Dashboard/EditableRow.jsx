import axios from "axios";
import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  editTicketID,
}) => {
  const handleUpdateTicket = async () => {
    console.log(
      editFormData.artist,
      editFormData.date,
      editFormData,
      editTicketID
    );
    try {
      const res = await axios.put(
        `http://localhost:4000/dashboard/tickets/${editTicketID}`,
        editFormData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={editFormData.title}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="artist"
          placeholder="Enter artist"
          value={editFormData.artist}
          onChange={handleEditFormChange}
        />
      </td>
      {/* 
      <td>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        />
      </td>
      
      <td>
        <input
          type="text"
          name="location.state"
          placeholder=" Enter state"
          value={editFormData.location.state}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="location.postalCode"
          placeholder=" Enter postal code"
          value={editFormData.location.postalCode}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="location.country"
          placeholder=" Enter country"
          value={editFormData.location.country}
          onChange={handleEditFormChange}
        />
      </td> */}
      <td>
        <input
          type="date"
          name="date"
          placeholder="Enter date"
          value={editFormData.date}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="time"
          name="startTime"
          placeholder="Enter start time"
          value={editFormData.startTime}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="time"
          name="endTime"
          placeholder="Enter end time"
          value={editFormData.endTime}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={editFormData.city}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="eventLocation"
          placeholder="Enter Event Location"
          value={editFormData.eventLocation}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="organizer"
          placeholder="Enter organizer"
          value={editFormData.organizer}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="currency"
          placeholder="Enter currency"
          value={editFormData.currency}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="ticketType"
          placeholder="Enter ticket type"
          value={editFormData.ticketType}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="quantityAvailable"
          placeholder="Enter quantity available"
          value={editFormData.quantityAvailable}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="image"
          placeholder="Enter image"
          value={editFormData.image}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="seat"
          placeholder="Enter seat"
          value={editFormData.seat}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="row"
          placeholder="Enter row"
          value={editFormData.row}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit" onClick={handleUpdateTicket}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
