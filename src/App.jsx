import { useCallback, useEffect, useRef, useState } from "react";

function App() {

  // useState Hook
  const [length, setLength] = useState(8);

  const [numAllowed, setNumAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef Hook

  const passwordRef = useRef(null)

  // copying the password to the clipboard

  const copyPasswordToClipboard = useCallback( () => {

    // select the whole input which is present in thatperticular tag
    passwordRef.current?.select()
    // select the text within the given range
    // passwordRef.current?.setSelectionRange(0, 3);
    
    window.navigator.clipboard.writeText(password)

  }, [password])

  // useCallback

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%&";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  // useEffect Hook

  useEffect( () => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (

    <div className="flex justify-center items-center h-screen w-full">

      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">

        <h2 className="text-white text-center my-3 text-4xl font-bold">Password generator</h2>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button 
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 hover:bg-blue-500 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={ (e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={ () => {
                setNumAllowed( (prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="charInput"
              onChange={ () => {
                setCharAllowed( (prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Charecters</label>
          </div>

        </div>

      </div>

    </div>

  );
}

export default App;
