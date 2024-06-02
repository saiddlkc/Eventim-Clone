import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";
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
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/users")
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error("All fields except profile picture are required");
      return;
    }

    const formData = new FormData();
    Object.keys(newUser).forEach((key) => {
      formData.append(key, newUser[key]);
    });

    axios
      .post("http://localhost:4000/dashboard/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUsers([...users, res.data]);
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "",
          profilePicture: "",
        });
        toast.success("User added successfully");
      })
      .catch((err) => {
        setError("Error adding user. Please try again.");
        toast.error("Error adding user. Please try again.");
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 m-2">
      <ToastContainer />
      <div className="m-4">
        <Card className="h-full w-full mb-6 bg-blue-gray-100">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8 bg-blue-gray-100">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Users Management
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row p-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row "></div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50 rounded">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 capitalize"
                    >
                      Add a new user <UserPlusIcon className="h-5 w-5" />
                    </Typography>
                  </th>
                </tr>
              </thead>
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
                        <div className="flex-grow" style={{ flexBasis: "70%" }}>
                          <Input
                            type="file"
                            size="md"
                            label="Profile"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="flex-grow" style={{ flexBasis: "30%" }}>
                          <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 "
                          >
                            Add user <UserPlusIcon className="h-4 w-4" />
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
            </table>
          </CardBody>
        </Card>
      </div>
      <div className="m-4">
        <Card className="h-full w-full bg-blue-gray-100">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-blue-gray-100"
          >
            <div className="flex justify-between items-center">
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
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-500 p-4 transition-colors hover:bg-blue-gray-50"
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
                {filteredUsers.map(
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
                            {new Date(createdAt).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={`${classes}`}>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            Edit
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 5
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SortableTable;
