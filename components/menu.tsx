/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useRef } from 'react';

export default function Menu(props: any) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                props.onToggle(null);
            }
        };

        if (props.visible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [props.visible, props.onToggle]);

    return (
        <div
            className="relative"
            onMouseEnter={() => props.onHover(props.id)}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    props.onToggle(props.id);
                }}
                className={`font-medium font-sf px-2 rounded-md cursor-pointer duration-100 transition-all ease-in dark:hover:bg-black dark:hover:bg-opacity-20 hover:bg-white hover:bg-opacity-20 text-sm dark:text-white text-black ${
                    props.visible ? 'bg-white dark:bg-black dark:bg-opacity-20 bg-opacity-20' : ''
                }`}
            >
                {props.title}
            </div>
            {props.visible && (
                <div
                    ref={menuRef}
                    style={{ zIndex: 2000 }} // Ensure this has a higher z-index than the page content
                    className="fixed mt-2 min-w-56 w-max bg-white dark:bg-black dark:bg-opacity-50 bg-opacity-50 rounded-lg flex flex-col space-y-[1px] p-[6px] shadow-lg backdrop-blur-md"
                >
                    {props.data.map((entry: any, index: number) =>
                        entry.separator ? (
                            <div key={`separator-${index}`} className="py-1 px-1">
                                <div className="bg-gray-700 h-[0.1px]" />
                            </div>
                        ) : (
                            <div
                                key={entry.title}
                                className={`py-[2px] px-2 text-sm dark:text-white text-black rounded-md ${
                                    entry.disabled
                                        ? 'text-gray-700 dark:text-gray-400 cursor-not-allowed'
                                        : 'dark:hover:bg-blue-600 hover:bg-blue-500 hover:text-white cursor-pointer'
                                }`}
                            >
                                {entry.title}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
