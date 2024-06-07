import React from "react";

const AddTable = ({ addTicketsData, handleAddChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="title..."
          name="title"
          value={addTicketsData.title}
          onChange={handleAddChange}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="description..."
          name="description"
          value={addTicketsData.description}
          onChange={handleAddChange}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="location..."
          name="location"
          value={addTicketsData.location}
          onChange={handleAddChange}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="attendees..."
          name="attendees"
          value={addTicketsData.attendees}
          onChange={handleAddChange}
        />
      </td>
      <td>
        <input
          type="date"
          placeholder="createdAt"
          name="createdAt"
          value={addTicketsData.createdAt}
          onChange={handleAddChange}
        />
      </td>
      <td>
        <button type="submit" className="btn">
          save
        </button>
        <button type="button" onClick={handleCancelClick} className="btn">
          delete
        </button>
      </td>
    </tr>
  );
};

export default AddTable;
