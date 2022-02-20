import Brand1 from "./Brand1.jpg";
import Brand2 from "./Brand2.jpg";
import Brand3 from "./Brand3.jpg";
import Brand4 from "./Brand4.jpg";
import Brand5 from "./Brand5.jpg";
import Brand6 from "./Brand6.jpg";
import Brand7 from "./Brand7.jpg";
import Brand8 from "./Brand8.jpg";
import Cool1 from "./Cool1.jpg";
import Cool2 from "./Cool2.jpg";
import Cool3 from "./Cool3.jpg";
import Cool4 from "./Cool4.jpg";
import Cool5 from "./Cool5.jpg";
import Cool6 from "./Cool6.jpg";
import Warm1 from "./Warm1.jpg";
import Warm2 from "./Warm2.jpg";
import Warm3 from "./Warm3.jpg";
import Warm4 from "./Warm4.jpg";
import Warm5 from "./Warm5.jpg";
import Warm6 from "./Warm6.jpg";

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

const allBackgrounds = {
  ...brandBackgrounds,
  ...coolBackgrounds,
  ...warmBackgrounds,
};

export { allBackgrounds, coolBackgrounds, warmBackgrounds, brandBackgrounds };
