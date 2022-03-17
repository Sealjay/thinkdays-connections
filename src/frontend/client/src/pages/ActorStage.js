import React, {useEffect} from 'react';

export default function ActorStage({scene, script, adventurer, currentTarget}) {

    return (
        <>
            <p className="font-medium leading-tight text-3xl">The Scene</p>
            <p>{scene}</p>
            <p className="font-medium leading-tight text-3xl">Your Script</p>
            {adventurer === currentTarget ? (<><p className="text-red-600"> {adventurer}, read your script!</p><br/><div className="shadow-lg"><p className="outline-slate outline-8">{script}</p></div></>) : (<p>It's not your turn.</p>)}
        </>
    )
}