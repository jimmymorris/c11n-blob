import Brand1 from "./hi-res/Brand1.png";
import Brand2 from "./hi-res/Brand2.png";
import Brand3 from "./hi-res/Brand3.png";
import Brand4 from "./hi-res/Brand4.png";
import Brand5 from "./hi-res/Brand5.png";
import Brand6 from "./hi-res/Brand6.png";
import Brand7 from "./hi-res/Brand7.png";
import Brand8 from "./hi-res/Brand8.png";
import Cool1 from "./hi-res/Cool1.png";
import Cool2 from "./hi-res/Cool2.png";
import Cool3 from "./hi-res/Cool3.png";
import Cool4 from "./hi-res/Cool4.png";
import Cool5 from "./hi-res/Cool5.png";
import Cool6 from "./hi-res/Cool6.png";
import Warm1 from "./hi-res/Warm1.png";
import Warm2 from "./hi-res/Warm2.png";
import Warm3 from "./hi-res/Warm3.png";
import Warm4 from "./hi-res/Warm4.png";
import Warm5 from "./hi-res/Warm5.png";
import Warm6 from "./hi-res/Warm6.png";

const brandBackgrounds = {
  Brand1,
  Brand2,
  Brand3,
  Brand4,
  Brand5,
  Brand6,
  Brand7,
  Brand8,
};

const coolBackgrounds = {
  Cool1,
  Cool2,
  Cool3,
  Cool4,
  Cool5,
  Cool6,
};

const warmBackgrounds = {
  Warm1,
  Warm2,
  Warm3,
  Warm4,
  Warm5,
  Warm6,
};

const ALL_BACKGROUNDS = {
  ...brandBackgrounds,
  ...coolBackgrounds,
  ...warmBackgrounds,
};

export { ALL_BACKGROUNDS, coolBackgrounds, warmBackgrounds, brandBackgrounds };
