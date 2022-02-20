import React from "react";
import { spline } from "@georgedoescode/spline";
import { Leva, useControls } from "leva";

import map from "./map";
import noise from "./noise";
import createPoints from "./createPoints";

import { allBackgrounds } from "./background-fills";
import randomItem from "./randomItem";

import "./App.css";

const availableImages = [...Object.keys(allBackgrounds)];
const randomBackgroundImage = () => randomItem(availableImages);

const App = () => {
  const [backgroundImage, setBackgroundImage] = React.useState(
    randomBackgroundImage()
  );
  const [noiseStep, setNoiseStep] = React.useState(0.01);
  const [pause, setPause] = React.useState(false);

  const controls = useControls(
    {
      pause: {
        label: "Pause Animation",
        value: false,
        onChange: (value) => setPause(value),
      },
      showPoints: { label: "Show Points", value: false },
      noiseStep: {
        label: 'Movement Speed',
        value: noiseStep * 1000,
        min: 1,
        max: 50,
        step: 0.5,
        onChange: (value) => {
          setNoiseStep(value / 10000);
        },
      },
      background: {
        value: backgroundImage,
        label: "Set Background Image",
        options: availableImages,
        onChange: (image) => {
          setBackgroundImage(image);
        },
      },
    },
    [noiseStep, backgroundImage]
  );

  const [points, setPoints] = React.useState(createPoints({ numPoints: 6 }));

  const [d, setD] = React.useState(spline(points, 1, true));

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  React.useEffect(() => {
    if (!pause) {
      const animate = (time) => {
        if (!controls.pause) {
          if (previousTimeRef.current !== undefined) {
            setD(spline(points, 1, true));

            // for every point...
            const update = points.map((p) => {
              const point = p;

              // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
              const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
              const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
              // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
              const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
              const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

              // update the point's current coordinates
              point.x = x;
              point.y = y;

              // progress the point's x, y values through "time"
              point.noiseOffsetX += noiseStep;
              point.noiseOffsetY += noiseStep;

              return point;
            });

            setPoints(update);
          }

          previousTimeRef.current = time;
          requestRef.current = requestAnimationFrame(animate);
        }
      };
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [noiseStep, pause, controls.pause, points]);

  return (
    <>
      <svg id="blob" viewBox="0 0 200 200" fille="transparent">
        <defs>
          <pattern
            id="image"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="200"
            width="200"
          >
            <image
              x="0"
              y="-50"
              href={allBackgrounds[backgroundImage]}
              width="300"
              height="300"
            />
          </pattern>
        </defs>
        <path d={d} fill="url(#image)"></path>
        {controls.showPoints &&
          points.map(({ x, y }, idx) => (
            <circle
              fill="white"
              stroke="black"
              strokeWidth="1px"
              key={`circle-${idx}`}
              cx={x}
              cy={y}
              r="2"
            />
          ))}
      </svg>
      <Leva oneLineLabels />
    </>
  );
};

export default App;
