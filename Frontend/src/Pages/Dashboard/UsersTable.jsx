import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  Select,
  Option,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = ["Profile", "Name", "Role", "Employed", ""];

export function SortableTable() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profilePicture: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/Users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setNewUser((prev) => ({ ...prev, role: value }));
  };

  const handleFileChange = (e) => {
    setNewUser((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const openEditModal = (user) => {
    setNewUser({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      profilePicture: user.profilePicture,
    });
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "",
      profilePicture: "",
    });
    setCurrentUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (currentUser) {
      // Update existing user
      const formData = new FormData();
      Object.keys(newUser).forEach((key) => {
        if (newUser[key] && newUser[key] !== currentUser[key]) {
          formData.append(key, newUser[key]);
        }
      });

      axios
        .put(
          `http://localhost:4000/dashboard/users/${currentUser._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setUsers(
            users.map((user) =>
              user._id === currentUser._id ? res.data : user
            )
          );
          toast.success("User updated successfully");
          closeEditModal();
        })
        .catch((err) => {
          setError("Error updating user. Please try again.");
          toast.error("Error updating user. Please try again.");
          console.log(err);
        });
    } else {
      // Create new user
      if (
        !newUser.name ||
        !newUser.email ||
        !newUser.password ||
        !newUser.role
      ) {
        toast.error("All fields except profile picture are required");
        return;
      }

      const formData = new FormData();
      Object.keys(newUser).forEach((key) => {
        formData.append(key, newUser[key]);
      });

      axios
        .post("http://localhost:4000/dashboard/users", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setUsers([...users, res.data]);
          toast.success("User added successfully");
          setNewUser({
            name: "",
            email: "",
            password: "",
            role: "",
            profilePicture: "",
          });
        })
        .catch((err) => {
          setError("Error adding user. Please try again.");
          toast.error("Error adding user. Please try again.");
          console.log(err);
        });
    }
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:4000/dashboard/users/${userId}`)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting user. Please try again.");
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredUsers.length / usersPerPage))
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const userStats = {
    total: users.length,
    admin: users.filter((user) => user.role === "admin").length,
    organizer: users.filter((user) => user.role === "organizer").length,
    customer: users.filter((user) => user.role === "customer").length,
  };

  return (
    <div className="mb-8 flex flex-col gap-2">
      <ToastContainer />
      <div className="m-2">
        <Card className="h-full w-full mb-6">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Users Management
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row p-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row"></div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <div className=" container flex justify-center m-2 mx-auto">
              <div className="bg-blue-500 text-white p-4 rounded-md flex items-center m-1 w-full">
                <UserGroupIcon className="h-6 w-6 mr-2" />
                <div>
                  <Typography variant="h6" color="white">
                    Total Users
                  </Typography>
                  <Typography variant="h4" color="white">
                    {userStats.total}
                  </Typography>
                </div>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-md flex items-center m-1 w-full">
                <UserIcon className="h-6 w-6 mr-2" />
                <div>
                  <Typography variant="h6" color="white">
                    Admins
                  </Typography>
                  <Typography variant="h4" color="white">
                    {userStats.admin}
                  </Typography>
                </div>
              </div>
              <div className="bg-orange-500 text-white p-4 rounded-md flex items-center m-1 w-full">
                <UsersIcon className="h-6 w-6 mr-2" />
                <div>
                  <Typography variant="h6" color="white">
                    Organizers
                  </Typography>
                  <Typography variant="h4" color="white">
                    {userStats.organizer}
                  </Typography>
                </div>
              </div>
              <div className="bg-red-500 text-white p-4 rounded-md flex items-center m-1 w-full">
                <BriefcaseIcon className="h-6 w-6 mr-2" />
                <div>
                  <Typography variant="h6" color="white">
                    Customers
                  </Typography>
                  <Typography variant="h4" color="white">
                    {userStats.customer}
                  </Typography>
                </div>
              </div>
            </div>
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 px-4 py-1 transition-colors hover:bg-blue-gray-300 rounded"
                    onClick={() => setIsAddUserFormOpen(!isAddUserFormOpen)}
                  >
                    <Typography
                      variant="h4"
                      color="white"
                      className="flex items-center justify-between font-normal leading-none capitalize"
                    >
                      <span className="flex">
                        <UserPlusIcon className="h-5 w-5" />
                        Add a new user
                      </span>
                      <Button size="sm">show form</Button>
                    </Typography>
                  </th>
                </tr>
              </thead>
              {isAddUserFormOpen && (
                <tbody>
                  <tr>
                    <td className="p-4">
                      <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 p-2">
                          <Input
                            size="md"
                            label="Name"
                            name="name"
                            value={newUser.name}
                            onChange={handleChange}
                          />
                          <Input
                            type="email"
                            label="Email Address"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            className="pr-20"
                            containerProps={{
                              className: "min-w-0",
                            }}
                          />
                        </div>
                        <div className="flex gap-4 p-2">
                          <Input
                            type="password"
                            size="md"
                            label="Password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                          />
                          <Select
                            label="Select Role"
                            name="role"
                            value={newUser.role}
                            onChange={handleSelectChange}
                          >
                            <Option value="admin">Admin</Option>
                            <Option value="organizer">Organizer</Option>
                            <Option value="customer">Customer</Option>
                          </Select>
                        </div>
                        <div className="flex gap-4 p-2">
                          <div
                            className="flex-grow"
                            style={{ flexBasis: "70%" }}
                          >
                            <Input
                              type="file"
                              size="md"
                              label="Profile"
                              onChange={handleFileChange}
                            />
                          </div>
                          <div
                            className="flex-grow"
                            style={{ flexBasis: "30%" }}
                          >
                            <Button
                              type="submit"
                              className="w-full flex items-center justify-center gap-2"
                            >
                              {currentUser ? "Update user" : "Add user"}{" "}
                              <UserPlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {error && (
                          <div className="text-red-500 mt-2">{error}</div>
                        )}
                      </form>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </CardBody>
        </Card>
      </div>

      <div className="m-2">
        <Card className="h-full w-full bg-blue-gray-100">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex justify-between items-center bg-blue-gray-100">
              <Typography variant="h5" color="blue-gray">
                Users
              </Typography>
              <div className="w-72 mt-4">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <table className=" mt-4 w-full min-w-max table-auto text-left ">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className=" cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
                      >
                        {capitalizeFirstLetter(head)}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map(
                  (
                    { _id, profilePicture, name, email, role, createdAt },
                    index
                  ) => {
                    const isLast = index === filteredUsers.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <Avatar
                            src={profilePicture}
                            alt={name}
                            size="sm"
                            className="rounded-full border border-blue-gray-200 shadow-sm overflow-hidden w-12 h-12"
                          />
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {capitalizeFirstLetter(name)}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </td>
                        <td className={`${classes}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal uppercase opacity-70"
                          >
                            {role}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatDate(createdAt)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-2">
                            <Tooltip content="Edit User">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  openEditModal({
                                    _id,
                                    name,
                                    email,
                                    role,
                                    profilePicture,
                                  })
                                }
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip content="Delete User">
                              <IconButton
                                variant="text"
                                onClick={() => handleDelete(_id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between p-4">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({
                length: Math.ceil(filteredUsers.length / usersPerPage),
              }).map((_, index) => (
                <IconButton
                  key={index + 1}
                  variant={currentPage === index + 1 ? "filled" : "text"}
                  size="sm"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(filteredUsers.length / usersPerPage)
              }
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Dialog open={isEditModalOpen} handler={closeEditModal}>
        <DialogHeader>Edit User</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 p-2">
              <Input
                size="md"
                label="Name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
              />
              <Input
                type="email"
                label="Email Address"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
            </div>
            <div className="flex gap-4 p-2">
              <Input
                type="password"
                size="md"
                label="Password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
              <Select
                label="Select Role"
                name="role"
                value={newUser.role}
                onChange={handleSelectChange}
              >
                <Option value="admin">Admin</Option>
                <Option value="organizer">Organizer</Option>
                <Option value="customer">Customer</Option>
              </Select>
            </div>
            <div className="flex gap-4 p-2">
              <Input
                type="file"
                size="md"
                label="Profile"
                onChange={handleFileChange}
              />
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default SortableTable;
