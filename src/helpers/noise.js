import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise(0);

const noise = (x, y) => {
    // return a value at {x point in time} {y point in time}
    return simplex.noise2D(x, y);
};

export default noise;
