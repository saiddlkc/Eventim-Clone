import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inbox = () => {
  const [TABLE_ROWS, setTableRows] = useState([]);
  const [doneRows, setDoneRows] = useState([]); // Zustand für erledigte Zeilen
  const TABLE_HEAD = ["ID", "From", "Subject", "Message", "Actions"];

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/contact")
      .then((res) => {
        setTableRows(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete(
        `http://localhost:4000/dashboard/contact/${idToDelete}`
      );
      setTableRows((prevRows) =>
        prevRows.filter((row) => row._id !== idToDelete)
      );
      toast.success("Ticket wurde gelöscht!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete contact.");
    }
  };

  const handleDone = (idToDone) => {
    setDoneRows((prevDoneRows) => [...prevDoneRows, idToDone]);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <ToastContainer />

      <Card className="border bg-blue-gray-50 mx-3 w-full mt-8">
        <CardHeader color="blue-gray">
          <Typography variant="h6" color="white" className="p-8">
            Inbox
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 m-1">
            <table className="w-full min-w-max table-auto text-left">
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
                {TABLE_ROWS.map(({ _id, email, subject, message }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  const isDone = doneRows.includes(_id);
                  const rowClass = isDone ? "bg-green-100" : "";

                  return (
                    <tr
                      key={_id}
                      className={`${rowClass} border-2 border-white`}
                    >
                      <td className={`${classes} w-20 border-2 border-white`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {_id}
                        </Typography>
                      </td>
                      <td className={`${classes} w-52 border-2 border-white`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={`${classes}  w-52 border-2 border-white`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {subject}
                        </Typography>
                      </td>
                      <td className={`${classes} border-2 border-white w-96`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {message}
                        </Typography>
                      </td>
                      <td className={`${classes} border-2 border-white w-20`}>
                        <Button
                          color="red"
                          size="sm"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td className={`${classes} border-2 border-white w-20`}>
                        <Button
                          color="green"
                          size="sm"
                          onClick={() => handleDone(_id)}
                        >
                          Done
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Inbox;
