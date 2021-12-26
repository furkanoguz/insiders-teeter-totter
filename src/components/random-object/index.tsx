import React, { FC } from "react";
import "./index.css";

export enum EObjectTypes {
  RECTANGLE = "rectangle",
  TRIANGLE = "triangle",
  CIRCLE = "circle",
}

export interface IRandomObject {
  objectType: EObjectTypes;
  weight: number;
  position?: string;
  distanceToCenter: number;
  top?: number;
}

const RandomObject: FC<IRandomObject> = ({
  objectType,
  weight,
  distanceToCenter,
  position = "right",
  top = 0,
}) => {
  const factor = 2;
  const styles = {
    rectangle: {
      width: 70 + weight * factor,
      height: 100 + weight * factor,
    },
    circle: {
      width: 70 + weight * factor,
      height: 70 + weight * factor,
    },
    triangle: {
      borderLeftWidth: 50 + weight * factor,
      borderRightWidth: 50 + weight * factor,
      borderBottomWidth: 70 + weight * factor,
    },
  };

  const mr = distanceToCenter * 100 - 100;
  const marginByWeight = mr === 0 ? mr : mr - weight * factor * 2;

  return (
    <div
      className={`${objectType} box`}
      style={
        position === "right"
          ? { marginLeft: marginByWeight, ...styles[objectType] }
          : {
              marginRight: marginByWeight,
              position: "absolute",
              marginBottom: top,
              ...styles[objectType],
            }
      }
    >
      <span>{weight} kg</span>
    </div>
  );
};

export default RandomObject;
