import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would normally send the email to your backend for processing
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto mt-8 p-6 border-4 border-gray-300 my-2 ">
      <p className="text-2xl py-2 text-center">
        Immer über neuigkeiten Informiert sein!
      </p>
      {submitted ? (
        <p className="text-green-500">Danke für Ihre Anmeldung!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ihre Email Adresse"
            className="p-2 border border-gray-400 rounded w-64 mb-4"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Anmelden
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsLetter;
