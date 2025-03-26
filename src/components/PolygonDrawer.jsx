import React, { useState } from "react";
import { Circle, Rect, Layer, Line, Stage, Image } from "react-konva";
import useImage from "use-image";

function Anchor(props) {
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <Circle
      x={props.point.x}
      y={props.point.y}
      radius={10}
      stroke="#666"
      fill={props.fill}
      strokeWidth={strokeWidth}
      onMouseOver={() => {
        document.body.style.cursor = "pointer";
        setStrokeWidth(3);
        props.onMouseOver();
      }}
      onMouseOut={() => {
        document.body.style.cursor = "default";
        setStrokeWidth(2);
        props.onMouseOut();
      }}
      onClick={() => {
        document.body.style.cursor = "default";
        props.onClick();
      }}
    />
  );
}

function PolygonOriginAnchor(props) {
  const isValid = props.validateMouseEvents();
  const [fill, setFill] = useState("transparent");

  return (
    <Anchor
      point={props.point}
      fill={fill}
      onClick={() => {
        if (isValid) {
          props.onValidClick();
        }
      }}
      onMouseOver={() => {
        if (isValid) {
          document.body.style.cursor = "pointer";
          setFill("green");
          props.onValidMouseOver();
        } else {
          document.body.style.cursor = "not-allowed";
          setFill("red");
        }
      }}
      onMouseOut={() => {
        setFill("transparent");
      }}
    />
  );
}

function PolygonConstructor(props) {
  const [points, setPoints] = useState([]);
  const [nextPoint, setNextPoint] = useState({ x: 0, y: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = ({ x, y }) => {
    setPoints(points.concat({ x, y }));
  };

  return (
    <>
      <Line
        strokeWidth={3}
        stroke="black"
        opacity={0.3}
        lineJoin="round"
        closed={isComplete}
        points={points
          .flatMap((point) => [point.x, point.y])
          .concat([nextPoint.x, nextPoint.y])}
      />

      <Rect
        x={0}
        y={0}
        width={window.innerWidth}
        height={400}
        onClick={(event) => {
          if (!isComplete) {
            const x = event.evt.offsetX;
            const y = event.evt.offsetY;
            handleClick({ x, y });
          }
        }}
        onMouseMove={(event) => {
          if (!isComplete) {
            const x = event.evt.offsetX;
            const y = event.evt.offsetY;
            setNextPoint({ x, y });
          }
        }}
      />

      {points[0] && !isComplete && (
        <PolygonOriginAnchor
          point={points[0]}
          onValidClick={() => {
            props.onComplete(points);
            setNextPoint(points[0]);
            setIsComplete(true);
          }}
          onValidMouseOver={() => {
            setNextPoint(points[0]);
          }}
          validateMouseEvents={() => {
            return points.length > 2;
          }}
        />
      )}
    </>
  );
}

export default function Test() {
  const [points, setPoints] = useState([]);
  const [image] = useImage("videos/HaNoi_VPGT.mp4");

  return (
    <Stage
      height={600}
      width={window.innerWidth}
      style={{ border: "1px solid black" }}
    >
      <Layer>
        <Image image={image} />
        <PolygonConstructor
          onComplete={(points) => {
            setPoints(points);
          }}
        />
      </Layer>
      {/* <code>{JSON.stringify(points)}</code> */}
    </Stage>
  );
}
