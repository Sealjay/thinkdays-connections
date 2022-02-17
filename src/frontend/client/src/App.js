/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useCallback, useEffect, useState} from 'react';

import {
    HomeIcon,
    MenuIcon,
    XIcon,
} from '@heroicons/react/outline'


import DemoStage from "./DemoStage";
import Sidebar from "./Sidebar";

// check if we are running with npm run start
const port = process.env.NODE_ENV === 'development' ? 5000 : window.location.port;

const socket = new WebSocket(`ws://${window.location.hostname}:${port}/ws`);

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function App() {
    const [message, setMessage] = useState('');
    const [header, setHeader] = useState('Loading...');
    const [inputValue, setInputValue] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        socket.onopen = () => {
            setMessage(`Connected to ws://${window.location.hostname}:${window.location.port}/ws`)
        };

        socket.onmessage = (e) => {
            try {
                let jsonResponse=JSON.parse(e.data);
                switch (jsonResponse.action) {
                    case 'setHeader':
                        setHeader(jsonResponse.message);
                        break;
                    case 'sendMessage':
                        setMessage(`Get message from server: ${jsonResponse.message}`);
                        break;
                    default:
                        setMessage(`Unknown message type (${jsonResponse.action}): ${jsonResponse.message}`);
                }
            } catch (err) {
                setMessage("Get non-json from server: " + e.data)
            }
        };

        socket.onclose = () => {
            setMessage(`Disconnected from ws://${window.location.hostname}:${window.location.port}/ws`)
        };

        return () => {
            socket.close()
        }
    }, [])

    const handleClick = useCallback((e) => {
        e.preventDefault()

        socket.send(JSON.stringify({
            action: "sendMessage",
            message: inputValue
        }))
    }, [inputValue])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    return (
        <>
            <div>
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    socket={socket} />
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">{header}</h1>
                            </div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                <DemoStage inputValue={inputValue} handleChange={handleChange} handleClick={handleClick} message={message} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
