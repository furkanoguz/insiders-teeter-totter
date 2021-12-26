import React, { FC } from "react";
import RandomObject, { IRandomObject } from "../random-object";
import "./index.css";

interface ITeeterTotter {
  bendingPercentage?: number;
  bendingSpeed?: number;
  rightBox: Omit<IRandomObject, "position">;
  leftBox: Omit<IRandomObject, "position">;
}

const TeeterTotter: FC<ITeeterTotter> = ({
  bendingPercentage = 0,
  bendingSpeed = 1000,
  rightBox,
  leftBox,
}) => {
  return (
    <div>
      <div
        style={{
          transform: `rotate(${bendingPercentage}deg)`,
          transition: `${bendingSpeed}ms`,
        }}
      >
        <div className="teeterWrapper">
          <div className="case leftCase">
            <RandomObject
              objectType={leftBox.objectType}
              weight={leftBox.weight}
              position="left"
              top={leftBox.top}
              distanceToCenter={leftBox.distanceToCenter}
            />
          </div>
          <div className="case rightCase">
            <RandomObject
              objectType={rightBox.objectType}
              weight={rightBox.weight}
              position="right"
              distanceToCenter={rightBox.distanceToCenter}
            />
          </div>
        </div>

        <div className="teeterTotterBoard" />
      </div>
      <div className="balanceTeeter" />
    </div>
  );
};

export default TeeterTotter;
