// // In einer separaten Komponente TicketForm.js
// import React from "react";

// const TicketForm = ({ formData, onChange }) => {
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Title"
//         required
//       />
//       <input
//         type="text"
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Description"
//         required
//       />
//       <input
//         type="text"
//         name="location.venueName"
//         value={formData.location.venueName}
//         onChange={handleChange}
//         placeholder="Venue Name"
//         required
//       />
//       <input
//         type="text"
//         name="location.addressLine1"
//         value={formData.location.addressLine1}
//         onChange={handleChange}
//         placeholder="Address Line 1"
//         required
//       />
//       <input
//         type="text"
//         name="location.state"
//         value={formData.location.state}
//         onChange={handleChange}
//         placeholder="State"
//       />
//       <input
//         type="text"
//         name="location.postalCode"
//         value={formData.location.postalCode}
//         onChange={handleChange}
//         placeholder="Postal Code"
//         required
//       />
//       <input
//         type="text"
//         name="location.country"
//         value={formData.location.country}
//         onChange={handleChange}
//         placeholder="Country"
//         required
//       />
//       <input
//         type="date"
//         name="date"
//         value={formData.date}
//         onChange={handleChange}
//         placeholder="Date"
//         required
//       />
//       <input
//         type="time"
//         name="startTime"
//         value={formData.startTime}
//         onChange={handleChange}
//         placeholder="Start Time"
//         required
//       />
//       <input
//         type="time"
//         name="endTime"
//         value={formData.endTime}
//         onChange={handleChange}
//         placeholder="End Time"
//         required
//       />
//       <input
//         type="text"
//         name="organizer"
//         value={formData.organizer}
//         onChange={handleChange}
//         placeholder="Organizer"
//         required
//       />
//       <input
//         type="number"
//         name="price"
//         value={formData.price}
//         onChange={handleChange}
//         placeholder="Price"
//         required
//       />
//       <input
//         type="text"
//         name="currency"
//         value={formData.currency}
//         onChange={handleChange}
//         placeholder="Currency"
//         required
//       />
//       <input
//         type="text"
//         name="ticketType"
//         value={formData.ticketType}
//         onChange={handleChange}
//         placeholder="Ticket Type"
//         required
//       />
//       <input
//         type="number"
//         name="quantityAvailable"
//         value={formData.quantityAvailable}
//         onChange={handleChange}
//         placeholder="Quantity Available"
//         required
//       />
//       <input
//         type="text"
//         name="image"
//         value={formData.image}
//         onChange={handleChange}
//         placeholder="Image URL"
//         required
//       />
//       <textarea
//         name="termsAndConditions"
//         value={formData.termsAndConditions}
//         onChange={handleChange}
//         placeholder="Terms and Conditions"
//         required
//       />
//       <input
//         type="text"
//         name="additionalInfo.ageRestriction"
//         value={formData.additionalInfo.ageRestriction}
//         onChange={handleChange}
//         placeholder="Age Restriction"
//       />
//       <input
//         type="text"
//         name="additionalInfo.dressCode"
//         value={formData.additionalInfo.dressCode}
//         onChange={handleChange}
//         placeholder="Dress Code"
//       />
//       <input
//         type="text"
//         name="additionalInfo.accessibilityInfo"
//         value={formData.additionalInfo.accessibilityInfo}
//         onChange={handleChange}
//         placeholder="Accessibility Info"
//       />
//       <input
//         type="text"
//         name="additionalInfo.parkingInfo"
//         value={formData.additionalInfo.parkingInfo}
//         onChange={handleChange}
//         placeholder="Parking Info"
//       />
//       <input
//         type="text"
//         name="additionalInfo.contactInfo"
//         value={formData.additionalInfo.contactInfo}
//         onChange={handleChange}
//         placeholder="Contact Info"
//       />
//       <button type="submit">Add Ticket</button>
//     </form>
//   );
// };

// export default TicketForm;
