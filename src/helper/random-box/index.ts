import { EObjectTypes } from "../../components/random-object";

export const getBetweenRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomObjectType = () => {
  let objectType;
  const boxRandom = getBetweenRandom(1, 3);
  switch (boxRandom) {
    case 1:
      objectType = EObjectTypes.RECTANGLE;
      break;
    case 2:
      objectType = objectType = EObjectTypes.TRIANGLE;

      break;
    default:
      objectType = EObjectTypes.CIRCLE;
      break;
  }
  return objectType;
};

export const getRandomBoxes = () => {
  let leftWeight = 0,
    leftDistanceToCenter = 0,
    rightWeight = 0,
    rightDistanceToCenter = 0;

  while (
    leftWeight * leftDistanceToCenter !== rightWeight * rightDistanceToCenter ||
    leftWeight === rightWeight
  ) {
    leftWeight = getBetweenRandom(1, 10);
    leftDistanceToCenter = getBetweenRandom(1, 5);

    rightWeight = getBetweenRandom(1, 10);
    rightDistanceToCenter = getBetweenRandom(1, 5);
  }
  const randomLeftDistance = getBetweenRandom(1, 5);

  const result = {
    leftBox: {
      weight: leftWeight,
      distanceToCenter: randomLeftDistance,
      objectType: getRandomObjectType(),
    },
    rightBox: {
      weight: rightWeight,
      distanceToCenter: rightDistanceToCenter,
      objectType: getRandomObjectType(),
    },
  };

  return result;
};
