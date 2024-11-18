import React,{useState} from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";  

function Register() {

    const [showPassword, setShowPassword] = useState(true);
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
      };
  return (
    <div className="main mt-5">
      <h1>Register For GameZone</h1>

      <MDBContainer className="card shadow loginForm container p-3 my-5 d-flex flex-column w-50 pt-5 ">
        <MDBInput
          wrapperClass="mb-4"
          label="Username"
          id="form1"
          type="email"
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
        />

        <div className="row">
          <MDBInput
          icon={'eye-slash'}
            wrapperClass="mb-4 col-6"
            label="Password"
            id="form2"
            type="password"
          />

    

          <MDBInput
            wrapperClass="mb-4 col-6"
            label="confirm Password"
            id="form2"
            type="password"
          />
        </div>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="#">Forgot password?</a>
        </div>

        <a href={"/home"}>
          <button className="mb-4 btn btn-primary">Register</button>
        </a>

        <div className="text-center">
          <p>
            Already have an account? <a href={"/login"}>Sign In</a>
          </p>
        </div>
      </MDBContainer>
    </div>
  );
}

export default Register;
