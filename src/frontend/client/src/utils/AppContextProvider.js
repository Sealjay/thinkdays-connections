import {createContext, useContext, useReducer} from 'react';
import {CONNECTION_STATE} from "./WebSocket";

export function appContextReducer(state, event) {
    console.log(event);
    // TODO: Figure out whether game logic happens serverside or locally
    switch (event.type) {
        case "SET_HEADER":
            return {
                ...state,
                header: event.message,
            }
        case "SET_SOCKET":
            return {
                ...state,
                socket: event.socket,
                sendData: event.sendData,
            }
        case "SET_PAGE":
            return {
                ...state,
                page: event.page,
                pageState: {}
            }
        case "SET_PAGE_STATE":
            return {
                ...state,
                pageState: {
                    ...state.pageState,
                    ...event.pageState
                }
            }
        case "SET_CONNECTION_STATE":
            return {
                ...state,
                connectionState: event.connectionState
            }
        case "CLOSE_SOCKET":
            return {
                ...state,
                socket: null
            }
        case "SET_DEMO_MESSAGE":
            return {
                ...state,
                pageState: {
                ...state.pageState,
                message:event.message
                }
            }
        case "SEND_MESSAGE":
                if (state.connectionState === CONNECTION_STATE.CONNECTED) {
                    state.socket.send(JSON.stringify({
                        type: event.send.type,
                        message: event.send.message
                    }))
                }
            return state
        default:
            console.log("Unknown event type: " + event.type);
            return state
    }
}

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    console.log("AppContextProvider");
    const [state, dispatch] = useReducer(appContextReducer, {"socket": null, "connectionState": CONNECTION_STATE.DISCONNECTED, "header": "Loading..."});
    console.log("Set reducer");
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};