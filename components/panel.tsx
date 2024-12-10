'use client'

import React, { useState } from 'react';
import Menu from './menu';
import { useWindows } from './WindowContext';

export default function Panel() {
    const { activeWindow, windows } = useWindows();

    const activeAppName =
        windows.find((window:any) => window.id === activeWindow)?.appName || 'Finder';

    const fileMenu = [
        { title: 'New Finder Window', disabled: false },
        { title: 'New Folder', disabled: false },
        { title: 'New Folder with Selection', disabled: true },
        { title: 'New Smart Folder', disabled: false },
        { title: 'New Tab', disabled: false },
        { separator: true },
        { title: 'Open', disabled: false },
        { title: 'Open With', disabled: false },
        { title: 'Close Window', disabled: false },
        { separator: true },
        { title: 'Move to Trash', disabled: false },
        { separator: true },
        { title: 'Get Info', disabled: false },
        { title: 'Rename', disabled: false },
        { title: 'Duplicate', disabled: true },
    ];

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverEnabled, setHoverEnabled] = useState(false);

    const handleToggleMenu = (id: string | null) => {
        setActiveMenu(id);
        setHoverEnabled(!!id); // Enable hover only when a menu is active
    };

    const handleHoverMenu = (id: string) => {
        if (hoverEnabled) {
            setActiveMenu(id);
        }
    };

    return (
        <div
            style={{ zIndex: 1000 }}
            className="relative w-screen py-1 flex px-4 justify-between items-center content-center bg-white dark:bg-black dark:bg-opacity-50 bg-opacity-50 backdrop-blur-md"
        >
            <div className="relative flex flex-row items-center content-center space-x-1">
                <Menu
                    id="nameMenu"
                    title={activeAppName}
                    bold={true}
                    data={fileMenu}
                    visible={activeMenu === 'nameMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                <Menu
                    id="fileMenu"
                    title="File"
                    data={fileMenu}
                    visible={activeMenu === 'fileMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                <Menu
                    id="editMenu"
                    title="Edit"
                    data={fileMenu}
                    visible={activeMenu === 'editMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                {/* Add other menus here */}
            </div>
        </div>
    );
}
