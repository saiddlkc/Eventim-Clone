import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TABLE_HEAD = ["Profile", "Name", "Role", "Employed", ""];

export function TableWithStripedColumns() {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="bg-gray-800 px-2 pb-3 shadow-lg rounded-lg">
        <CardHeader
          variant="gradient"
          className="mb-2 p-6 bg-gray-800 rounded-t-xl shadow-lg"
        >
          <Typography variant="h6" color="white">
            Add Member
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-0"></CardBody>
      </Card>
      <Card className="bg-gray-800 px-2 pb-3 shadow-lg rounded-lg">
        <CardHeader
          variant="gradient"
          className="mb-2 p-6 bg-gray-800 rounded-t-xl shadow-lg"
        >
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-0">
          <table className="w-full min-w-max table-auto text-left bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(
                (
                  { _id, profilePicture, name, email, role, createdAt },
                  index
                ) => {
                  const isLast = index === users.length - 1;
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
                          className="rounded-full border border-blue-gray-200 shadow-sm overflow-hidden w-20 h-20"
                        />
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
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
                      <td className={`${classes} bg-blue-gray-50/50`}>
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
                      <td className={`${classes} bg-blue-gray-50/50`}>
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
      </Card>
    </div>
  );
}

export default TableWithStripedColumns;
