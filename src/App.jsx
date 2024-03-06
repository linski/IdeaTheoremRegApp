import { useState, useRef } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage.jsx";
import BdaySelect from "./components/BdaySelect.jsx";
import BmonthSelect from "./components/BmonthSelect.jsx";
import ByearSelect from "./components/ByearSelect.jsx";
import RegistrationResult from "./components/RegistrationResult.jsx";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
const validatePhone = (phone) => {

  const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  const digits = phone.replace(/\D/g, "");
  return phoneRe.test(digits);
}
const validatePass = (pass) => {

  const passRe = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return passRe.test(pass);
}
const validateName = (name) => {

  const nameRe = /^[a-zA-Z\d\-_\s]+$/
  return nameRe.test(name);
}

function App() {

  const dialog = useRef();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bday,   setBday] = useState("");
  const [bmonth, setBmonth] = useState("");
  const [byear,  setByear] = useState("");
  const [password, setPassword] = useState("");
  const [registrationResponse, setRegistrationResponse] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  
  const getIsFormValid = () => {

    return (
      //bday && bmonth && byear &&
      validateName(fullName) &&
      validateEmail(email) &&
      validatePhone(phone) &&
      validatePass(password) &&
      password === confPassword
    );
  };

  function clearForm() {

    setFullName("");
    setPhone("");
    setEmail("");
    setBday("");
    setBmonth("");
    setByear("");
    setPassword("");
    setConfPassword("");
    setErrorShow(false);
  }

  function sendFetch() {
     
    const form_data = {
        'full_name': fullName,
        'contact_number': phone,
        'email': email,
        'date_of_birth': (bmonth && bday && byear ? (bmonth + " " + bday + ", " + byear) : null),
        'password': password
    };

    fetch("https://fullstack-test-navy.vercel.app/api/users/create",
    {
        method: "POST",
        body: JSON.stringify(form_data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        setRegistrationResponse(res);
        dialog.current.showModal();
    });
  }
    
  const handleSubmit = (e) => {

    e.preventDefault();
    const err = getIsFormValid();
    
    if ( !err )
        setErrorShow(true);
    else {
        console.log("Form submitted");
        sendFetch();
    }
  };

  return (
    <>
    <RegistrationResult ref={dialog} result={registrationResponse} />
    <div className="register-header">
        <h2>Create User Account</h2>
    </div>
    <div className="register-acc">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="input-field">
            <label>
              Full name <sup>*</sup>
            </label>
            <input
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              placeholder="Full name"
            />
            { errorShow && (!fullName ? <ErrorMessage type="empty" /> : null) }
          </div>
          <div className="input-field">
            <label>
              Contact Number <sup>*</sup>
            </label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Contact Number"
            />
            { errorShow && (!password ? <ErrorMessage type="empty" /> : (!validatePhone(phone) ? <ErrorMessage type="phone" /> : null)) }
          </div>
          <div className="input-field">
            <label>
              Birthday <sup>*</sup>
            </label>
            <div className="bday-container">
                <div className="bday-box">
                    <BdaySelect value={bday} onSelectChange={setBday} />
                    {/* { errorShow && (!bday ? <ErrorMessage type="bday" /> : null) } */}
                </div>
                <div className="bday-box">
                    <BmonthSelect value={bmonth} onSelectChange={setBmonth} />
                    {/* { errorShow && (!bmonth ? <ErrorMessage type="bmonth" /> : null) } */}
                </div>
                <div className="bday-box">
                    <ByearSelect value={byear} onSelectChange={setByear} />
                    {/* { errorShow && (!byear ? <ErrorMessage type="byear" /> : null) } */}
                </div>
            </div>
          </div>
          <div className="input-field">
            <label>
              Email Address <sup>*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
            />
            { errorShow && (!email ? <ErrorMessage type="empty" /> : (!validateEmail(email) ? <ErrorMessage type="email" /> : null)) }
          </div>
          <div className="input-field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            { errorShow && (!password ? <ErrorMessage type="empty" /> : (!validatePass(password) ? <ErrorMessage type="password" /> : null)) }
          </div>
          <div className="input-field">
            <label>
              Confirm Password <sup>*</sup>
            </label>
            <input
              value={confPassword}
              type="password"
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            { errorShow && (!confPassword ? <ErrorMessage type="empty" /> : (password !== confPassword ? <ErrorMessage type="conf_password" /> : null)) }
          </div>
          <div className="bday-container">
            <div className="lay-cancel">
                <button type="button" className="form-cancel" onClick={clearForm}>
                    Cancel
                </button>
            </div>
            <div className="lay-submit">
                <button type="submit" className="form-submit" >
                    Submit
                </button>
            </div>    
          </div>
        </fieldset>
      </form>
    </div>
    </>
  );
}

export default App;
