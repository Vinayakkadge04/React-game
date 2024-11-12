// import React,{useState} from "react";
// import "./memorygame.css";

// function PopUp() {
//   const [popUp , setpopUp] = useState(true);
//   return (
//     <>
//       <div className="popupmain">
//         <div className="pop-up">
//           1. The goal is to match all pairs of cards by remembering their positions.  <br />
//           2. A grid of cards is displayed face-down. Each card has a matching pair. <br />
//           3. The player taps two cards per turn. If the two cards match, they remain face-up; if not, they flip back over. <br />
//           4. Players can only flip two cards at a time. They should try to memorize the cards' positions after each flip. <br />
//           5. When a player finds a match, the cards stay visible. <br />
//           6. The game ends when all pairs are matched. The player wins when all cards are face-up. <br />
//           7. Fewer turns or faster time may result in a higher score, depending on the scoring system. <br />

//           <button className="popUp_btn">Ok</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PopUp;

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function PopUpModel(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Game Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          1 . The goal is to match all pairs of cards by remembering their
          positions. <br />
          2. A grid of cards is displayed face-down. Each card
          has a matching pair. <br /> 3. The player taps two cards per turn.
          If the two cards match, they remain <br /> 4. if not, they flip back
          over. <br /> 5. Players can only flip two cards at a time. They should
          try to memorize the cards' positions after each flip. <br /> 6. Matching Pairs:
          When a player finds a match, the cards stay visible. <br /> 7. The
          game ends when all pairs are matched. The player wins when all cards
          are face-up. <br /> 8. Fewer turns or faster time may result in a
          higher score, depending on the scoring system. <br /> 9. You can add
          multiple levels with increasing difficulty, like more cards or shorter
          time limits.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
