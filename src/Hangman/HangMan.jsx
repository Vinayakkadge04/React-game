import React, { useEffect, useState } from "react";
import { HangManData } from "../data";
import { keyboardData } from "../Data/keyboardBtn";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import NamePopUp from "../name_pop";
import "./hangman.css";
import { useSelector } from "react-redux";
import { URL } from "../utils/constants";
import axios from "axios";
import Layout from "../Layout";

function HangMan() {
  let navigate = useNavigate();
  const [wordArray, setWordArray] = useState([]);
  const [duplicateArray, setduplicateArray] = useState([]);
  const [error, seterror] = useState([]);
  const [lock, setlock] = useState(false);
  const [img, setimg] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [start, setStart] = useState(false);
  const [gameOver, setgameOver] = useState(false);
  let [score, setScore] = useState(0);
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(true);
  const [winner, setwinner] = useState();
  const { user, nameEntered, id } = useSelector((state) => state.user);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const handleClose = () => {
    navigate("/leaderboard", {
      state: {
        id: location.state.id,
      },
    });
    setShow();
  };

  const [image, setimage] = useState([
    "https://i.imgur.com/kReMv94.png",
    "https://i.imgur.com/UFP8RM4.png",
    "https://i.imgur.com/9McnEXg.png",
    "https://i.imgur.com/8UFWc9q.png",
    "https://i.imgur.com/rHCgIvU.png",
    "https://i.imgur.com/CtvIEMS.png",
    "https://i.imgur.com/Z2mPdX0.png",
  ]);

  useEffect(() => {
    setModalShow(!nameEntered);
  }, [nameEntered]);

  useEffect(() => {
    const random = Math.floor(Math.random() * HangManData.length);
    const myArray = (random, HangManData[random].word).toUpperCase().split("");
    setWordArray(myArray);
  }, []);

  useEffect(() => {
    setduplicateArray(Array(wordArray.length).fill(""));
  }, [wordArray]);

  // useEffect(() => {
  //   duplicateArray.forEach((item, index) => {
  //     if (
  //       !gameOver &&
  //       start &&
  //       JSON.stringify(wordArray) === JSON.stringify(duplicateArray)
  //     ) {
  //       console.log("Congratulations, You Win!");
  //       handleShow();
  //       InsertScore();
  //     }
  //   });
  // }, [duplicateArray]);

  useEffect(() => {
    if (
      !gameOver &&
      start &&
      JSON.stringify(wordArray) === JSON.stringify(duplicateArray) &&
      !scoreSubmitted
    ) {
      console.log("Congratulations, You Win!");
      handleShow();
      InsertScore();
      setScoreSubmitted(true);
    }
  }, [duplicateArray, wordArray, start, gameOver, scoreSubmitted]);

  useEffect(() => {
    setimg(image[error.length]);
  }, [error]);

  const InsertScore = async () => {
    console.log(
      "Hello",
      "score",
      score,
      "gameId",
      location.state,
      "userId",
      id
    );
    try {
      const url = URL + "leaderboard";
      const res = await axios({
        method: "post",
        url: url,
        data: {
          score: score,
          gameId: location.state.id,
          userId: id,
        },
      });
      if (res.data.status === "success") {
        console.log(res.data, "Data");
        navigate("/leaderboard", {
          state: {
            id: location.state.id,
          },
        });
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    console.log(location.state, "State");
  });

  const checkSimilarity = (value, e) => {
    if (lock) {
      return null;
    }

    if (wordArray.includes(value, e)) {
      setStart(true);
      e.target.innerHTML = "✔️";
      e.target.style.backgroundColor = "#39e75f";
      var testArray = [...duplicateArray];
      wordArray.forEach((item, index) => {
        if (item === value) {
          testArray[index] = value;
          setduplicateArray(testArray);
        }
        setScore(score + 5);
      });
    } else {
      e.target.innerHTML = "✖️";
      e.target.style.backgroundColor = "#ff474c";
      if (error.length === 5) {
        seterror([...error, ""]);
        setlock(true);
        console.log("You Lost!!!");
        InsertScore();
        setgameOver(true);
        setduplicateArray(wordArray);
      } else if (error.length < 6) {
        seterror([...error, ""]);
      }
    }
  };

  const reloadGame = () => {
    setWordArray([]);
    setduplicateArray([]);
    seterror([]);
    setlock(false);
    setimg(image[0]);
    setShow(false);
    setStart(false);
    setgameOver(false);
    setScore(0);
    setScoreSubmitted(false);

    const buttons = document.querySelectorAll(".key-button");

    const random = Math.floor(Math.random() * HangManData.length);
    const newWordArray = HangManData[random].word.toUpperCase().split("");
    setWordArray(newWordArray);
    setduplicateArray(Array(newWordArray.length).fill(""));
  };

  return (
    <Layout>
      {" "}
      <>
        <div className="cont row">
          <h1 id="title">Hangman</h1>
          <div className="col-md-3 col-sm-12 d-flex flex-column align-items-start justify-content-start">
            <h4>Welcome {user}!</h4>
            <h5>Lets guess the word🤔</h5>
            <h2>Score : {score}</h2>
            <img className="img" src={img} alt="" />
          </div>

          <div className="col-md-9 col-sm-12">
            <div className="hangmanViewScore">
              <button
                onClick={() => {
                  reloadGame();
                }}
                className="me-3 up"
              >
                Reload Game
              </button>

              <button
                onClick={() =>
                  navigate("/leaderboard", {
                    state: {
                      id: location.state.id,
                    },
                  })
                }
                className="up"
              >
                View Score
              </button>
            </div>
            <div className="content">
              <div className="word">
                {duplicateArray.map((e) => {
                  return <div className="sbox">{e}</div>;
                })}
              </div>

              <div className="keyboard">
                {keyboardData.map((row, rowIndex) => (
                  <div key={rowIndex} className="keyboard-row">
                    {row.map((button, index) => (
                      <button
                        onClick={(e) => {
                          checkSimilarity(button.key, e);
                        }}
                        key={button.id}
                        className="key-button"
                      >
                        {button.key}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="classbtn">
          <button className="reloadbtn" onClick={() => navigate(-1)}>
            Back to Home
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, You won the match!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        <NamePopUp show={modalShow} onHide={() => setModalShow(false)} />
      </>
    </Layout>
  );
}

export default HangMan;
