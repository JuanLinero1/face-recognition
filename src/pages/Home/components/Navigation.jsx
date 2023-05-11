import React, { useState } from "react";

const Navigation = (props) => {
  const [conditionLog, setConditionLog] = useState(false);
  const [conditionRegister, setConditionRegister] = useState(false);
  const [conditionOut, setConditionOut] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  const onSubmitEvent = async () => {
    const response = await fetch("https://face-recognition-node.onrender.com/signIn", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setConditionOut(true);
      setConditionLog(false);
    } else {  
      console.log("there was an error: " + response.status);
    }
    props.setUserInformation({userName: data.name, userEntries: data.entries})
    console.log(data.id)
    props.setUserId(data.id)
  };

  const onSubmitEventRegister = async () => {
    const response = await fetch("https://face-recognition-node.onrender.com/register", {
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
          props.setUserInformation({userName: "Guest", userEntries: 0})
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
