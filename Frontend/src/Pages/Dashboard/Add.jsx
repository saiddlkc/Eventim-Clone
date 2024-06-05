// import { useEffect, useState } from "react";
// import {
//   MagnifyingGlassIcon,
//   ChevronUpDownIcon,
// } from "@heroicons/react/24/outline";
// import {
//   Card,
//   CardHeader,
//   Input,
//   Typography,
//   Button,
//   CardBody,
//   CardFooter,
//   Avatar,
//   Select,
//   Option,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const TABLE_HEAD = [
//   "Event Name",
//   "category",
//   "genre",
//   "artist",
//   "price",
//   "location",
//   "buyer",
//   "barcode",
//   "event_date",
//   "organizer",
//   "event_information",
//   "additional_info",
//   "profilePicture",
// ];

// export function Tickets() {
//   const [Ticket, setTicket] = useState([]);
//   const [newTicket, setNewTicket] = useState({
//     event_name: "",
//     category: "",
//     genre: "",
//     artist: "",
//     price: "",
//     location: { venue: "", city: "", address: "" },
//     buyer: { name: "", email: "", phone: "" },
//     barcode: "",
//     event_date: "",
//     organizer: "",
//     event_information: "",
//     additional_info: {
//       age_restriction: "",
//       ticket_availability: "",
//       tickets_sold: "",
//       event_status: "",
//       event_type: "",
//       seating: { type: "", available_seats: "", seat_number: "" },
//       profilePicture: "",
//     },
//   });
//   const [currentUser, setCurrentUser] = useState(null); // [1
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/dashboard/tickets/"
//         );
//         setTicket(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchTickets();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:9000/books/${id}`);
//       const response = await axios.get("http://localhost:9000/books");
//       setBooks(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (value) => {
//     setNewTicket((prev) => ({ ...prev, role: value }));
//   };

//   const handleFileChange = (e) => {
//     setNewTicket((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     return new Date(dateString).toLocaleDateString("en-GB", options);
//   };

//   const openEditModal = (ticket) => {
//     setNewTicket({
//       event_name: ticket.event_name,
//       category: ticket.category,
//       genre: ticket.genre,
//       artist: ticket.artist,
//       price: ticket.price,
//       location: {
//         venue: ticket.vanue,
//         city: ticket.city,
//         address: ticket.address,
//       },
//       buyer: { name: ticket.name, email: ticket.email, phone: ticket.phone },
//       barcode: ticket.barcode,
//       event_date: ticket.event_date,
//       organizer: ticket.organizer,
//       event_information: ticket.event_information,
//       additional_info: {
//         age_restriction: ticket.age_restriction,
//         ticket_availability: ticket.ticket_availability,
//         tickets_sold: ticket.tickets_sold,
//         event_status: ticket.event_status,
//         event_type: ticket.event_type,
//         seating: {
//           type: ticket.type,
//           available_seats: ticket.available_seats,
//           seat_number: ticket.seat_number,
//         },
//       },
//       profilePicture: ticket.profilePicture,
//     });
//     setCurrentUser(user);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setNewTicket({
//       event_name: "",
//       category: "",
//       genre: "",
//       artist: "",
//       price: "",
//       location: { venue: "", city: "", address: "" },
//       buyer: { name: "", email: "", phone: "" },
//       barcode: "",
//       event_date: "",
//       organizer: "",
//       event_information: "",
//       additional_info: {
//         age_restriction: "",
//         ticket_availability: "",
//         tickets_sold: "",
//         event_status: "",
//         event_type: "",
//         seating: { type: "", available_seats: "", seat_number: "" },
//         profilePicture: "",
//       },
//       profilePicture: "",
//     });
//     setCurrentUser(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (currentUser) {
//       // Update existing user
//       const formData = new FormData();
//       Object.keys(newTicket).forEach((key) => {
//         if (newTicket[key] && newUnewTicketser[key] !== currentUser[key]) {
//           formData.append(key, newTicket[key]);
//         }
//       });

//       axios
//         .put(
//           `http://localhost:4000/dashboard/tickets//${currentUser._id}`,
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         )
//         .then((res) => {
//           setTicket(
//             Ticket.map((user) =>
//               user._id === currentUser._id ? res.data : user
//             )
//           );
//           toast.success("User updated successfully");
//           closeEditModal();
//         })
//         .catch((err) => {
//           setError("Error updating user. Please try again.");
//           toast.error("Error updating user. Please try again.");
//           console.log(err);
//         });
//     } else {
//       // Create new user
//       if (
//         !newTicket.name ||
//         !newTicket.email ||
//         !newTicket.password ||
//         !newTicket.role
//       ) {
//         toast.error("All fields except profile picture are required");
//         return;
//       }

