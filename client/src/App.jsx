import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Input from "./component/Input";

function App() {
  const [score, setScore] = useState({});
  const [scores, setAllScores] = useState([]);

  const socket = io("localhost:3000");

  function connectSocket() {
    socket.on("connection", () => {
      console.log("Connected to server");
    });
  }
  function handleInput(event) {
    let { name, value } = event.target;

    let currentObject = { [name]: value };

    setScore((prev) => ({ ...prev, ...currentObject }));
  }

  function sendScore() {
    socket.emit("scores", score);

    socket.on("playerScores", (playerScores) => {
      console.log("Player scores:", playerScores);
      setAllScores(playerScores);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>

      <Input name="name" placeholder="Enter name" handleInput={handleInput} />
      <Input name="score" placeholder="Enter score" handleInput={handleInput} />

      <button className="send-scores" onClick={sendScore}>
        Publish Score
      </button>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {scores.map((score) => (
            <tr>
              <th>{score?.name}</th>
              <th>{score?.score}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
