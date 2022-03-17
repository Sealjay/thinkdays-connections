export const CONNECTION_STATE = {
    DISCONNECTED: 0,
    CONNECTED: 1
}

const sendData = (state, type, data) => {
    if (state.connectionState === CONNECTION_STATE.CONNECTED) {
        state.socket.send(JSON.stringify({
            event: type,
            data: data
        }))
    }
}

export const socketInitializer = (url, state, dispatch) => {
    console.log("Initializing socket...");
    let socketSetup = new WebSocket(url);
    dispatch({type: "SET_SOCKET", socket: socketSetup, sendData: sendData});
    socketSetup.onopen = () => {
        dispatch({type: "SET_CONNECTION_STATE", connectionState: CONNECTION_STATE.CONNECTED});
    };
    socketSetup.onmessage = (e) => {
        try {
            let jsonResponse=JSON.parse(e.data);
            dispatch(jsonResponse);
        } catch (err) {
            console.log("Get non-json from server: " + e.data)
        }
    };
    socketSetup.onclose = () => {
        dispatch({type: "CLOSE_SOCKET"});
        dispatch({type: "SET_CONNECTION_STATE", connectionState: CONNECTION_STATE.DISCONNECTED});
    };
}