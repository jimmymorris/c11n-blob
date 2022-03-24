const createPoints = ({ numberPoints = 6, radius = 80 }) => {
    const TWO_PI = Math.PI * 2;
    const points = [];

    // used to equally space each point around the circle
    const angleStep = TWO_PI / numberPoints;

    for (let i = 1; i <= numberPoints; i++) {
        // x & y coordinates of the current point
        const theta = i * angleStep;

        const x = 100 + Math.cos(theta) * radius;
        const y = 100 + Math.sin(theta) * radius;

        // store the point
        points.push({
            x: x,
            y: y,
            /* we need to keep a reference to the point's original {x, y} coordinates
      for when we modulate the values later */
            originX: x,
            originY: y,

            noiseOffsetX: 1000 * Math.random(),
            noiseOffsetY: 1000 * Math.random(),
        });
    }

    return points;
};

export default createPoints;
