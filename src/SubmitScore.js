import React from "react";
import axios from "axios";

function SubmitScore() {
  return axios({
    method: "post",
    url: "/user/12345",
    data: { id: 111, studentName: "param", age: 24, emailId: 2 },
  });
}

export default SubmitScore;
