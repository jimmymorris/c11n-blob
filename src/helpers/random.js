import { ALL_BACKGROUNDS } from '../constants/background-fills';
import { TEAM_AVATARS } from '../constants/team-avatars';

const AVAILABLE_IMAGES = [...Object.keys(ALL_BACKGROUNDS)];
const THE_TEAM = [...Object.keys(TEAM_AVATARS)];

const randomItem = arr => arr[(Math.random() * arr.length) | 0];


const randomBackgroundImage = () => randomItem(AVAILABLE_IMAGES);
const randomTeamMember = () => randomItem(THE_TEAM);

export { THE_TEAM, AVAILABLE_IMAGES, randomItem, randomBackgroundImage, randomTeamMember };