//       const formData = new FormData();
//       Object.keys(newTicket).forEach((key) => {
//         formData.append(key, newTicket[key]);
//       });

//       axios
//         .post("http://localhost:4000/dashboard/tickets/", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         })
//         .then((res) => {
//           setTicket([...users, res.data]);
//           toast.success("User added successfully");
//           setNewTicket({
//             event_name: "",
//             category: "",
//             genre: "",
//             artist: "",
//             price: "",
//             location: { venue: "", city: "", address: "" },
//             buyer: { name: "", email: "", phone: "" },
//             barcode: "",
//             event_date: "",
//             organizer: "",
//             event_information: "",
//             additional_info: {
//               age_restriction: "",
//               ticket_availability: "",
//               tickets_sold: "",
//               event_status: "",
//               event_type: "",
//               seating: { type: "", available_seats: "", seat_number: "" },
//               profilePicture: "",
//             },
//             profilePicture: "",
//           });
//         })
//         .catch((err) => {
//           setError("Error adding user. Please try again.");
//           toast.error("Error adding user. Please try again.");
//           console.log(err);
//         });
//     }
//   };

//   const handleDelete = (userId) => {
//     axios
//       .delete(`http://localhost:4000/dashboard/tickets//${userId}`)
//       .then((res) => {
//         setTicket(users.filter((user) => user._id !== userId));
//         toast.success("User deleted successfully");
//       })
//       .catch((err) => {
//         toast.error("Error deleting user. Please try again.");
//         console.log(err);
//       });
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filteredUsers = Ticket.filter((user) => user.name);

//   return (
//     <div className=" mb-8 flex flex-col gap-2 ">
//       <ToastContainer />
//       <div className="m-2">
//         <Card className="h-full w-full mb-6 ">
//           <CardHeader floated={false} shadow={false} className="rounded-none">
//             <div className="mb-8 flex items-center justify-between gap-8 ">
//               <div>
//                 <Typography variant="h5" color="blue-gray">
//                   Users Management
//                 </Typography>
//                 <Typography color="gray" className="mt-1 font-normal">
//                   See information about all members
//                 </Typography>
//               </div>
//               <div className="flex shrink-0 flex-col gap-2 sm:flex-row p-4">
//                 <div className="flex flex-col items-center justify-between gap-4 md:flex-row "></div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardBody className=" px-0">
//             <table className="mt-4 w-full min-w-max table-auto text-left">
//               <thead>
//                 <tr>
//                   <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50 rounded">
//                     <Typography
//                       variant="h6"
//                       color="blue-gray"
//                       className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
//                     >
//                       Add a new user <UserPlusIcon className="h-5 w-5" />
//                     </Typography>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="p-4">
//                     <form onSubmit={handleSubmit}>
//                       <div className="flex gap-4 p-2">
//                         <Input
//                           size="md"
//                           type="text"
//                           label="Event Name"
//                           name="event_name"
//                           value={newTicket.name}
//                           onChange={handleChange}
//                         />
//                         <Input
//                           size="md"
//                           type="text"
//                           label="Category"
//                           name="category"
//                           value={newTicket.category}
//                           onChange={handleChange}
//                         />

//                         <Input
//                           type="text"
//                           label="Genre"
//                           name="genre"
//                           value={newTicket.genre}
//                           onChange={handleChange}
//                           className="pr-20"
//                           containerProps={{
//                             className: "min-w-0",
//                           }}
//                         />
//                         <Input
//                           type="text"
//                           label="Artist"
//                           name="artist"
//                           value={newTicket.artist}
//                           onChange={handleChange}
//                           className="pr-20"
//                           containerProps={{
//                             className: "min-w-0",
//                           }}
//                         />
//                       </div>
//                       <div className="flex gap-4 p-2">
//                         <Input
//                           size="md"
//                           type="text"
//                           label="price"
//                           name="price"
//                           value={newTicket.price}
//                           onChange={handleChange}
//                         />
//                         <Input
//                           size="md"
//                           type="text"
//                           label="Venue"
//                           name="venue"
//                           value={newTicket.location.venue}
//                           onChange={handleChange}
//                         />

//                         <Input
//                           type="text"
//                           label="City"
//                           name="city"
//                           value={newTicket.location.city}
//                           onChange={handleChange}
//                           className="pr-20"
//                           containerProps={{
//                             className: "min-w-0",
//                           }}
//                         />
//                         <Input
//                           type="text"
//                           label="Address"
//                           name="address"
//                           value={newTicket.location.address}
//                           onChange={handleChange}
//                           className="pr-20"
//                           containerProps={{
//                             className: "min-w-0",
//                           }}
//                         />
//                       </div>
//                       <div className="flex gap-4 p-2">
//                         <Input
//                           size="md"
//                           type="text"
//                           label="Name"
//                           name="Name"
//                           value={newTicket.buyer.name}
//                           onChange={handleChange}
//                         />

