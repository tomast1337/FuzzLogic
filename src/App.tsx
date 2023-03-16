import * as React from "react";
import { Graph } from "./graphs";

// using a tailwind class here
export default () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      x: i,
      y: Math.sin(i / 10) * 100 + Math.random() * 50,
    });
  }

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h1 className="text-4xl">Welcome to React Parcel Micro App!</h1>
      <p className="text-xl">Hard to get more minimal than this React app.</p>
      <Graph title="My Graph" data={data} width={windowWidth} height={300} />
    </>
  );
};
