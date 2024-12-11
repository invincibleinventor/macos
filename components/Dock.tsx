'use client';

import { useWindows } from './WindowContext';
import { motion } from 'framer-motion';
import { apps } from './app';
import { useState } from 'react';
const Dock = () => {
  const { windows, addWindow, toggleWindows, setActiveWindow } = useWindows();
  const [launchpad,setLaunch] =useState(false)
  const [hoverApp, setHoverApp] = useState<string | null>(null);
  

  const onClick = (id: string, name: string, title?: string) => {
   const appWins = windows.filter((win: any) => win.appName === name);

    if (appWins.length > 0) {
      toggleWindows(name);
    } else {
      const newWin = {
        id: `${name}-${Date.now()}`,
        appName: name,
        title: title || name,
        component: () => <div className="p-4">This is {name}</div>,
        props: {},
        isMinimized: false,
        position: { top: 100, left: 100 },
        size: { width: 400, height: 300 },
        isMaximized: false,
      };
      addWindow(newWin);
      setActiveWindow(newWin.id);
    }
  };

  const baseSize = 50;
  const gap = 10;

  const getProps = (i: number) => {
    if (hoverApp) {
      const idx = apps.findIndex((app) => app.appName === hoverApp);
      if (i === idx) {
        return { size: baseSize * 1.6, y: -baseSize * 0.45 };
      }
      if (Math.abs(i - idx) === 1) {
        return { size: baseSize * 1.4, y: -baseSize * 0.3 };
      }
      if (Math.abs(i - idx) === 2) {
        return { size: baseSize * 1.2, y: -baseSize * 0.15 };
      }
    }
    return { size: baseSize, y: 0 };
  };

  return (
    <div className=''>
<motion.div
      id="launchpad"
      style={{ zIndex: 1000 }}
      className={`py-20 absolute w-screen h-screen bg-opacity-50 dark:bg-black dark:bg-opacity-50 bg-white backdrop-blur-lg`}
      initial={{ opacity: 0 }}  // Initially hidden
      animate={{ opacity: launchpad ? 1 : 0 }}  // Fade in/out based on `launchpad`
      exit={{ opacity: 0 }}  // Fade out when leaving
      transition={{ opacity: { duration: 0.1 } }}  // Control timing of fade and display change
    >
        <div className='mx-auto relative w-56'>
        <svg xmlns="http://www.w3.org/2000/svg" className='absolute w-4 text-neutral-800 dark:text-neutral-400 left-4 h-4 top-0 bottom-0 my-auto' width="32" height="32" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 27l7.5-7.5M28 13a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
        <input className='px-2 pl-10 dark:text-white text-black placeholder:dark:text-neutral-400 outline-none focus:border-2 focus:border-blue-600 focus:dark:border-blue-300 transition-all ease-linear duration-75 placeholder:text-neutral-800 w-full text-xs rounded-md py-2 border border-neutral-200 dark:border dark:border-neutral-700 bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20' placeholder='Search Apps'></input>
        </div>
      </motion.div>
    <motion.div
      className="fixed bottom-2 mx-auto left-0 right-0 w-max z-50 py-0 dark:bg-black dark:bg-opacity-30 bg-white bg-opacity-30 px-[6px] backdrop-blur-lg flex flex-shrink-0 rounded-2xl border-[0.1px] dark:border-neutral-700 border-neutral-500 shadow-2xl"
      style={{
        zIndex: 1001,
        height: '60px',
        overflow: 'visible',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: `${gap}px`,
      }}
    >
      <div className="flex items-center">
        
        {apps.slice(0,apps.length).map((app, i) => {
          const { size: iconSize, y: iconY } = getProps(i);
          const isHover = hoverApp === app.appName;
          const hasWin = windows.some((win: any) => win.appName === app.appName);
          if(i==0){
            return(
<motion.div
              key={app.appName}
              className="relative flex flex-col items-center cursor-pointer"
              onClick={() => setLaunch(!launchpad)}
              onMouseEnter={() => setHoverApp(app.appName)}
              onMouseLeave={() => setHoverApp(null)}
              animate={{
                width: iconSize,
                height: iconSize,
                y: iconY,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 20,
                mass: 1,
              }}
              style={{
                position: 'relative',
                zIndex: isHover ? 10 : undefined,
              }}
            >
              {isHover && (
                <motion.div
                  className="absolute bottom-full mb-2 text-sm dark:bg-black dark:text-white dark:bg-opacity-30 bg-white text-black bg-opacity-30 backdrop-blur-lg px-2 py-1 rounded-md shadow-lg"
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }}
                >
                  {app.appName}
                </motion.div>
              )}
              <motion.img
                src={app.icon}
                className="rounded-xl  transition-all duration-200"
                style={{
                  width: iconSize,
                  height: iconSize,
                }}
              />
              {1!=1 &&
              <div className='absolute rounded-full w-4 h-4 bottom-[2px] right-[2px] border-[1px] flex items-center content-center text-[10px] dark:bg-black dark:text-white dark:border-[1px] dark:bg-opacity-40 dark:border-neutral-500 bg-white bg-opacity-50 backdrop-blur-lg text-black border-neutral-200 '><span className='mx-auto'>1</span></div>
        }
              {1!=1 && (
                <div className="absolute bottom-0 w-[3px] h-[3px] bg-white rounded-md -mb-[3px] transition-all duration-200"></div>
              )}
            </motion.div>
          );
          }
          else{
          return (

            <motion.div
              key={app.appName}
              className="relative flex flex-col items-center cursor-pointer"
              onClick={() => onClick(app.id, app.appName)}
              onMouseEnter={() => setHoverApp(app.appName)}
              onMouseLeave={() => setHoverApp(null)}
              animate={{
                width: iconSize,
                height: iconSize,
                y: iconY,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 20,
                mass: 1,
              }}
              style={{
                position: 'relative',
                zIndex: isHover ? 10 : undefined,
              }}
            >
              {isHover && (
                <motion.div
                  className="absolute bottom-full mb-2 text-sm dark:bg-black dark:text-white dark:bg-opacity-30 bg-white text-black bg-opacity-30 backdrop-blur-lg px-2 py-1 rounded-md shadow-lg"
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }}
                >
                  {app.appName}
                </motion.div>
              )}
              <motion.img
                src={app.icon}
                className="rounded-xl  transition-all duration-200"
                style={{
                  width: iconSize,
                  height: iconSize,
                }}
              />
              {1!=1 &&
              <div className='absolute rounded-full w-4 h-4 bottom-[2px] right-[2px] border-[1px] flex items-center content-center text-[10px] dark:bg-black dark:text-white dark:border-[1px] dark:bg-opacity-40 dark:border-neutral-500 bg-white bg-opacity-50 backdrop-blur-lg text-black border-neutral-200 '><span className='mx-auto'>1</span></div>
        }
              {hasWin && (
                <div className="absolute bottom-0 w-[3px] h-[3px] bg-white rounded-md -mb-[3px] transition-all duration-200"></div>
              )}
            </motion.div>
          );
        }
        })}
        
      </div>
    </motion.div>
    </div>
    
  );
};

export default Dock;
