import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import {XIcon} from "@heroicons/react/outline";
import Feed from "./Feed";
import ConnectionState from "./ConnectionState";
import Logo from "./Logo";
import {PlayIcon} from "@heroicons/react/solid";

export default function Sidebar({sidebarOpen, setSidebarOpen}) {
    // Swap in adventurer for a connection ID
    let adventurer="xyz";
    // Swap in timeline for feed context
    let timeline=[];
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <Logo />
                                </div>
                                <nav className="mt-5 px-2 space-y-1">
                                    {/* TODO: Remove this test */}
                                    { 1 === 1 ? (
                                        <>
                                            <Feed timeline={timeline}/>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex bg-gray-700 p-4">
                                <div className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div>
                                            <PlayIcon className="inline-block h-10 w-10 rounded-full h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-white">{adventurer}</p>
                                            <ConnectionState />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <Logo />
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {/* TODO: Remove this test */}
                        { 1 === 1 ? (
                            <>
                                <Feed timeline={timeline}/>
                            </>
                        ) : (
                            <></>
                        )}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex bg-gray-700 p-4">
                        <div className="flex-shrink-0 w-full group block">
                            <div className="flex items-center">
                                <div>
                                    <PlayIcon className="inline-block h-10 w-10 rounded-full h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">{adventurer}</p>
                                    <ConnectionState />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}