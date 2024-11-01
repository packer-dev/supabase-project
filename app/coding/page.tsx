"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Wrapper from "../Wrapper";
import { v4 } from "uuid";

type ItemProps = {
  id: string;
  top: number;
  left: number;
  mode: number;
};

const Coding = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState<ItemProps[]>([]);
  const [mode, setMode] = useState(1);
  const [isFast, setIsFast] = useState(false);
  useEffect(() => {
    const timeOut = setTimeout(
      () => {
        if (!ref.current) {
          clearTimeout(timeOut);
          return;
        }
        const left = +ref.current.style.left.replace("px", "");
        if (time + 1 < 15) {
          setTime(time + 1);
        } else {
          setTime(0);
          setIsFast(false);
          setMode(Math.floor(Math.random() * (2 - 1 + 1) + 1));
          setDone([...done, { id: v4(), left, top: time * 40, mode }]);
        }
        clearTimeout(timeOut);
      },
      isFast ? 40 : 300
    );
  }, [time, done, ref, mode, isFast]);
  useEffect(() => {
    window.addEventListener("keyup", (event) => {
      if (ref.current) {
        let deg: number | string = ref.current.style.transform;
        deg = deg.replace("rotate(", "").replace("deg)", "");
        deg = +deg;
        const left = +ref.current.style.left.replace("px", "");
        const oneLine = mode === 1 ? 100 : 40;
        switch (event.key) {
          case "ArrowDown":
            setIsFast(true);
            break;
          case "ArrowUp":
            ref.current.style.transform = `rotate(${
              deg + 90 > 360 ? 0 : deg + 90
            }deg)`;
            break;
          case "ArrowLeft":
            ref.current.style.left = `${left - oneLine < 0 ? 0 : left - 40}px`;
            break;
          case "ArrowRight":
            ref.current.style.left = `${
              left + oneLine > 400 ? 300 : left + 40
            }px`;
            break;
          default:
            break;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return (
    <Wrapper>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[400px] h-[600px] border-gray-300 border relative overflow-hidden">
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
          >
            {Array(600)
              .fill(0)
              .map((item) => (
                <div
                  key={item}
                  className="w-[40px] h-[40px] border border-gray-600 bg-gray-700"
                ></div>
              ))}
          </div>
          <Item
            ref={ref}
            item={{
              id: v4(),
              top: time * 40,
              left: 0,
              mode,
            }}
          />
          {done.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Item = forwardRef(function Item(
  { item }: { item: ItemProps },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any
) {
  return (
    <div
      ref={ref}
      className="absolute"
      style={{
        top: item.top,
        left: item.left,
        transform: "rotate(0deg)",
      }}
    >
      <div className="w-[120px] h-[40px] relative outline-none">
        <div className="absolute top-0 left-0 h-[40px] bg-orange-400 w-full" />
        {item.mode === 1 && (
          <div className="absolute top-[40px] right-0 w-[40px] h-[40px] bg-orange-400"></div>
        )}
      </div>
    </div>
  );
});

export default Coding;
