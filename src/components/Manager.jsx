import React from 'react';
import { useRef, useState, useEffect } from 'react';
// import { createLogger } from 'vite';
// import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        let passwordArray;
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copytext = (text) => {
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        navigator.clipboard.writeText(text)
    }


    const savePassword = () => {
        // console.log(form)
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
        toast('Password saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }
    else{
        toast('Format should have been matched!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }
    }
    const deletePassword = (id) => {
        // console.log(form)
        let c = confirm("Do you wnat to delete the post?");
        if (c) {

            setpasswordArray(passwordArray.filter((item => item.id !== id)))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item => item.id !== id))))
            toast('password deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter((item => item.id !== id)))
    }

    const showPassword = () => {
        // alert("show the password")

        if (ref.current.src.includes("icons/eyeoff.png")) {
            // alert("eye off")
            ref.current.src = "icons/eye.png"
            passwordref.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyeoff.png"
            passwordref.current.type = "password"
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>
            <div className=" mx-auto  max-w-4xl px-40">
                <h1 className='text-4xl text-center'><span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700 font-bold ">OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website Url' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" />
                    <div className="flex md:flex-row flex-col w-full gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" />
                            <span className="absolute right-[5px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='invert' width={25} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-3 bg-green-500 rounded-full w-fit hover:bg-green-200 px-3 border-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Add password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to display</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>site</th>
                                <th className='py-2'>username</th>
                                <th className='py-2'>password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    < td className=' py-2 text-center w-32' >

                                        <div className=' flex items-center justify-center'>
                                            <a href={item.site} target='_blank'> {item.site}</a>
                                            <div className="lordicon cursor-pointer size-7" onClick={() => { copytext(item.site) }}>


                                                <lord-icon style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 text-center'>

                                        <div className="flex items-center justify-center">
                                            <span> {item.username}</span><div className="lordicon cursor-pointer size-7" onClick={() => { copytext(item.username) }}>



                                                <lord-icon style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div></td>
                                    <td className=' py-2 text-center'>

                                        <div className="flex items-center justify-center">
                                            <span> {item.password}</span><div className="lordicon cursor-pointer size-7" onClick={() => { copytext(item.password) }}>


                                                <lord-icon style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div></td>
                                    <td className=' py-2 text-center'>
                                        <span onClick={() => { editPassword(item.id) }} className='cursor-pointer'>

                                            <lord-icon
                                                src="https://cdn.lordicon.com/baxknfaw.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                        <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer'>

                                            <lord-icon
                                                src="https://cdn.lordicon.com/wpyrrmcq.json"

                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>}
                </div >
            </div >
        </>
    );
}

export default Manager;