//                         <Input
//                           type="email"
//                           label="Email"
//                           name=" email"
//                           value={newTicket.buyer.email}
//                           onChange={handleChange}
//                           className="pr-20"
//                           containerProps={{
//                             className: "min-w-0",
//                           }}
//                         />
//                         <Input
//                           size="md"
//                           type="text"
//                           label="Phone"
//                           name="phone"
//                           value={newTicket.buyer.phone}
//                           onChange={handleChange}
//                         />

//                         <Input
//                           type="text"
//                           label="Event Date"
//                           name="event_date"
//                           value={newTicket.event_date}
//                           onChange={handleChange}
//                           className="pr-20"
//                           containerProps={{
//                             className: "min-w-0",
//                           }}
//                         />
//                       </div>
//                       <div className="flex gap-4 p-2">
//                         <div className="flex-grow" style={{ flexBasis: "30%" }}>
//                           <Button
//                             type="submit"
//                             className="w-full flex items-center justify-center gap-2 "
//                           >
//                             {currentUser ? "Update user" : "Add user"}{" "}
//                             <UserPlusIcon className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                       {error && (
//                         <div className="text-red-500 mt-2">{error}</div>
//                       )}
//                     </form>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </CardBody>
//         </Card>
//       </div>
//       <hr className="border-t-2 border-blue-gray-200 mt-4 mb-4" />
//       <div className="m-2">
//         <Card className="h-full w-full ">
//           <CardHeader floated={false} shadow={false} className="rounded-none ">
//             <div className="flex justify-between items-center">
//               <Typography variant="h5" color="blue-gray">
//                 Users
//               </Typography>
//               <div className="w-72 mt-4">
//                 <Input
//                   label="Search"
//                   icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </div>
//             </div>
//           </CardHeader>
//           <CardBody className=" px-0">
//             <table className="mt-4 w-full min-w-max table-auto text-left">
//               <thead>
//                 <tr>
//                   {TABLE_HEAD.map((head, index) => (
//                     <th
//                       key={head}
//                       className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50"
//                     >
//                       <Typography
//                         variant="h6"
//                         color="blue-gray"
//                         className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
//                       >
//                         {capitalizeFirstLetter(head)}
//                         {index !== TABLE_HEAD.length - 1 && (
//                           <ChevronUpDownIcon
//                             strokeWidth={2}
//                             className="h-4 w-4"
//                           />
//                         )}
//                       </Typography>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map(
//                   (
//                     { _id, profilePicture, name, email, role, createdAt },
//                     index
//                   ) => {
//                     const isLast = index === filteredUsers.length - 1;
//                     const classes = isLast
//                       ? "p-4"
//                       : "p-4 border-b border-blue-gray-50";

//                     return (
//                       <tr key={_id}>
//                         <td className={classes}>
//                           <Avatar
//                             src={profilePicture}
//                             alt={name}
//                             size="sm"
//                             className="rounded-full border border-blue-gray-200 shadow-sm overflow-hidden w-12 h-12"
//                           />
//                         </td>
//                         <td className={classes}>
//                           <div className="flex flex-col">
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-semibold"
//                             >
//                               {capitalizeFirstLetter(name)}
//                             </Typography>
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-normal opacity-70"
//                             >
//                               {email}
//                             </Typography>
//                           </div>
//                         </td>
//                         <td className={`${classes}`}>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal uppercase opacity-70"
//                           >
//                             {role}
//                           </Typography>
//                         </td>
//                         <td className={classes}>
//                           <Typography
//                             variant="small"
//                             color="blue-gray"
//                             className="font-normal"
//                           >
//                             {formatDate(createdAt)}
//                           </Typography>
//                         </td>
//                         <td className={classes}>
//                           <div className="flex items-center gap-2">
//                             <Tooltip content="Edit User">
//                               <IconButton
//                                 variant="text"
//                                 onClick={() =>
//                                   openEditModal({
//                                     event_name,
//                                     category,
//                                     genre,
//                                     artist,
//                                     price,
//                                     location: { venue, city, address },
//                                     buyer,
//                                     barcode,
//                                     event_date,
//                                     organizer,
//                                     event_information,
//                                     additional_info: {
//                                       age_restriction,
//                                       ticket_availability,
//                                       tickets_sold,
//                                       event_status,
//                                       event_type,
//                                       seating: {
//                                         type,
//                                         available_seats,
//                                         seat_number,
//                                       },
//                                     },
//                                     profilePicture: ticket.profilePicture,
//                                   })
//                                 }
//                               >
//                                 <PencilIcon className="h-4 w-4" />
//                               </IconButton>
//                             </Tooltip>

