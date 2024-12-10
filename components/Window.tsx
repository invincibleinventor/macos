'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from './WindowContext';
import { apps } from './app'; // Import the app data

const PANEL_HEIGHT = 25; // Top panel height
const DOCK_HEIGHT = 110; // Bottom dock height
const MIN_WIDTH = 200;
const MIN_HEIGHT = 150;

const Window = ({ id, appName, title, component: Component, props, isMinimized, isMaximized }: any) => {
  const { removeWindow, updateWindow, activeWindow, setActiveWindow } = useWindows();
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [previousState, setPreviousState] = useState({ position, size });

  const app = apps.find((app) => app.appName === appName);

  useEffect(() => {
    if (isMinimized) {
      setPosition({ top: -1000, left: -1000 }); // Move off-screen when minimized
    } else if (!isMaximized) {
      setPosition(previousState.position);
      setSize(previousState.size);
    }
  }, [isMinimized, isMaximized]);

  const handleMaximize = () => {
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

    if (!isMaximized) {
      setPreviousState({ position, size });
      setSize({
        width: screenWidth,
        height: screenHeight - PANEL_HEIGHT - DOCK_HEIGHT,
      });
      setPosition({ top: PANEL_HEIGHT, left: 0 });
      updateWindow(id, { isMaximized: true });
    } else {
      updateWindow(id, { isMaximized: false });
      setPosition(previousState.position);
      setSize(previousState.size);
    }
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startLeft = position.left;
    const startTop = position.top;

    if (isMaximized) {
      updateWindow(id, { isMaximized: false });
    }

    const onMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes('right')) {
        newWidth = startWidth + (moveEvent.clientX - startX);
      }
      if (direction.includes('bottom')) {
        newHeight = startHeight + (moveEvent.clientY - startY);
      }
      if (direction.includes('left')) {
        newWidth = startWidth - (moveEvent.clientX - startX);
        newLeft = startLeft + (moveEvent.clientX - startX);
      }
      if (direction.includes('top')) {
        newHeight = startHeight - (moveEvent.clientY - startY);
        newTop = startTop + (moveEvent.clientY - startY);
      }

      if (newWidth >= MIN_WIDTH && newHeight >= MIN_HEIGHT) {
        setSize({ width: newWidth, height: newHeight });
        setPosition({ top: newTop, left: newLeft });
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    const startX = e.clientX - position.left;
    const startY = e.clientY - position.top;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

      let newLeft = moveEvent.clientX - startX;
      let newTop = moveEvent.clientY - startY;

      newLeft = Math.max(0, Math.min(screenWidth - size.width, newLeft));
      newTop = Math.max(PANEL_HEIGHT, Math.min(screenHeight - DOCK_HEIGHT - size.height, newTop));

      setPosition({
        top: newTop,
        left: newLeft,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className={`absolute border dark:border-gray-800 border-gray-400 shadow-md ${isMaximized ? '' : 'rounded-xl'}`}
      style={{
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
        zIndex: activeWindow === id ? 1000 : 0,
      }}
      onMouseDown={() => setActiveWindow(id)}
    >
      <div
        className={`cursor-move ${isMaximized ? '' : 'rounded-t-xl'} ${app?.titlebarblurred ? `dark:bg-opacity-50 bg-opacity-70 dark:bg-black bg-white relative backdrop-blur-sm` : ' dark:bg-gray-800 bg-white relative backdrop-blur-sm'} px-3 py-[10px] flex justify-between`}
        onDoubleClick={handleMaximize}
        onMouseDown={handleDragStart}
      >
        <div className='flex flex-row items-center content-center space-x-2'>
          <button className='w-3 h-3 rounded-full bg-red-500' onClick={() => removeWindow(id)}></button>
          <button className='w-3 h-3 rounded-full bg-green-500' onClick={handleMaximize}></button>
          <button className='w-3 h-3 rounded-full bg-yellow-500' onClick={() => updateWindow(id, { isMinimized: true })}></button>
        </div>
        <div className='max-w-72 absolute mx-auto dark:text-white right-0 left-0 bottom-[6px] font-sf font-semibold text-sm text-center'>{title}</div>
      </div>

      <div className={`h-full w-full overflow-hidden dark:bg-gray-900 ${isMaximized ? '' : 'rounded-b-xl'} bg-white`}>
        <Component focused={activeWindow === id} {...props} />
      </div>

      <div onMouseDown={(e) => handleResize(e, 'right')} className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"></div>
      <div onMouseDown={(e) => handleResize(e, 'bottom')} className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"></div>
      <div onMouseDown={(e) => handleResize(e, 'bottom-right')} className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"></div>
      <div onMouseDown={(e) => handleResize(e, 'bottom-left')} className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"></div>
      <div onMouseDown={(e) => handleResize(e, 'top-right')} className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"></div>
      <div onMouseDown={(e) => handleResize(e, 'top-left')} className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"></div>
    </div>
  );
};

export default Window;
