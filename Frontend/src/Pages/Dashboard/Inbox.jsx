import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inbox = () => {
  const [TABLE_ROWS, setTableRows] = useState([]);
  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const TABLE_HEAD = ["From", "To", "Subject", "Message"];

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

  const handleDelete = async (emailToDelete) => {
    try {
      const contact = TABLE_ROWS.find((row) => row.email === emailToDelete);
      if (!contact) {
        toast.error("Contact not found.");
        return;
      }

      console.log("Contact ID to delete:", contact._id);

      await axios.delete(
        `http://localhost:4000/dashboard/contact/${contact._id}`
      );

      setTableRows((prevRows) =>
        prevRows.filter((row) => row._id !== contact._id)
      );
      toast.success("Ticket wurde gelöscht!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete contact.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/dashboard/contact",
        { fromEmail, toEmail, subject, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const newMessage = response.data; // Use the entire response that should include the ID
        setTableRows((prevRows) => [newMessage, ...prevRows]);
        setFromEmail("");
        setToEmail("");
        setSubject("");
        setMessage("");
        toast.success("Message sent successfully!");
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <ToastContainer />

      <Card className="border bg-blue-gray-50 mx-3 w-full mt-8">
        <CardHeader color="blue-gray">
          <Typography variant="h6" color="white" className="p-2">
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
                {TABLE_ROWS.map(
                  ({ fromEmail, toEmail, subject, message, _id }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fromEmail}
                          </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {toEmail}
                          </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {subject}
                          </Typography>
                        </td>
                        <td className={`${classes} w-32`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {message}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Button
                            color="red"
                            size="regular"
                            onClick={() => handleDelete(_id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Card className="border bg-blue-gray-50 mx-3 w-full mb-8 mt-16">
        <CardHeader color="blue-gray">
          <Typography variant="h6" color="white" className="p-2">
            Send a Message
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                label="From"
                size="lg"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                label="To"
                size="lg"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Subject"
                size="lg"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Textarea
                label="Message"
                size="lg"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" color="black" fullWidth>
              Send Message
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Inbox;
