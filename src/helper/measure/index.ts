export const getMeasure = (leftTotal: number, rightTotal: number) => {
  const casesDifference = rightTotal - leftTotal;
  const absDifference = Math.abs(casesDifference);
  const percentageDifference = (casesDifference / leftTotal) * 100;
  const bendingPercentage = casesDifference / 2;
  const bendingSpeed = 1000 - absDifference * 10;
  let earnedPoint = 0;

  if (leftTotal === rightTotal) earnedPoint = 100;
  else if (absDifference > 20) earnedPoint = 0;
  else if (Math.abs(percentageDifference) < 30) earnedPoint = 50;
  else earnedPoint = 0;

  console.log("Sarkma Oranı", Math.abs(percentageDifference));
  console.log("Sarkma Hızı", Math.abs(bendingSpeed));
  console.log("KGM Farkı", Math.abs(absDifference));
  console.log("Kazanılan Puan", earnedPoint);
  return {
    casesDifference,
    absDifference,
    percentageDifference,
    bendingPercentage,
    bendingSpeed,
    earnedPoint,
  };
};
