'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Tree, trees } from './trees';
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { PopoverTrigger } from '@/components/ui/popover';

const InputTags = () => {
  const personRef = useRef<HTMLButtonElement>(null);
  const [treeList, setTreeList] = useState(trees);
  const [topCount, setTopCount] = useState(0);
  const [leftCount, setLeftCount] = useState(0);
  return (
    <div className="w-80 h-80 shadow mx-auto my-12 border border-gray-500 relative">
      <button
        onKeyDown={(event) => {
          if (!personRef.current) return;
          switch (event.key) {
            case 'ArrowRight':
              personRef.current.style.left = `${
                +personRef.current.style.left.replace('px', '') +
                40 +
                4 * leftCount
              }px`;
              setLeftCount(leftCount + 1);
              break;
            case 'ArrowLeft':
              personRef.current.style.left = `${
                +personRef.current.style.left.replace('px', '') -
                40 -
                4 * leftCount
              }px`;
              setLeftCount(leftCount - 1);
              break;
            case 'ArrowDown':
              personRef.current.style.top = `${
                +personRef.current.style.top.replace('px', '') +
                40 +
                4 * topCount
              }px`;
              setTopCount(topCount + 1);
              break;
            case 'ArrowUp':
              personRef.current.style.top = `${
                +personRef.current.style.top.replace('px', '') -
                40 -
                4 * topCount
              }px`;
              setTopCount(topCount - 1);
              break;

            default:
              break;
          }
        }}
        ref={personRef}
        className="bx bx-child text-green-800 text-4xl absolute focus:outline-none z-10"
        style={{ left: 8, top: 40 }}
      ></button>
      <div className="absolute top-0 right-0 p-2 flex flex-col text-right gap-2">
        <p className="font-semibold">Score: 0</p>
        <span className="bx bx-cheese text-yellow-500 text-2xl"></span>
        <span className="bx bx-cart-add text-gray-500 text-2xl"></span>
      </div>
      <div className="grid grid-cols-5 gap-2 w-[216px] absolute bottom-2 left-2">
        {treeList.map((item) => (
          <ItemTree
            tree={item}
            key={item.id}
            trees={treeList}
            setTreeList={setTreeList}
          />
        ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ItemTree = ({
  active,
  setTreeList,
  trees,
  tree,
}: {
  active?: boolean;
  setTreeList: (trees: Tree[]) => void;
  trees: Tree[];
  tree: Tree;
}) => {
  //
  const treeRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (time >= 30) {
        clearTimeout(timeOut);
        setTreeList(
          [...trees].map((item) =>
            item.id === tree.id ? ({ ...item, status: 'empty' } as Tree) : item
          )
        );
        return;
      }
      setTime(time + 1);
    }, 300);
  }, [time]);
  //
  return (
    <Popover open={active}>
      <PopoverTrigger>
        <div
          ref={treeRef}
          className="w-10 h-10 bg-yellow-100 flex items-center justify-center relative"
        >
          {tree.status === 'growing' && (
            <span
              className="bx bx-cheese text-yellow-500 text-2xl"
              style={{ transform: `scale(${time / 30})` }}
            ></span>
          )}
          {tree.status === 'collect' && (
            <span className="bx bx-check text-green-500 absolute"></span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-50">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-lg border border-gray-200 shadow flex items-center 
            justify-center bg-white cursor-pointer"
          >
            <span className="bx bx-shower"></span>
          </div>
          <div
            className="w-10 h-10 rounded-lg border border-gray-200 shadow flex items-center 
            justify-center bg-white cursor-pointer"
          >
            <span className="bx bx-shower"></span>
          </div>
          <div
            className="w-10 h-10 rounded-lg border border-gray-200 shadow flex items-center 
            justify-center bg-white cursor-pointer"
          >
            <span className="bx bxs-hand"></span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InputTags;
