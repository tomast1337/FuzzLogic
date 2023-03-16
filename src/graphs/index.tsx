// graphs/index.tsx
import * as React from "react";

type DataPoint = {
  x: number;
  y: number;
};

type GraphProps = {
  title?: string;
  data?: DataPoint[];
  width?: number;
  height?: number;
  numLabelsX?: number;
  numLabelsY?: number;
};

const Graph = ({
  title = "My Graph",
  data = [],
  width = 500,
  height = 300,
  numLabelsX = 10,
  numLabelsY = 10,
}: GraphProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    numLabels: number,
    yPointDistance: number,
    xNumLabels: number,
    xPointDistance: number
  ): void => {
    Array.from(Array(numLabels + 1).keys()).forEach((i) => {
      ctx.beginPath();
      ctx.moveTo(0, height - yPointDistance * i);
      ctx.lineTo(width, height - yPointDistance * i);
      ctx.stroke();
    });
    // draw the x axis grid lines
    Array.from(Array(xNumLabels + 1).keys()).forEach((i) => {
      ctx.beginPath();
      ctx.moveTo(xPointDistance * i, 0);
      ctx.lineTo(xPointDistance * i, height);
      ctx.stroke();
    });
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width - 10, height - 10);
    ctx.moveTo(width, height);
    ctx.lineTo(width - 10, height + 10);
    ctx.stroke();

    // draw the y axis labels
    //get values
    const yValues = data.map((point) => point.y);
    // get the max value of the data
    const maxY = Math.max(...yValues);
    // get the min value of the data
    const minY = Math.min(...yValues);
    // get the range of the data
    const range = maxY - minY;
    // get the number of labels
    const numLabels = numLabelsY;
    // get the distance between labels
    const labelDistance = range / numLabels;
    // get the distance between each point
    const pointDistance = height / numLabels;
    // draw the x axis labels
    // get values
    const xValues = data.map((point) => point.x);
    // get the max value of the data
    const maxX = Math.max(...xValues);
    // get the min value of the data
    const minX = Math.min(...xValues);
    // get the range of the data
    const xRange = maxX - minX;
    // get the number of labels
    const xNumLabels = numLabelsX;
    // get the distance between labels
    const xLabelDistance = xRange / xNumLabels;
    // get the distance between each point
    const xPointDistance = width / xNumLabels;

    // draw grid lines
    drawGrid(ctx, numLabels, pointDistance, xNumLabels, xPointDistance);

    // draw the Y labels
    drawLabels(
      numLabels,
      ctx,
      minY,
      labelDistance,
      height,
      pointDistance,
      xNumLabels,
      minX,
      xLabelDistance,
      xPointDistance
    );
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // set canvas width and height
      canvas.width = width;
      canvas.height = height;
      // draw graph
      if (ctx) {
        // draw axes
        drawAxes(ctx);

        // draw the data
        drawData(ctx, data, width, height);
      }
    }
  }, [data, width, height]);

  // using a tailwind class here
  return (
    <div className="border border-black">
      <h1 className="text-xl font-bold text-center font-sans">{title}</h1>
      <canvas
        ref={canvasRef}
        style={{
          width: width,
          height: height,
        }}
      />
    </div>
  );
};

export { Graph };
function drawLabels(
  numLabels: number,
  ctx: CanvasRenderingContext2D,
  minY: number,
  labelDistance: number,
  height: number,
  pointDistance: number,
  xNumLabels: number,
  minX: number,
  xLabelDistance: number,
  xPointDistance: number
) {
  Array.from(Array(numLabels + 1).keys()).forEach((i) => {
    ctx.beginPath();
    ctx.stroke();
    ctx.fillText(
      `${Math.round(minY + labelDistance * i)}`,
      0,
      height - pointDistance * i
    );
  });

  // draw the X labels
  Array.from(Array(xNumLabels + 1).keys()).forEach((i) => {
    ctx.beginPath();
    ctx.stroke();
    ctx.fillText(
      `${Math.round(minX + xLabelDistance * i)}`,
      xPointDistance * i,
      height
    );
  });
}
function drawData(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number
) {}
