'use client';

import { useState, useRef, useEffect } from "react"
import './clock.css'
import Sector from "./sector";
import { clamp, map } from 'lodash';

import { TimeLine } from "../types/time";

type clockProps = {
  timeline?: TimeLine;
}

export default function Clock({ timeline }: clockProps) {

  const hourRef = useRef<HTMLSpanElement>(null);
  const minuteRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const clockFaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let { hourHandDegrees, minuteHandDegrees, secondHandDegrees, isRealClock } = calculateClockHands(timeline?.start, timeline?.end);

    animateClockHands(hourRef.current, hourHandDegrees,
      minuteRef.current, minuteHandDegrees,
      secondRef.current, secondHandDegrees,
      isRealClock);
  }, [timeline])

  return (
    <div className='clock'>
      <div className='clock-face' ref={clockFaceRef}>
        <span className='number' style={{ "--i": 0 } as React.CSSProperties}><span>12</span></span>
        <span className='number' style={{ "--i": 1 } as React.CSSProperties}><span>3</span></span>
        <span className='number' style={{ "--i": 2 } as React.CSSProperties}><span>6</span></span>
        <span className='number' style={{ "--i": 3 } as React.CSSProperties}><span>9</span></span>
        <div className='center' id='hr'><span ref={hourRef} ></span></div>
        <div className='center' id='mn'><span ref={minuteRef} ></span></div>
        <div className='center' id='sc'><span ref={secondRef}></span></div>
        {map(timeline?.ranges ?? [], ({ start, end, name, color }, idx) => {
          if (timeline && start !== end) {
            const { sectorStartDegrees, sectorEndDegrees } = calculateSector(timeline.start, timeline.end, start, end)
            return <Sector key={idx} radius={100} duration={1000} 
            startAngleDegrees={sectorStartDegrees} endAngleDegrees={sectorEndDegrees}
            name={name} color={color ?? 'rgb(255, 187, 187)'}
            ></Sector>
          }
        })}
      </div>
    </div>
  )
}

function animateClockHands(hourHand: HTMLSpanElement | null, hourHandDegrees: number, minuteHand: HTMLSpanElement | null, minuteHandDegrees: number, secondHand: HTMLSpanElement | null, secondHandDegrees: number, isRealClock: boolean) {
  if (hourHand) {
    hourHand.animate([
      {
        transform: `rotate(${hourHandDegrees}deg) translateY(2.5px)`
      }
    ], {
      duration: 1000,
      iterations: 1
    });
    setTimeout(() => {
      hourHand.style.transform = `rotateZ(${hourHandDegrees}deg) translateY(2.5px)`;
      if (isRealClock) {
        hourHand.animate([
          {
            transform: `rotate(${hourHandDegrees}deg) translateY(2.5px)`
          }, {
            transform: `rotate(${hourHandDegrees + 360}deg) translateY(2.5px)`
          }
        ], {
          duration: 12 * 60 * 60 * 1000,
          iterations: Infinity
        });
      }
    }, 1000);
  }

  if (minuteHand) {
    minuteHand.animate([
      {
        transform: `rotate(${minuteHandDegrees}deg) translateY(2.5px)`
      }
    ], {
      duration: 1000,
      iterations: 1
    });
    setTimeout(() => {
      minuteHand.style.transform = `rotateZ(${minuteHandDegrees}deg) translateY(2.5px)`;
      if (isRealClock) {
        minuteHand.animate([
          {
            transform: `rotate(${minuteHandDegrees}deg) translateY(2.5px)`
          }, {
            transform: `rotate(${minuteHandDegrees + 360}deg) translateY(2.5px)`
          }
        ], {
          duration: 60 * 60 * 1000,
          iterations: Infinity
        });
      }
    }, 1000);
  }

  if (secondHand) {
    secondHand.animate([
      {
        transform: `rotate(${(secondHandDegrees)}deg) translateY(1.5px)` // adjust for the one second animation before the clock really starts to rotate
      }
    ], {
      duration: 1 * 1000
    });
    setTimeout(() => {
      secondHand.style.transform = `rotateZ(${secondHandDegrees}deg) translateY(1.5px)`;
      if (isRealClock) {
        secondHand.animate([
          {
            transform: `rotate(${(secondHandDegrees + 6)}deg) translateY(1.5px)` // adjust for the one second animation before the clock really starts to rotate
          }, {
            transform: `rotate(${secondHandDegrees + 6 + 360}deg) translateY(1.5px)`
          }
        ], {
          duration: 60 * 1000,
          iterations: Infinity
        });
      }
    }, 1000);
  }
}

function calculateClockHands(startTime: Date | null = null, endTime: Date | null = null) {
  const now = new Date();

  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();

  let hourHandDegrees = (hour + minute / 60 + second / 60 / 60) / 12 * 360;
  let minuteHandDegrees = (minute + second / 60) / 60 * 360;
  let secondHandDegrees = second / 60 * 360;

  let isRealClock = true

  if (startTime != null && endTime != null) {
    isRealClock = false;

    const relativeNow = calculateRelativeTime(startTime, endTime, now)

    hour = relativeNow * 12;
    minute = (hour % 1) * 60;
    second = (minute % 1) * 60;

    hourHandDegrees = hour / 12 * 360;
    minuteHandDegrees = minute / 60 * 360;
    secondHandDegrees = second / 60 * 360;
  }
  return { hourHandDegrees, minuteHandDegrees, secondHandDegrees, isRealClock };
}

function calculateSector(clockStart: Date, clockEnd: Date, sectorStart: Date, sectorEnd: Date) {
  const sectorStartDegrees = calculateRelativeTime(clockStart, clockEnd, sectorStart) * 360
  const sectorEndDegrees = calculateRelativeTime(clockStart, clockEnd, sectorEnd) * 360
  return { sectorStartDegrees, sectorEndDegrees }
}

function calculateRelativeTime(start: Date, end: Date, current: Date) {
  return clamp((current.getTime() - start.getTime()) / (end.getTime() - start.getTime()), 0, 1)
}