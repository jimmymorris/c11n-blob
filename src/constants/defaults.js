import { randomBackgroundImage, randomTeamMember } from '../helpers/random';

export const DEFAULTS = {
    BACKGROUND_COLOR: 'White',
    BACKGROUND_IMAGE: randomBackgroundImage(),
    BLOB_FLEXIBILITY: 20,
    AVATAR: randomTeamMember(),
    SHOW_AVATAR: false,
    NOISE_STEP: 0.02,
    LOOP_LENGTH: 5,
    NUMBER_POINTS: 8,
}

export const TWO_PI = Math.PI * 2;