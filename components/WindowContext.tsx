'use client';
import React, { createContext, useState, useContext } from 'react';

const WindowContext = createContext<any>(null);

export const useWindows = () => useContext(WindowContext);

export const WindowProvider = ({ children }: any) => {
  const [windows, setWindows] = useState<any[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const addWindow = (newWindow: any) => {
    setWindows((prevWindows) => {
      return [...prevWindows, newWindow];
    });
  };
  const removeWindow = (id: string) => {
    setWindows((prevWindows) => {
      const updatedWindows = prevWindows.filter((window) => window.id !== id);
      if (updatedWindows.length === 0) {
        setActiveWindow(null); // No windows left, clear the active window
      } else if (activeWindow === id) {
        setActiveWindow(updatedWindows[0]?.id || null); // Set new active or null if none left
      }
      return updatedWindows;
    });
  };
  const toggleWindows = (appName: string) => {
    setWindows((prevWindows) => {
      return prevWindows.map((win) => {
        if (win.appName === appName) {
          // Toggle only the isMinimized property without changing position or other attributes
          return { ...win, isMinimized: !win.isMinimized };
        }
        return win;
      });
    });
  };
  const updateWindow = (id: string, updatedProps: any) => {
    setWindows(
      windows.map((window) =>
        window.id === id ? { ...window, ...updatedProps } : window
      )
    );
    if (updatedProps.isMinimized === false) {
      setActiveWindow(id); // Restore and set as active if unminimized
    }
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        addWindow,
        removeWindow,
        updateWindow,
        activeWindow,
        setActiveWindow,
        toggleWindows,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
