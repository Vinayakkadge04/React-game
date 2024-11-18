import React from "react";
import styled from "styled-components";
function LeaderBoard() {
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
            <tr>
              <td scope="row">1</td>
              <td>Amen</td>
              <td>100</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Annand</td>
              <td>68</td>
            </tr>
          </tbody>
        </Table>
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
    height:100vh
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
      @media screen and (max-width:440px){
      width:100%
      }
  `;