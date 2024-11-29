import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import { URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";

function HomePage() {
  const [game, setGame] = useState(null);
  const navigate = useNavigate()
  
  React.useEffect(() => {
    const getGame = async () => {
      try {
        const response = await axios.get(URL + "game");
        setGame(response.data.game);
        console.log(response.data.game);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getGame();
  }, []);

  return (
   <Layout>
     <div>
      <div className="homeBanner"></div>
      {game ? (
        <div className="imgGrid">
          {game.map((item, index) => (
            <div
              className="imgDiv"
              key={index}
            >
                <img
                onClick={() => navigate(item.url, {
                  state : {
                    id: item.id
                  }
                })}
                  className="gameImg"
                  src={URL + item.image}
                  alt={item.game_name}
                />
            </div>
          ))}
        </div>
      ) : (
        <p>Game Loading....</p>
      )}

      {/* <div className="imgGrid">
         <div className="imgDiv">
          <a href={"/tictactoe"}>
            {" "}
            <img className="gameImg" src={tictactoe} alt="" />
          </a>
        </div>
 


        
        <div className="imgDiv">
          <a href={"/memory"}>
            <img className="gameImg" src={memory} alt="" />
          </a>
        </div>
        <div className="imgDiv">
          <a href={"/hangman"}>
            {" "}
            <img className="gameImg" src={hangman} alt="" />
          </a>
        </div>
        <div className="imgDiv">
          <a href={"/candycrush"}>
            <img className="gameImg" src={candycrush} alt="" />
          </a>
        </div>
        <div className="imgDiv">
          <a href={"/flapybird"}>
            <img className="gameImg" src={flappy} alt="" />
          </a>
        </div>
        <div className="imgDiv">
          <a href={"/rps"}>
            <img className="gameImg" src={rps} alt="" />
          </a>
        </div>
        <div className="imgDiv">
          <a href={"/snake"}>
            <img className="gameImg" src={snake} alt="" />
          </a>
        </div>

        <div className="imgDiv">
          <a href={"/breakout"}>
            <img className="gameImg" src={block} alt="" />
          </a>
        </div>
        </div> */}
    </div>
   </Layout>
  );
}

export default HomePage;
