import { Eye, Loader2, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormdata] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.message || "Login Successfull")
                setTimeout(()=>{
                    
                    navigate('/')
                },2000)
                localStorage.setItem("userID", data.userID)
                localStorage.setItem("userName", data.userName)
            }
            else {
                toast.error(data.message || "Invalid Cradentials")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-md bg-linear-to-tl from-[#FFEDD4] via-[#F7F3F1] to-[#FFEDD4] rounded-2xl shadow-xl p-8'>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-mono text-neutral-800">
                        Create Your Account
                    </h1>
                    <p className="text-neutral-500 text-sm mt-2 font-mono">
                        Join RateX to get Cryptocurrency Info.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-start'>
                    <label className='text-neutral-600 text-lg mt-2 font-mono'>Email:</label>
                    <input required onChange={handleChange} type="email" value={formData.email} name='email' className='px-4 py-2 rounded-lg bg-white w-full border border-neutral-300' placeholder='Enter email' />
                    <div className='relative mt-5'>
                        <label className='text-neutral-600 text-lg  font-mono'>Password:</label>
                        <input required onChange={handleChange} value={formData.password} name='password' type={showPassword ? 'text' : 'password'} className='w-full px-4 py-2 rounded-lg bg-white border border-neutral-300' placeholder='Enter password' />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-neutral-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                    {loading ? (
                        <button className='w-full mt-5 px-2 py-2 bg-[#3A2F3B] text-lg text-slate-300 rounded-lg border border-neutral-300 flex items-center justify-center gap-1'><Loader2 className='text-white animate-spin' />Login</button>
                    ) : (
                        <button type='submit' className='w-full mt-5 px-2 py-2 bg-[#3A2F3B] text-lg text-white rounded-lg border border-neutral-300 cursor-pointer'>Login</button>
                    )}
                </form>
                <div className="text-center text-sm text-neutral-600 mt-6 flex items-center justify-center gap-1">
          Dont't have account?<Link to='/register' className='text-[#3A2F3B] font-semibold hover:underline'>Register</Link>
        </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Login
