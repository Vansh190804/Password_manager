import { useState, useEffect, useRef } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [pass, setPass] = useState({
    siteUrl: "",
    username: "",
    password: "",
    id: '',
  })

  const [store, setstore] = useState([])
  const ref = useRef()
  const view = useRef()
  const password = useRef()

  useEffect(() => {
    console.log(store)
  }, [store])

  useEffect(() => {
    const fetchData = async () => {
      const r = await fetch("http://localhost:3000/all", {
        method: "POST",
      })
      const res = await r.json()
      setstore(res)
    }
    fetchData()
  }, [])


  const handleChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value })
  }

  const handleAdd = async () => {
    // we need to first store the update in a new state(updatePass), then update our original state. React takes time, it does not happen imidiately.
    if (ref.current.innerHTML === "Add") {
      const updatePass = { ...pass, id: uuidv4() }
      setPass(updatePass)
      if (!pass.siteUrl || !pass.username || !pass.password) {
        alert("Fill all the details")
      }
      else {
        setstore(prevStore => [...prevStore, updatePass])

        const a = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(updatePass),
        })
        const res = await a.text()
        console.log(res)
        setPass({
          siteUrl: "",
          username: "",
          password: "",
          id: '',
        })
      }
    }
    else {
      if (!pass.siteUrl || !pass.username || !pass.password) {
        alert("Fill all the details")
      }
      else {
        console.log("working")
        setstore(prevStore => [...prevStore, pass])
        const a = await fetch("http://localhost:3000/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(pass),
        })
        const res = await a.text()
        console.log(res)
        setPass({
          siteUrl: "",
          username: "",
          password: "",
          id: '',
        })
        ref.current.innerHTML = "Add"
        toast.info(`Item Edited`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }


  const handleEdit = (e) => {
    let newstore = store.filter(item => item.id != e.id)
    setstore(newstore)
    setPass({
      siteUrl: e.siteUrl,
      username: e.username,
      password: e.password,
      id: e.id,
    })
    ref.current.innerHTML = "Save"
  }

  const handleDelete = async (e) => {
    let newstore = store.filter(item => item.id != e.id)
    setstore(newstore)
    const a = await fetch("http://localhost:3000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(e),
    })
    const res = await a.text()
    console.log(res)
    toast.info(`Item Deleted`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const handleView = () => {

    if (password.current.value) {
      if (view.current.src === "http://localhost:5173/view.svg") {
        view.current.src = "http://localhost:5173/hide.svg"
        password.current.type = "text"
      }
      else {
        view.current.src = "http://localhost:5173/view.svg"
        password.current.type = "password"
      }
    }
    else {
      alert("Enter Password")
    }
  }

  const handleCopy = (e) => {
    navigator.clipboard.writeText(e).then(() => {
    toast.success(`${e} copied to clipboard`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
  }



  return (
    <>
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='text-2xl flex flex-col justify-center items-center h-42'>
        <div>
          <span className='text-green-500 font-bold'>&lt;</span>
          <span className='font-bold'>Pass</span>
          <span className='text-green-500 font-bold'>Op/&gt;</span>
        </div>
        <span className='text-sm'>Manage All Your Password At One Place.</span>
      </div>
      <div className='flex items-center flex-col'>
        <input type="email" className='bg-white border border-green-600 rounded-full text-sm h-8 w-150 p-2 m-2' placeholder='Enter site URL' onChange={handleChange} name='siteUrl' value={pass.siteUrl} />
        <input type="text" className='bg-white border border-green-600 rounded-full text-sm h-8 w-150 p-2' placeholder='Enter Username' name='username' onChange={handleChange} value={pass.username} />
        <input ref={password} type="password" className='bg-white border border-green-600 rounded-full text-sm h-8 w-150 p-2 m-2' placeholder='Enter Password' name='password' onChange={handleChange} value={pass.password} />
        <img ref={view} onClick={handleView} className='relative bottom-9 left-70 cursor-pointer' src="/view.svg" alt="" />
        <button className='cursor-pointer flex flex-row justify-center items-center bg-green-400 px-5 py-1 rounded-full gap-5 border border-black ' onClick={handleAdd}>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            style={{ height: 30, width: 30 }}>
          </lord-icon>
          <span ref={ref} className='text-black font-bold'>Add</span>
        </button>
      </div>

      <div className='flex justify-center mt-5'>
        {!store.length ? <span className='font-bold'>No passwords to show</span> :
          <div className='flex justify-around w-300 bg-green-700 rounded-t-2xl'>
            <div className='w-4/12 text-center  py-2 border border-black rounded-tl-2xl font-bold text-white'>Site URL</div>
            <div className='w-3/12 text-center border border-black py-2 font-bold text-white'>Username</div>
            <div className='w-3/12 text-center py-2 border border-black font-bold text-white'>Password</div>
            <div className='py-2 w-2/12 text-center border border-black rounded-tr-2xl font-bold text-white'>Edit / Delete</div>
          </div>
        }
      </div>

      {
        store.map(item => {
          return (<div key={item.id} className='flex justify-center'>
            <div className='flex justify-around w-300 py-1 items-center bg-gray-100  '>
              <div className='w-4/12 flex justify-center gap-2'>
                <span>{item.siteUrl}</span>
                <lord-icon
                  className="cursor-pointer"
                  onClick={() => handleCopy(item.siteUrl)}
                  src="https://cdn.lordicon.com/depeqmsz.json"
                  trigger="hover"
                  style={{ height: 20, width: 20 }}>
                </lord-icon>
              </div>
              <div className='w-3/12 flex justify-center gap-2'>
                <span>{item.username}</span>
                <lord-icon
                  className="cursor-pointer"
                  onClick={() => handleCopy(item.username)}
                  src="https://cdn.lordicon.com/depeqmsz.json"
                  trigger="hover"
                  style={{ height: 20, width: 20 }}>
                </lord-icon>
              </div>
              <div className='w-3/12 flex justify-center gap-2'>
                <span>{"*".repeat(item.password.length)}</span>
                <lord-icon
                  className="cursor-pointer"
                  onClick={() => handleCopy(item.password)}
                  src="https://cdn.lordicon.com/depeqmsz.json"
                  trigger="hover"
                  style={{ height: 20, width: 20 }}>
                </lord-icon>
              </div>
              <div className='w-2/12 flex justify-center gap-2'>
                <button className='pr-8 cursor-pointer' onClick={() => handleEdit(item)}>
                  <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    style={{ height: 30, width: 30 }}>
                  </lord-icon>
                </button>
                <button className='cursor-pointer' onClick={() => handleDelete(item)}>
                  <lord-icon
                    src="https://cdn.lordicon.com/hwjcdycb.json"
                    trigger="hover"
                    style={{ height: 30, width: 30 }}>
                  </lord-icon>
                </button>
              </div>
            </div>
          </div>)
        })
      }


    </>
  )
}

export default App
