const createPoints = ({ numPoints = 6 }) => {
  const points = [];
  // how many points do we need
  const numberPoints = numPoints;
  // used to equally space each point around the circle
  const angleStep = (Math.PI * 2) / numberPoints;
  // the radius of the circle
  const rad = 75;

  for (let i = 1; i <= numberPoints; i++) {
    // x & y coordinates of the current point
    const theta = i * angleStep;

    const x = 100 + Math.cos(theta) * rad;
    const y = 100 + Math.sin(theta) * rad;

    // store the point
    points.push({
      x: x,
      y: y,
      /* we need to keep a reference to the point's original {x, y} coordinates
      for when we modulate the values later */
      originX: x,
      originY: y,
      // more on this in a moment!
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    });
  }

  return points;
};

export default createPoints;
