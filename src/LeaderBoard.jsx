import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { URL } from "./utils/constants";
import axios from "axios";

function LeaderBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState();
  const [Gamedata, setGameData] = useState([]);

  useEffect(() => {
    console.log(location.state.id, "GameId");
    getData();
  });

  const getData = async () => {
    try {
      const url = URL + `leaderboard/${location.state.id}`;
      const res = await axios.get(url);
      console.log(res.data.game, "GameData");
      setGameData(res.data.game);
    } catch (error) {
      console.log(error, "Error from leaderboard");
    }
  };

  return (
    <Main>
      <Heading>LeaderBoard</Heading>
      <SubHeading>Current Standings</SubHeading>
      <Table className="table wp-block-table table-hover container">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {Gamedata.map((item, index) => (
          
            <tr>
              <td scope="row">{index+1}</td>
              <td>{item.user.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
         
        </tbody>
      </Table>
      <ButtonContainer>
        <button onClick={() => navigate(-1)}>Back to Game</button>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </ButtonContainer>
    </Main>
  );
}

export default LeaderBoard;

// Styled Components
const Main = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h3`
  text-align: center;
  color: #343a40;
  margin-bottom: 10px;
`;

const SubHeading = styled.h6`
  text-align: center;
  color: #6c757d;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 60%;
  border-collapse: collapse;

  th,
  td {
    text-align: center;
    padding: 12px;
  }

  th {
    background-color: #343a40;
    color: #fff;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #e9ecef;
  }

  @media screen and (max-width: 440px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;
