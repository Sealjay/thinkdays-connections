import {Link} from "react-router-dom";
import {useAppContext} from "../utils/AppContextProvider";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import Feed from "../components/Feed";

export default function DemoStage() {
    const {state, dispatch} = useAppContext();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        dispatch({type: "SET_PAGE", page: "DemoStage"});
        dispatch({type: "SET_PAGE_STATE", pageState: {"message":"No messages."}});
    }, []);

    let pageState=state.hasOwnProperty('pageState') ? state.pageState : {};
    let message=pageState.hasOwnProperty('message') ? pageState.message : "No messages.";

    const handleClick = useCallback((e) => {
        e.preventDefault();
        dispatch({type: "SEND_MESSAGE", send: {"type":"SEND_MESSAGE","message":inputValue}});
    }, [inputValue]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, []);


    return (
        <>
            <img alt="Mockup of a platformer screen" src="https://i.pinimg.com/736x/33/f1/ac/33f1ace807660430d4d25e6b1860436f.jpg"/>
            <div>
                <p>This is the demo stage.</p>
                <input id="input" type="text" value={inputValue} onChange={handleChange} />
                <button onClick={handleClick}>Send</button>
                <pre>{message}</pre>
                <Link to="/actor">Open the Actor Stage</Link>
            </div>
        </>
    )
}