//                             <Tooltip content="Delete User">
//                               <IconButton
//                                 variant="text"
//                                 onClick={() => handleDelete(_id)}
//                               >
//                                 <TrashIcon className="h-4 w-4" />
//                               </IconButton>
//                             </Tooltip>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
//               </tbody>
//             </table>
//           </CardBody>
//           <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//             <Button variant="outlined" size="sm">
//               Previous
//             </Button>
//             <div className="flex items-center gap-2">
//               <IconButton variant="outlined" size="sm">
//                 1
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 2
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 3
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 ...
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 8
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 9
//               </IconButton>
//               <IconButton variant="text" size="sm">
//                 10
//               </IconButton>
//             </div>
//             <Button variant="outlined" size="sm">
//               Next
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//       <Dialog open={isEditModalOpen} handler={closeEditModal}>
//         <DialogHeader>Edit User</DialogHeader>
//         <DialogBody>
//           <form onSubmit={handleSubmit}>
//             <div className="flex gap-4 p-2">
//               <Input
//                 size="md"
//                 type="text"
//                 label="Event Name"
//                 name="event_name"
//                 value={newTicket.name}
//                 onChange={handleChange}
//               />
//               <Input
//                 size="md"
//                 type="text"
//                 label="Category"
//                 name="category"
//                 value={newTicket.category}
//                 onChange={handleChange}
//               />

//               <Input
//                 type="text"
//                 label="Genre"
//                 name="genre"
//                 value={newTicket.genre}
//                 onChange={handleChange}
//                 className="pr-20"
//                 containerProps={{
//                   className: "min-w-0",
//                 }}
//               />
//               <Input
//                 type="text"
//                 label="Artist"
//                 name="artist"
//                 value={newTicket.artist}
//                 onChange={handleChange}
//                 className="pr-20"
//                 containerProps={{
//                   className: "min-w-0",
//                 }}
//               />
//             </div>
//             <div className="flex gap-4 p-2">
//               <Input
//                 size="md"
//                 type="text"
//                 label="price"
//                 name="price"
//                 value={newTicket.price}
//                 onChange={handleChange}
//               />
//               <Input
//                 size="md"
//                 type="text"
//                 label="Venue"
//                 name="venue"
//                 value={newTicket.location.venue}
//                 onChange={handleChange}
//               />

//               <Input
//                 type="text"
//                 label="City"
//                 name="city"
//                 value={newTicket.location.city}
//                 onChange={handleChange}
//                 className="pr-20"
//                 containerProps={{
//                   className: "min-w-0",
//                 }}
//               />
//               <Input
//                 type="text"
//                 label="Address"
//                 name="address"
//                 value={newTicket.location.address}
//                 onChange={handleChange}
//                 className="pr-20"
//                 containerProps={{
//                   className: "min-w-0",
//                 }}
//               />
//             </div>
//             <div className="flex gap-4 p-2">
//               <Input
//                 size="md"
//                 type="text"
//                 label="Name"
//                 name="Name"
//                 value={newTicket.buyer.name}
//                 onChange={handleChange}
//               />

//               <Input
//                 type="email"
//                 label="Email"
//                 name=" email"
//                 value={newTicket.buyer.email}
//                 onChange={handleChange}
//                 className="pr-20"
//                 containerProps={{
//                   className: "min-w-0",
//                 }}
//               />
//               <Input
//                 size="md"
//                 type="text"
//                 label="Phone"
//                 name="phone"
//                 value={newTicket.buyer.phone}
//                 onChange={handleChange}
//               />

//               <Input
//                 type="text"
//                 label="Event Date"
//                 name="event_date"
//                 value={newTicket.event_date}
//                 onChange={handleChange}
//                 className="pr-20"
//                 containerProps={{
//                   className: "min-w-0",
//                 }}
//               />
//             </div>
//             <div className="flex gap-4 p-2">
//               <div className="flex-grow" style={{ flexBasis: "30%" }}>
//                 <Button
//                   type="submit"
//                   className="w-full flex items-center justify-center gap-2 "
//                 >
//                   {currentUser ? "Update user" : "Add user"}{" "}
//                   <UserPlusIcon className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             {error && <div className="text-red-500 mt-2">{error}</div>}
//           </form>
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="red" onClick={closeEditModal}>
//             Cancel
//           </Button>
//           <Button variant="gradient" color="green" onClick={handleSubmit}>
//             Save
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

// export default Tickets;
