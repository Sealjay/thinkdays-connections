export default function DemoStage({inputValue, handleChange, handleClick, message}) {
    return (
        <>
            <img src="https://i.pinimg.com/736x/33/f1/ac/33f1ace807660430d4d25e6b1860436f.jpg"/>
            <div className="App"><p>
                <input id="input" type="text" value={inputValue} onChange={handleChange} />
                <button onClick={handleClick}>Send</button>
                <pre>{message}</pre></p>
            </div>
        </>
    )
}