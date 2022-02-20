const randomItem = (arr) => arr[(Math.random() * arr.length) | 0];

export default randomItem;