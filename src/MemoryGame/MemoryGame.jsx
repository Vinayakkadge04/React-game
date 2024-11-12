import React, { useState, useEffect } from "react";

import { emojiData } from "../Data/emojidata";
import win from "../images/win.png";
import "./memorygame.css";
import PopUpModel from "./PopUp";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MemoryGame() {
  let navigate= useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  let [emojiNewArray, setemojiNewArray] = useState([]);

// taken code from Google

  function printArray(arr) {
    let ans = "";
    for (let i = 0; i < arr.length; i++) {
      ans += arr[i] + " ";
    }
    setemojiNewArray(arr);
  }
  function randomize(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  useEffect(() => {
    randomize(emojiData);
    printArray(emojiData);
  }, [emojiData]);

  let [myArray, setmyArray] = useState([]);
  let [newArray, setnewArray] = useState([]);
  var [score, setScore] = useState(0);

  const getId = (id) => {
    console.log(id);
    if (myArray.length < 2) {
      setmyArray((item) => [...item, id]);
    }
  };

  useEffect(() => {
    if (myArray.length === 2) {
      const ImgId1 = emojiData.find((item1) => item1.id === myArray[0]);
      const ImgId2 = emojiData.find((item1) => item1.id === myArray[1]);

      if (ImgId1.imgID === ImgId2.imgID) {
        console.log("both are same");
        setnewArray((newArray) => [...newArray, ImgId1.imgID]);
        setmyArray([]);
        setScore(score + 10);
      } else {
        console.log("Both are different...");
        setTimeout(() => {
          console.log("in");

          setmyArray([]);
        }, 300);
        setScore(score - 5);
      }
    }
  }, [myArray]);

  return (
    <>
      <div id="main">
        <h1 className="title">Lets Play🥳</h1>

        <div className="sct2">
          <div className="d-flex w-100 justify-content-between">
            <h2 style={{ paddingLeft: 84 }}>Score : {score}</h2>
            <Button style={{marginRight:84}} variant="primary mb-2" onClick={() => setModalShow(true)}>
              Find Rules
            </Button>
          </div>

          {newArray.length === emojiData.length / 2 ? (
            <>
              <div className="winnig">
                <h1>You Won!!!</h1>
                <img src={win} />
              </div>
            </>
          ) : null}
        </div>
        <div className="gridView">
          {emojiNewArray.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() => {
                    getId(item.id);
                  }}
                  className="imgbox"
                >
                  <div className="imgbg">
                    {/* <img className="img" src={item.img} /> */}
                    <p style={{ fontSize: 34 }}>{item.emoji}</p>
                    <div
                      style={{
                        opacity:
                          newArray.includes(item.imgID) ||
                          myArray.includes(item.id)
                            ? "0"
                            : "1",
                      }}
                      className="cover"
                    ></div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <button className="reloadbtn" onClick={()=>window.location.reload()}>
          Restart
        </button>

        <button className="reloadbtn" onClick={()=>navigate(-1)}>
          Back to Home
        </button>
      </div>

      <PopUpModel show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default MemoryGame;
