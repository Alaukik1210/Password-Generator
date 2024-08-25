import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed , setnumberAllowed] = useState(false);
  const [charAllowed , setcharAllowed] = useState(false);
  const [password,setpassword] = useState("")

  //useref hook
  const passwordRef = useRef(null)
  const passwordGenrator = useCallback( ()=>{
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMNqwertyuiopasdfghjklzxcvbnm"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
      
    }
    setpassword(pass);
  },[length , numberAllowed,charAllowed,setpassword])

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,30);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenrator()
  },[length,numberAllowed,charAllowed,passwordGenrator])
  return (
    <>
      <div className='w-full h-40 max-w-md mx-auto shadow-md pt-4 rounded-lg px-4 my-8 text-yellow-300 bg-gray-600 text-center text-xl'>Password Generator
        <div className='flex shadow rounded-lg   overflow-hidden m-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 h-[100%] px-3 text-white rounded-lg bg-black'
          placeholder='password'
          readOnly 
          ref={passwordRef}/>

          <button 
          onClick={copyPassToClipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>
          copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 pl-6'>
            <input type="range"
            min={6}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}} />
            <label >{length}</label>

          </div>

          <div className='flex items-center pl-8 gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={() =>{
              setnumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="">Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {charAllowed}
            id='characterInput'
            onChange={() =>{
              setcharAllowed((prev) => !prev);
            }} />
            <label htmlFor="characterInput">Characters</label>

          </div>

        </div>

      </div>

    </>
  )
}

export default App
