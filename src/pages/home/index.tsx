import React, { FC, useEffect, useState } from "react";
import TeeterTotter from "../../components/teeter-totter";
import {
  DEFAULT_BENDING_PERCENTAGE,
  DEFAULT_BENDING_SPEED,
  DEFAULT_DROP_SPEED,
  DEFAULT_SCORE,
  DEFAULT_TOP_OFFSET,
  getRandomBoxes,
} from "../../helper";
import { getMeasure } from "../../helper/measure";
import "./index.css";

const randomBox = getRandomBoxes();
const HomePage: FC = () => {
  const [score, setScore] = useState(DEFAULT_SCORE);
  const [rightBox, setRightBox] = useState(randomBox.rightBox);
  const [leftBox, setLeftBox] = useState(randomBox.leftBox);
  const [bendingPercentage, setBendingPercentage] = useState(
    DEFAULT_BENDING_PERCENTAGE
  );
  const [bendingSpeed, setBendingSpeed] = useState(DEFAULT_BENDING_SPEED);
  const [topOffset, setTopOffset] = useState(DEFAULT_TOP_OFFSET);
  const [gameState, setGameState] = useState<"playing" | "paused" | "finished">(
    "playing"
  );
  const [dropSpeed, setDropSpeed] = useState(DEFAULT_DROP_SPEED);
  const [autoMode, setAutoMode] = useState(false);

  const goContinue = (point: number) => {
    setTopOffset(DEFAULT_TOP_OFFSET);
    setBendingPercentage(DEFAULT_BENDING_PERCENTAGE);
    setBendingSpeed(DEFAULT_BENDING_SPEED);
    const newRandomBox = getRandomBoxes();
    const newLeft = newRandomBox.leftBox;
    const newRight = newRandomBox.rightBox;
    setScore(score + point);
    setLeftBox(newLeft);
    setRightBox(newRight);
    dropSpeed > 100 && setDropSpeed(dropSpeed - 10);
  };

  const gameOver = () => {
    setGameState("finished");
  };

  const selfCalculate = () => {
    const rightTotal = rightBox.weight * rightBox.distanceToCenter;
    const newDistance = rightTotal / leftBox.weight;
    setLeftBox({
      ...leftBox,
      distanceToCenter: newDistance,
    });
  };

  useEffect(() => {
    if (gameState !== "paused") {
      const interval = setInterval(() => {
        topOffset !== 0 && setTopOffset(topOffset - 10);
        topOffset > 20 && topOffset < 200 && autoMode && selfCalculate();
      }, dropSpeed);

      if (topOffset === 0) {
        const leftTotal = leftBox.weight * leftBox.distanceToCenter;
        const rightTotal = rightBox.weight * rightBox.distanceToCenter;
        const { bendingPercentage, bendingSpeed, earnedPoint } = getMeasure(
          leftTotal,
          rightTotal
        );

        if (earnedPoint !== 0) goContinue(earnedPoint);
        else gameOver();

        setBendingSpeed(bendingSpeed);
        setBendingPercentage(bendingPercentage);
      }

      return () => window.clearInterval(interval);
    }
  }, [topOffset, gameState]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    setGameState((currentGameState) => {
      if (currentGameState !== "paused") {
        const key = event.code;

        setLeftBox((prevLeft) => {
          let newDistance = prevLeft.distanceToCenter;

          if (key === "ArrowLeft" && prevLeft.distanceToCenter < 5)
            ++newDistance;
          else if (key === "ArrowRight" && prevLeft.distanceToCenter > 1)
            --newDistance;

          return {
            ...prevLeft,
            distanceToCenter: newDistance,
          };
        });
      }
      return currentGameState;
    });
  };

  const playPause = () =>
    setGameState(gameState === "paused" ? "playing" : "paused");

  const playAgain = () => {
    const newBoxes = getRandomBoxes();
    setScore(DEFAULT_SCORE);
    setDropSpeed(DEFAULT_DROP_SPEED);
    setBendingSpeed(DEFAULT_BENDING_SPEED);
    setBendingPercentage(DEFAULT_BENDING_PERCENTAGE);
    setTopOffset(DEFAULT_TOP_OFFSET);
    setGameState("playing");
    setRightBox(newBoxes.rightBox);
    setLeftBox(newBoxes.leftBox);
  };

  return (
    <div>
      <div className="infoArea">
        <h2>State:{gameState}</h2>
        <h2>Point:{score}</h2>
        <span>RightWeight:{rightBox.weight}</span> <br />
        <span>RightDistance:{rightBox.distanceToCenter}</span> <br />
        <span>LeftWeight:{leftBox.weight}</span> <br />
        <span>LeftDistance:{leftBox.distanceToCenter}</span> <br />
        <span>Drop Speed:{dropSpeed}</span> <br />
      </div>

      <TeeterTotter
        bendingPercentage={bendingPercentage}
        bendingSpeed={bendingSpeed}
        rightBox={rightBox}
        leftBox={{ ...leftBox, top: topOffset }}
      />
      <div className="controlButtons">
        {gameState === "paused" || gameState === "playing" ? (
          <button className="controlButton stop" onClick={playPause}>
            {gameState === "playing" ? "Stop" : "Continue"}
          </button>
        ) : null}

        <button
          className="controlButton autoMode"
          onClick={() => setAutoMode(!autoMode)}
        >
          {autoMode ? "Manuel Mode" : "Auto Mode"}
        </button>
        {gameState === "finished" ? (
          <button className="controlButton" onClick={playAgain}>
            Play Again
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
