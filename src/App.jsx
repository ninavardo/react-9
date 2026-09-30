import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        if (value === "") {
          return "Email must not be empty";
        }
        if (!value.includes("@")) {
          return "Email is invalid. '@' is missing!";
        }
        return "";
      case "password":
        if (value === "") {
          return "Password must not be empty";
        }
        if (value.length < 8) {
          return "Invalid password. Minimum 8 symbols required.";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
      const emailErr = validateInput("email", value);
      setEmailError(emailErr);
    }

    if (name === "password") {
      setPassword(value);
      const passwordErr = validateInput("password", value);
      setPasswordError(passwordErr);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailErr = validateInput("email", email);
    const passwordErr = validateInput("password", password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    console.log("info sent", { email, password });

    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  const isBtnDisabled =
    emailError !== "" ||
    passwordError !== "" ||
    email === "" ||
    password === "";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-80 w-100 mx-auto p-4 rounded-md bg-white border-1 border-gray-300"
      >
        <h1 className="text-xl text-center">Registration</h1>
        <input
          type="email"
          placeholder="Enter email..."
          value={email}
          name="email"
          onChange={handleChange}
          className="w-full bg-white border-1 border-gray-600 p-4 rounded-md my-4"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <input
          type="password"
          placeholder="Enter password..."
          value={password}
          name="password"
          onChange={handleChange}
          className="w-full bg-white border-1 border-gray-600 p-4 rounded-md my-4"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <button
          disabled={isBtnDisabled}
          type="submit"
          className={`mt-5 rounded-md w-full text-center p-4 ${
            isBtnDisabled
              ? "bg-[#888] cursor-not-allowed"
              : "bg-[lightgreen] cursor-pointer"
          }`}
        >
          Send
        </button>
      </form>
    </>
  );
}

export default App;
