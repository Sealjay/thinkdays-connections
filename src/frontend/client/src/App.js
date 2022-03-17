/* This example requires Tailwind CSS v2.0+ */
import {useEffect, useState} from 'react';
import {
    MenuIcon,
} from '@heroicons/react/outline'
import DemoStage from "./pages/DemoStage";
import Sidebar from "./components/Sidebar";
import {
    Routes, Route, HashRouter
} from "react-router-dom";
import {useAppContext} from "./utils/AppContextProvider";
import {CONNECTION_STATE, socketInitializer} from "./utils/WebSocket";
import ActorStage from "./pages/ActorStage";

const port = process.env.NODE_ENV === 'development' ? 5000 : window.location.port;
const url = `ws://${window.location.hostname}:${port}/ws`;
// TODO: Ensure that when deployed live, we swap in WSS for TLS ensured connections

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {state, dispatch} = useAppContext();

    useEffect(() => {
        console.log("Initializing socket...");
        if (state.connectionState === CONNECTION_STATE.DISCONNECTED) {
            socketInitializer(url, state, dispatch);
        }
    }, [state.connectionState]);

    return (
        <>
            <div>
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => {
                                setSidebarOpen(!sidebarOpen);
                            }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">{state.header}</h1>
                            </div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                <HashRouter>
                                    <Routes>
                                        <Route path="/" element={<DemoStage/>}/>
                                        <Route path="/actor" element={<ActorStage/>}/>
                                    </Routes>
                                </HashRouter>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}