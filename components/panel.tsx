/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react';
import Menu from './menu';

export default function Panel() {
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

    const editMenu = [
        { title: 'Undo', disabled: true },
        { title: 'Redo', disabled: true },
        { separator: true },
        { title: 'Cut', disabled: true },
        { title: 'Copy', disabled: false },
        { title: 'Paste', disabled: true },
        { title: 'Select All', disabled: false },
    ];

    const viewMenu = [
        { title: 'As Icons', disabled: false },
        { title: 'As List', disabled: false },
        { title: 'As Columns', disabled: false },
        { title: 'As Gallery', disabled: false },
        { separator: true },
        { title: 'Hide Sidebar', disabled: false },
        { title: 'Show Preview', disabled: false },
    ];

    const goMenu = [
        { title: 'Back', disabled: true },
        { title: 'Forward', disabled: true },
        { title: 'Enclosing Folder', disabled: false },
        { separator: true },
        { title: 'Recent Folders', disabled: false },
        { title: 'iCloud Drive', disabled: false },
        { title: 'Applications', disabled: false },
        { title: 'Desktop', disabled: false },
        { title: 'Documents', disabled: false },
        { title: 'Downloads', disabled: false },
    ];

    const windowMenu = [
        { title: 'Minimize', disabled: false },
        { title: 'Zoom', disabled: false },
        { separator: true },
        { title: 'Bring All to Front', disabled: false },
    ];

    const helpMenu = [
        { title: 'macOS Help', disabled: false },
        { title: 'About Finder', disabled: false },
    ];

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [hoverEnabled, setHoverEnabled] = useState(false);

    const handleToggleMenu = (id: string) => {
        setActiveMenu(id);
        setHoverEnabled(true);
    };

    const handleHoverMenu = (id: string) => {
        if (hoverEnabled) {
            setActiveMenu(id);
        }
    };

    const handleCloseMenu = () => {
        setActiveMenu(null);
        setHoverEnabled(false);
    };

    return (
        <div style={{zIndex:1000}} className="relative w-screen py-1 flex px-4 justify-between items-center content-center bg-white dark:bg-black  dark:bg-opacity-50 bg-opacity-50 backdrop-blur-md">
            <div className="relative flex flex-row items-center content-center space-x-3">
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
                    data={editMenu}
                    visible={activeMenu === 'editMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                <Menu
                    id="viewMenu"
                    title="View"
                    data={viewMenu}
                    visible={activeMenu === 'viewMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                <Menu
                    id="goMenu"
                    title="Go"
                    data={goMenu}
                    visible={activeMenu === 'goMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                <Menu
                    id="windowMenu"
                    title="Window"
                    data={windowMenu}
                    visible={activeMenu === 'windowMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
                <Menu
                    id="helpMenu"
                    title="Help"
                    data={helpMenu}
                    visible={activeMenu === 'helpMenu'}
                    onToggle={handleToggleMenu}
                    onHover={handleHoverMenu}
                />
            </div>
        </div>
    );
}
