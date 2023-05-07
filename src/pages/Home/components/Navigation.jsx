import React, { useEffect, useState } from "react";

const Navigation = (props) => {
  const [conditionLog, setConditionLog] = useState(false);
  const [conditionRegister, setConditionRegister] = useState(false);
  const [conditionOut, setConditionOut] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  const fetchInformation = async (id) => {
    const response = await fetch(`http://localhost:4000/profile:${id}`);
    const data = await response.json();
    console.log(data)

    return props.setUserInformation({userName: data.serverResponse.userName, userEntries: data.serverResponse.userEntries})
  }

  const onSubmitEvent = async () => {
    const response = await fetch("http://localhost:4000/signIn", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await response.json();
    if (response.statusText == "OK") {
      setConditionOut(true);
      setConditionLog(false);
    } else {  
      console.log("there was an error: " + response.statusText);
    }
    console.log(data)
    props.setUserInformation({userID: data.serverResponse.id})
    fetchInformation(data.serverResponse.id)
  };

  const onSubmitEventRegister = async () => {
    const response = await fetch("http://localhost:4000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: userEmail,
        userPassword: userPassword,
        userName: userName,
      }),
    });
    if (response.statusText == "OK") {
      setConditionRegister(false);
    } else {
      console.log("there was an error: " + response.statusText);
    }
  };

  return (
    <div className="navigation">
      <h3
        className={`navigation-title ${!conditionOut ? "active" : "inactive"}`}
        onClick={() => {
          setConditionLog(true);
        }}
      >
        Sign In
      </h3>
      <h3
        className={`navigation-title ${conditionOut ? "active" : "inactive"}`}
        onClick={() => {
          setConditionOut(false);
        }}
      >
        Sign Out
      </h3>

      <form
        className={`navigation__form ${conditionLog ? "active" : "inactive"}`}
      >
        <div onClick={() => setConditionLog(false)}>X</div>
        <label htmlFor="email">email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="Add an email"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          required
          placeholder="Add a password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmitEvent();
          }}
        >
          Submit
        </button>
        <aside
          onClick={(e) => {
            e.preventDefault();
            setConditionLog(false);
            setConditionRegister(true);
          }}
        >
          Register
        </aside>
      </form>
      <form
        className={`navigation__form ${
          conditionRegister ? "active register" : "inactive"
        }`}
      >
        <div onClick={() => setConditionRegister(false)}>X</div>

        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="Add a name"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="email">email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="Add an email"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          required
          placeholder="Add a password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmitEventRegister();
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Navigation;