import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

function Login() {
  return (
    <div className="main mt-5">
      <h2>Login For Game-Zone</h2>
      
      <MDBContainer className="card shadow loginForm container p-3 my-5 d-flex flex-column w-50 pt-5 ">
        
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
      />
      
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
      />

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
        <button className="mb-4 btn btn-primary">Sign In</button>
      </a>

      <div className="text-center">
        <p>
          Not a member? <a href={'/register'}>Register</a>
        </p>
      </div>
    </MDBContainer>
    </div>
  );
}

export default Login;
