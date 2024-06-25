import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
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
        const newMessage = response.data;
        setEmail("");
        setSubject("");
        setMessage("");
        toast.success("Dein Message wurde erfolgreich abgesendet!", {
          autoClose: 3000,
        });
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.log(err);
      toast.error("Failed to send message.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-5xl font-semibold text-black mb-4">Contact us</h2>
          <p className="text-black mb-12">You can reach us by email.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Type your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-black">
                Betreff
              </label>
              <input
                type="text"
                id="subject"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Betreff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-black">
                Message
              </label>
              <textarea
                id="message"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                rows="6"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                SEND MESSAGE
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      <div
        className="w-1/2 bg-cover bg-right hidden md:block relative"
        style={{
          backgroundImage:
            "url(https://yassinautomotive.com/wp-content/uploads/2022/09/contactus-1.jpg)",
        }}
      ></div>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
