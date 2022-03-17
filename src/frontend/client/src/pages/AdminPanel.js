import React, {useCallback, useState} from 'react';

export default function AdminPanel({socket}) {
    const [adminHeader, setAdminHeader] = useState('Who killed fun?');
    const [scene, setScene] = useState('');
    const [id, setId] = useState(0);
    const [action, setAction] = useState('Discovered');
    const [target, setTarget] = useState('Diana');
    const [bgcolor, setBgColor] = useState('bg-gray-400');
    const [icon, setIcon] = useState('ThumbUpIcon');
    const [script, setScript] = useState('');
    const [scriptTarget, setScriptTarget] = useState('Diana');


    const handleFeedClick = useCallback((e) => {
        e.preventDefault();
        let newId = id + 1;
        setId(newId);
        console.log(newId);

        socket.send(JSON.stringify({
            action: "addFeed",
            message: JSON.stringify({'action': action, 'icon':icon, 'id': newId, 'target': target, 'bgcolor': bgcolor})
        }))
    }, [bgcolor, target, action]);

    const handleChange = (e) => {
        let header=e.target.value;
        setAdminHeader(header);
        socket.send(JSON.stringify({
            action: "setHeader",
            message: header
        }));
        console.log(header);
    }

    const handleBgChange = (e) => {
        setBgColor(e.target.value);
    }

    const handleIconChange = (e) => {
        setIcon(e.target.value);
    }

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    }

    const handleActionChange = (e) => {
        setAction(e.target.value);
    }

    const handleSceneChange = (e) => {
        setScene(e.target.value);
    }

    const handleScriptChange = (e) => {
        setScript(e.target.value);
    }


    const handleScriptTargetChange = (e) => {
        setScriptTarget(e.target.value);
    }

    const handleScene = (e) => {
        socket.send(JSON.stringify({
            action: "setScene",
            message: scene
        }));
    }

    const handleScriptClick = useCallback((e) => {
        e.preventDefault();

        socket.send(JSON.stringify({
            action: "setScript",
            message: JSON.stringify({'target': scriptTarget, 'script': script})
        }))
    }, [scriptTarget, script]);

    return (
        <>
            <p className="font-medium leading-tight text-3xl">Header</p>
            <fieldset>
                <legend>Who killed fun?</legend>
                <input type="radio"
                       name="headerName"
                       value="Who killed fun?"
                       checked={adminHeader === 'Who killed fun?'}
                       onChange={handleChange}
                /><br/>
                <legend>Act 1</legend>
                <input type="radio"
                       name="headerName"
                       value="Act 1"
                       checked={adminHeader === 'Act 1'}
                       onChange={handleChange}
                /><br/>
                <legend>Act 2</legend>
                <input type="radio"
                       name="headerName"
                       value="Act 2"
                       checked={adminHeader === 'Act 2'}
                       onChange={handleChange}
                /><br/>
                <legend>Act 3</legend>
                <input type="radio"
                       name="headerName"
                       value="Act 3"
                       checked={adminHeader === 'Act 3'}
                       onChange={handleChange}
                /><br/>
                <legend>Fin</legend>
                <input type="radio"
                       name="headerName"
                       value="Fin"
                       checked={adminHeader === 'Fin'}
                       onChange={handleChange}
                /><br/>
            </fieldset>
            <p className="font-medium leading-tight text-3xl">Feed Item</p>
            <fieldset>
                <legend>Add Feed Item</legend>
                <em>{id}</em>
                <select name="action" defaultValue="Discovered" onChange={handleActionChange}>
                    <option value="Discovered">Discovered</option>
                    <option value = "Attacked">Attacked</option>
                    <option value = "Discussed">Discussed</option>
                    <option value = "New joiner, ">New joiner, </option>
                </select>

                <select name="target" defaultValue="Diana" onChange={handleTargetChange}>
                    <option value="Diana">Diana</option>
                    <option value="Fergus">Fergus</option>
                    <option value="Chris">Chris</option>
                    <option value="Lee">Lee</option>
                    <option value="Aaron">Aaron</option>
                    <option value="Jamal ">Jamal</option>
                    <option value="Cristy">Cristy</option>
                </select>

                <select name="bgcolor" defaultValue="bg-gray-400" onChange={handleBgChange}>
                    <option value="bg-gray-400">bg-gray-400</option>
                    <option value="bg-blue-500">bg-blue-500</option>
                    <option value="bg-green-500">bg-green-500</option>
                    <option value="bg-red-500">bg-red-500</option>
                    <option value="bg-yellow-400">bg-yellow-400</option>
                </select>

                <select name="icon" defaultValue="ThumbUpIcon" onChange={handleIconChange}>
                    <option value="ThumbUpIcon">ThumbUpIcon</option>
                    <option value="AcademicCapIcon">AcademicCapIcon</option>
                    <option value="UserIcon">UserIcon</option>
                    <option value="x-circle">x-circle</option>
                </select>

                <button onClick={handleFeedClick}>Send</button>
                <br/>
            </fieldset>

            <p className="font-medium leading-tight text-3xl">Scene</p>
            <p>Set Scene</p>
            <textarea name="scene" value={scene} onChange={handleSceneChange}  rows="3" cols="10">
            </textarea>
            <button onClick={handleScene}>Send</button>
            <p className="font-medium leading-tight text-3xl">Scene</p>
            <p>Set Script</p>
            <textarea name="script" value={script} onChange={handleScriptChange}  rows="3" cols="10">
            </textarea>
            <select name="scriptTarget" defaultValue="Diana" onChange={handleScriptTargetChange}>
                <option value="Diana">Diana</option>
                <option value="Fergus">Fergus</option>
                <option value="Chris">Chris</option>
                <option value="Lee">Lee</option>
                <option value="Aaron">Aaron</option>
                <option value="Jamal ">Jamal</option>
                <option value="Cristy">Cristy</option>
            </select>
            <button onClick={handleScriptClick}>Send</button>

        </>
    )
}