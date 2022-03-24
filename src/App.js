import React from 'react';
import { spline } from '@georgedoescode/spline';
import { Leva, useControls } from 'leva';

import map from './helpers/map';
import noise from './helpers/noise';
import createPoints from './helpers/createPoints';
import { THE_TEAM, AVAILABLE_IMAGES } from './helpers/random';

import { DEFAULTS, TWO_PI } from './constants/defaults';
import { BACKGROUND_COLORS } from './constants/backgroundColors';

import { ALL_BACKGROUNDS } from './constants/background-fills';
import { TEAM_AVATARS } from './constants/team-avatars';

import './tokens.css';
import './App.css';

const App = () => {
    const [backgroundColor, setBackgroundColor] = React.useState(DEFAULTS.BACKGROUND_COLOR);
    const [backgroundImage, setBackgroundImage] = React.useState(DEFAULTS.BACKGROUND_IMAGE);
    const [blobFlexibility, setBlobFlexibility] = React.useState(DEFAULTS.BLOB_FLEXIBILITY);
    const [avatar, setAvatar] = React.useState(DEFAULTS.AVATAR);
    const [showAvatar, setShowAvatar] = React.useState(DEFAULTS.SHOW_AVATAR);
    const [noiseStep, setNoiseStep] = React.useState(DEFAULTS.NOISE_STEP);
    const [loopLength, setLoopLength] = React.useState(DEFAULTS.LOOP_LENGTH); // seconds
    const [numberPoints, setNumberPoints] = React.useState(DEFAULTS.NUMBER_POINTS);

    const [backgroundPoints, setBackgroundPoints] = React.useState(
        createPoints({ numberPoints: DEFAULTS.NUMBER_POINTS })
    );

    const [backgroundD, setBackgroundD] = React.useState(spline(backgroundPoints, 1, true));

    const [progress, setProgress] = React.useState(0);
    const [frameCount, setFrameCount] = React.useState(0);

    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();

    const controls = useControls(
        {
            background: {
                value: backgroundImage,
                label: 'Set Fill Image',
                options: AVAILABLE_IMAGES,
                onChange: image => {
                    setBackgroundImage(image);
                },
            },
            backgroundColor: {
                label: 'Set Background Color',
                options: Object.keys(BACKGROUND_COLORS),
                value: backgroundColor,
                onChange: value => {
                    setBackgroundColor(value);
                },
            },
            avatar: {
                value: avatar,
                label: 'Set Teammate Image',
                options: THE_TEAM,
                onChange: image => {
                    setAvatar(image);
                },
            },
            showAvatar: {
                label: 'Show Avatar',
                value: false,
                onChange: value => setShowAvatar(value),
            },
            pause: {
                label: 'Pause Animation',
                value: false,
            },
            numberPoints: {
                label: 'Number of Points',
                value: numberPoints,
                min: 3,
                max: 9,
                step: 1,
                onChange: value => {
                    setNumberPoints(value);
                },
            },
            loopLength: {
                label: 'Loop Length (seconds)',
                value: loopLength,
                onChange: value => {
                    setLoopLength(value);
                },
            },
            noiseStep: {
                label: 'Movement Speed',
                value: noiseStep * 1000,
                min: 1,
                max: 40,
                step: 0.25,
                onChange: value => {
                    setNoiseStep(value / 10000);
                },
            },
            blobFlex: {
                label: 'Blob Flexibility',
                value: blobFlexibility,
                min: 10,
                max: 30,
                step: 1,
                onChange: value => {
                    setBlobFlexibility(value);
                },
            },
            showPoints: { label: 'Show Points', value: false },
            showStats: { label: 'Show Stats', value: false },
        },
        [noiseStep, backgroundImage, avatar, showAvatar]
    );

    React.useEffect(() => {
        setBackgroundPoints(createPoints({ numberPoints }));
    }, [numberPoints]);

    React.useEffect(() => {
        const fps = 60; // frames per second
        const frameTotal = loopLength * fps;

        const animate = time => {
            if (previousTimeRef.current !== undefined) {
                setProgress(frameCount / frameTotal);
                setBackgroundD(spline(backgroundPoints, 1, true));

                // for every point...
                const update = backgroundPoints.map(p => {
                    const point = p;
                    const theta = progress * TWO_PI;
                    // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
                    const nX = noise(
                        point.noiseOffsetX * noiseStep,
                        point.noiseOffsetX * noiseStep
                    );
                    const nY = noise(
                        point.noiseOffsetY * noiseStep,
                        point.noiseOffsetY * noiseStep
                    );
                    // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
                    const x = map(
                        nX,
                        -1,
                        1,
                        point.originX - parseInt(blobFlexibility),
                        point.originX + parseInt(blobFlexibility)
                    );
                    const y = map(
                        nY,
                        -1,
                        1,
                        point.originY - parseInt(blobFlexibility),
                        point.originY + parseInt(blobFlexibility)
                    );

                    // update the point's current coordinates
                    point.x = x;
                    point.y = y;

                    // progress the point's x, y values through "time"
                    point.noiseOffsetX += Math.cos(theta) + noiseStep;
                    point.noiseOffsetY += Math.sin(theta) + noiseStep;

                    return point;
                });

                setBackgroundPoints(update);
                if (frameCount < frameTotal) {
                    setFrameCount(frameCount + 1);
                } else {
                    setFrameCount(0);
                }
            }

            previousTimeRef.current = time;
            // requestRef.current = requestAnimationFrame(animate);
        };

        if (!controls.pause) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [
        backgroundPoints,
        blobFlexibility,
        controls.pause,
        frameCount,
        loopLength,
        noiseStep,
        progress,
    ]);

    return (
        <div
            className="wrapper"
            style={{ backgroundColor: `var(${BACKGROUND_COLORS[backgroundColor]})` }}
        >
            <svg id="blob" viewBox="0 0 200 200" fill="transparent">
                <defs>
                    <pattern
                        id="backgroundImage"
                        x="0"
                        y="0"
                        patternUnits="userSpaceOnUse"
                        height="300"
                        width="300"
                    >
                        <image
                            x="0"
                            y="-50"
                            href={ALL_BACKGROUNDS[backgroundImage]}
                            width="300"
                            height="300"
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </pattern>
                </defs>
                <g>
                    <path d={backgroundD} fill="url(#backgroundImage)"></path>
                    {controls.showPoints &&
                        backgroundPoints.map(({ x, y }, idx) => (
                            <circle
                                fill="yellow"
                                stroke="black"
                                strokeWidth="1px"
                                key={`circle-${idx}`}
                                cx={x}
                                cy={y}
                                r="2"
                            />
                        ))}
                </g>
                {showAvatar && (
                    <g>
                        <image
                            height="150"
                            width="150"
                            transform="translate(25 25)"
                            href={TEAM_AVATARS[avatar]}
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </g>
                )}
            </svg>
            <Leva oneLineLabels />
            {controls.showStats && (
                <div className="stats">
                    <pre>
                        frameCount: {frameCount}
                        <br />
                        progress: {(progress * 100).toFixed(2)}
                        <br />
                        theta: {(progress * Math.PI * 2).toFixed(2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default App;
