'use client'
import { useEffect, useRef, useState, useImperativeHandle } from "react";
import './sector.css'

export default function Sector({ radius = 100, duration = 1000, startAngleDegrees = 0, endAngleDegrees = 0, name = '', color = 'rgb(255, 187, 187)' }): React.JSX.Element {
  const startAngleRadians = ((startAngleDegrees) * Math.PI) / 180
  const endAngleRadians = ((endAngleDegrees) * Math.PI) / 180
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null);

  const [tooltip, setTooltip] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (pathRef.current) {
      animateSector(pathRef.current, radius, startAngleRadians, endAngleRadians, duration, color)
    }
  }, [startAngleDegrees, endAngleDegrees])

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    setTooltip({ x: e.clientX, y: e.clientY - 15 });
  };

  const handleMouseLeave = () => {
    console.log('leave mouse')
    setTooltip(null);
  };

  return (
    <><svg className="sector hover-text" ref={svgRef}
      viewBox="-100 -100 200 200" style={{ position: "absolute", zIndex: 4 }} >
      <path
        ref={pathRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sector" ></path>
    </svg>
      {/* {tooltip && (
        <div className={`tooltip ${tooltip ? 'tooltip-show' : ''}`} style={{ position: 'fixed', top: `${tooltip.y}px`, left: `${tooltip.x}px` }}>
          {name}
        </div>
      )} */}
      <div className={`tooltip ${tooltip ? 'tooltip-show' : ''}`} style={{ position: 'fixed', top: `${tooltip?.y}px`, left: `${tooltip?.x}px` }}>
        {name}
      </div>
    </>
  )
}

const animateSector = (path: SVGPathElement, radius: number, startAngle: number, endAngle: number, duration: number, color: string) => {
  const startTime = performance.now();
  console.log('start animated sector')

  const frame = (time: number) => {
    console.log('animating sector')
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1); // t is between between 0 and 1
    const angle = startAngle * (1 - t) + endAngle * t; // at t=0, angle = startAngle; at t=1, angle = endAngle

    path.setAttribute("d", createSector(radius, startAngle, angle));
    path.setAttribute("fill", color);


    if (t < 1) {
      // recurse until animation is complete
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

const createSector = (radius: number, startAngle: number, endAngle: number) => {
  const start = {
    x: radius * Math.cos(startAngle),
    y: radius * Math.sin(startAngle)
  };
  const end = {
    x: radius * Math.cos(endAngle),
    y: radius * Math.sin(endAngle)
  };


  const largeArcFlag = (endAngle - startAngle) <= Math.PI ? 0 : 1;

  const d = [
    `M ${start.x} ${start.y}`, // Move to the start point
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // Arc to end point
    `L 0 0`, // Line back to the center
    `L ${start.x} ${start.y}`, // Line back to the center
  ].join(" ");

  return d;
}
