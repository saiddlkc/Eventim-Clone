import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  CardHeader,
  CardFooter,
  Button,
  Switch,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";

export function Profile() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialTab = query.get("tab") || "app";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [users, setUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [TABLE_ROWS, setTableRows] = useState([]);
  const [error, setError] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const TABLE_HEAD = ["Email", "Subject", "Message"];

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/dashboard/contact",
        { email, subject, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const newMessage = response.data; // Verwende die gesamte Antwort, die die ID enthalten sollte
        setTableRows((prevRows) => [newMessage, ...prevRows]);
        setEmail("");
        setSubject("");
        setMessage("");
        toast.success("dein Ticket wurde erfolgreich abgesendet!");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.log(err);
      toast.error("Failed to send message.");
    }
  };
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

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tab = query.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  const { user } = useAuthContext();

  return (
    <>
      <ToastContainer />
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {user && (
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={user.profilePicture}
                  alt={user.name}
                  size="xxl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {user.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {user.email}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {user.role}
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <Tabs
                  value={activeTab}
                  onChange={(value) => setActiveTab(value)}
                >
                  <TabsHeader>
                    <Tab value="app" onClick={() => setActiveTab("app")}>
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      App
                    </Tab>
                    <Tab
                      value="message"
                      onClick={() => setActiveTab("message")}
                    >
                      <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                      Contact
                    </Tab>
                    <Tab
                      value="settings"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      Settings
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
          )}

          {activeTab === "app" && (
            <>
              <div className="px-4 pb-4 border-t-2">
                <Typography variant="h6" color="blue-gray" className="mt-6">
                  My Tickets
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  You have 3 tickets
                </Typography>
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4 ">
                  <div>
                    <Card className="mt-6 w-96">
                      <CardHeader color="blue-gray" className="relative h-56">
                        <img
                          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                          alt="card-image"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2"
                        >
                          UI/UX Review Check
                        </Typography>
                        <Typography>
                          The place is close to Barceloneta Beach and bus stop
                          just 2 min by walk and near to &quot;Naviglio&quot;
                          where you can enjoy the main night life in Barcelona.
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button>Read More</Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div>
                    <Card className="mt-6 w-96">
                      <CardHeader color="blue-gray" className="relative h-56">
                        <img
                          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                          alt="card-image"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2"
                        >
                          UI/UX Review Check
                        </Typography>
                        <Typography>
                          The place is close to Barceloneta Beach and bus stop
                          just 2 min by walk and near to &quot;Naviglio&quot;
                          where you can enjoy the main night life in Barcelona.
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button>Read More</Button>
                      </CardFooter>
                    </Card>
                  </div>
                  <div>
                    <Card className="mt-6 w-96">
                      <CardHeader color="blue-gray" className="relative h-56">
                        <img
                          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                          alt="card-image"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2"
                        >
                          UI/UX Review Check
                        </Typography>
                        <Typography>
                          The place is close to Barceloneta Beach and bus stop
                          just 2 min by walk and near to &quot;Naviglio&quot;
                          where you can enjoy the main night life in Barcelona.
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button>Read More</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "message" && (
            <div className="p-8 flex">
              <Card className="border bg-blue-gray-50 mx-3 w-full">
                <CardHeader color="blue-gray">
                  <Typography
                    variant="h6"
                    color="white"
                    className="p-2 text-center"
                  >
                    Unser Kontakt Formular für jede Art von Anfrage
                  </Typography>
                </CardHeader>
                <CardBody>
                  <div className="gap-4 m-3">
                    <p className="text-black">
                      Wir werden dir per Email antworten. Falls eine Ticket ID
                      vorhanden ist gib sie bitte im Betreff ein.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 m-3">
                      <Input
                        type="text"
                        label="Email"
                        size="md"
                        placeholder="Type your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex gap-4 m-3">
                      <Input
                        type="text"
                        label="Betreff"
                        size="md"
                        placeholder="Betreff"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex gap-4 m-3">
                      <Textarea
                        label="Message"
                        size="md"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex gap-4 m-3">
                      <Button color="gray" size="regular" type="submit">
                        Send
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="grid-cols-1 mb-12 grid gap-24 px-4 lg:grid-cols-2 xl:grid-cols-2">
              <div className="border bg-blue-gray-50 p-8">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Platform Settings
                </Typography>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center justify-between">
                    <Typography>Email me when someone follows me</Typography>
                    <Switch defaultChecked />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>
                      Email me when someone answers on my post
                    </Typography>
                    <Switch />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>Email me when someone mentions me</Typography>
                    <Switch defaultChecked />
                  </li>
                </ul>
              </div>
              <div className="border bg-blue-gray-50 p-8">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Application Settings
                </Typography>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center justify-between">
                    <Typography>New launches and projects</Typography>
                    <Switch defaultChecked />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>Monthly product updates</Typography>
                    <Switch />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>Subscribe to newsletter</Typography>
                    <Switch defaultChecked />
                  </li>
                </ul>
              </div>
              <div className="border bg-blue-gray-50 p-8">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Privacy Settings
                </Typography>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center justify-between">
                    <Typography>Make my profile private</Typography>
                    <Switch />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>
                      Allow search engines to index my profile
                    </Typography>
                    <Switch />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>Show my online status</Typography>
                    <Switch defaultChecked />
                  </li>
                </ul>
              </div>
              <div className="border bg-blue-gray-50 p-8">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Account Settings
                </Typography>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center justify-between">
                    <Typography>
                      Receive account activity notifications
                    </Typography>
                    <Switch />
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography>Language preference</Typography>
                    <select className="border rounded p-2">
                      <option>English</option>
                      <option>German</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </li>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="select-none rounded-lg bg-gradient-to-tr bg-red-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Account löschen
                  </Button>
                </ul>

                {isDialogOpen && (
                  <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <div
                      className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
                      onClick={(e) => e.stopPropagation()} // Prevents closing the dialog when clicking inside the dialog
                    >
                      <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
                        It's not so easy my Friend.
                      </div>
                      <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
                        Um deinen Account zu löschen, musst du uns eine
                        Nachricht über das Kontaktformular schicken, damit wir
                        prüfen können, ob du der Besitzer des Accounts bist.
                      </div>
                      <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                        <Button
                          onClick={() => setIsDialogOpen(false)}
                          className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Verstanden
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
