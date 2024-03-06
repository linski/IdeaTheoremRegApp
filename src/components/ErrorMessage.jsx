const ERROR_MESSAGE = {
    empty: "This field cannot be empty",
    fullname: "Name must not contain symbols",
    email: "Bad email format",
    bday: "Please choose a day",
    bmonth: "Please choose a month",
    byear: "Please choose a year",
    password: "Password must contain lower case, upper case, numbers, and be at least 8 characters long",
    conf_password: "Must be the same as the password field",
    };

function ErrorMessage ({type}) {

    return (
        <p className="pass-error">{ERROR_MESSAGE[type]}</p>
      );
}
export default ErrorMessage;