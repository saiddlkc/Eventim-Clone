import { useState, useEffect } from "react";
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

export function Profile() {
  const [activeTab, setActiveTab] = useState("app");
  const [users, setUsers] = useState([]);

  const TABLE_HEAD = ["User", "Subject", "Message"];

  const TABLE_ROWS = [
    {
      user: "Alexa Liras",
      subject: "Ticket #445",
      message: "I need help with my account",
    },
    {
      user: "Alexa Liras",
      subject: "Ticket #446",
      message: "I need help with my account",
    },
    {
      user: "Alexa Liras",
      subject: "Ticket #447",
      message: "I need help with my account",
    },
    {
      user: "Alexa Liras",
      subject: "Ticket #448",
      message: "I need help with my account",
    },
    {
      user: "Alexa Liras",
      subject: "Ticket #449",
      message: "I need help with my account",
    },
  ];

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

  const user = users[0]; // Get the first user

  return (
    <>
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
                      Message
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
              <div className="gird-cols-1 mb-12 grid gap-24 px-4 lg:grid-cols-2 xl:grid-cols-2">
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
              </div>
              <div className="px-4 pb-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  My Tickets
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  You have 3 tickets
                </Typography>
                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
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
                        {TABLE_ROWS.map(({ user, subject, message }, index) => {
                          const isLast = index === TABLE_ROWS.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={user}>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {user}
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
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {message}
                                </Typography>
                              </td>
                              <td
                                className={`${classes} bg-blue-gray-50/50`}
                              ></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
              <Card className="border bg-blue-gray-50 mx-3">
                <CardHeader color="blue-gray">
                  <Typography variant="h6" color="white" className="p-2">
                    Message
                  </Typography>
                </CardHeader>
                <CardBody>
                  <div className="flex gap-4 m-3">
                    <Input
                      type="text"
                      label="Name"
                      size="md"
                      placeholder="Type the subject"
                    />
                  </div>
                  <div className="flex gap-4 m-3">
                    <Input
                      type="text"
                      label="Subject"
                      size="md"
                      placeholder="Type the subject"
                    />
                  </div>
                  <div className="flex gap-4 m-3">
                    <Textarea label="Message" size="md" rows={6} />
                  </div>
                  <div className="flex gap-4 m-3">
                    <Button color="gray" size="regular">
                      Send
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-8">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-4">
                      <form>
                        <div className="flex gap-4 p-2">
                          <Input size="md" label="Name" name="name" />
                        </div>
                        <div className="flex gap-4 p-2">
                          <Input
                            type="email"
                            label="Email Address"
                            name="email"
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
                          />
                        </div>
                        <div className="flex gap-4 p-2">
                          <div
                            className="flex-grow"
                            style={{ flexBasis: "70%" }}
                          >
                            <Input type="file" size="md" label="Profile" />
                          </div>
                          <div
                            className="flex-grow"
                            style={{ flexBasis: "30%" }}
                          >
                            <Button
                              type="submit"
                              className="w-full flex items-center justify-center gap-2 "
                            >
                              {" "}
                              Edit Profile
                              <UserPlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
