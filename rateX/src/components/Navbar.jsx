import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X, ChevronDown, ChevronUp, LogOut, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Navbar = ({ currency, setCurrency, coinData }) => {

  const navLinks = [
    {
      link: 'Home',
      to: '/'
    },
    {
      link: 'Feature',
      to: '/feature'
    },
    {
      link: 'Pricing',
      to: '/pricing'
    },
    {
      link: 'Blog',
      to: '/blog'
    },
  ]
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const userID = localStorage.getItem('userID')
  const userName = localStorage.getItem('userName')
  const googleUserName = localStorage.getItem('googleUsername')

  const [dropDown, setDropDown] = useState(false)

  const handleChange = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" })
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" })
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" })
        break;
      }
      default: {
        setCurrency({ name: "eur", symbol: "€" })
        break;
      }
    }
  }

  const handleLogout = () => {

    localStorage.removeItem('userID')
    localStorage.removeItem('userName')
    googleLogout()
    localStorage.removeItem('googleUsername')
    setTimeout(() => {
      toast.success("Logged out successfully")
      navigate('/login')
    }, 2000)
    
  }

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-4">


        <Link to='/' className="flex items-center gap-2">
          <img
            className="w-24 sm:w-28"
            src="https://res.cloudinary.com/dq7ldqmy4/image/upload/v1764053959/remove.photos-removed-background_yoqt4z.png"
            alt="logo"
          />
        </Link>


        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item, idx) => (
            <Link to={item.to}
              key={idx}
              className="text-[#3A2F3B] text-lg font-medium font-mono hover:text-[#615363] transition"
            >
              {item.link}
            </Link>
          ))}
        </div>


        <div className="hidden md:flex items-center gap-4">

          <select onChange={handleChange} className="px-3 py-2 text-lg font-medium font-mono  rounded-md border border-neutral-300 bg-white">
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>

          {userID || googleUserName ? (
            <div className='flex items-center gap-2 flex-col relative'>
              <span className='text-lg font-medium font-mono text-[#3A2F3B] flex items-center gap-2'>Hi!,{userName || googleUserName}<button onClick={() => setDropDown(!dropDown)}>
                {dropDown ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button></span>
              {dropDown && (
                <div className='absolute top-10 right-0 rounded-lg border border-neutral-300 bg-white flex flex-col items-center px-4 py-2 gap-4'>
                  <button onClick={handleLogout} className=' text-red-700 flex items-center font-medium font-mono  gap-1 cursor-pointer'><LogOut size={18} />Logout</button>
                  <Link to='/aiInsights' className='flex items-center text-[#3A2F3B] text-sm font-medium font-mono gap-1 hover:underline'><Sparkles className='text-yellow-400' size={18} />AI Insights</Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/register')} className="flex items-center gap-1 text-lg font-medium font-mono drop-shadow-md text-white bg-[#3A2F3B] px-4 py-2 rounded-lg hover:scale-105 transition">
                Sign up <ArrowUpRight size={18} />
              </button>
            </>
          )}
        </div>


        <button
          className="md:hidden text-[#3A2F3B]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>


      {open && (
        <div className="md:hidden flex flex-col space-y-4 pb-4">

          {["Home", "Feature", "Pricing", "Blog"].map((item) => (
            <Link
              key={item}
              className="text-[#3A2F3B] text-lg font-medium hover:text-[#615363] transition"
            >
              {item}
            </Link>
          ))}

          <select className="px-3 py-2 text-lg font-medium rounded-md border bg-white border-neutral-300">
            <option>USD</option>
            <option>INR</option>
            <option>EUR</option>
          </select>

          {userID || googleUserName ? (
            <>
              <button onClick={handleLogout} className='text-white flex items-center px-3 py-2 rounded-lg border border-neutral-300 gap-1 cursor-pointer bg-red-500 transition-colors duration-200'><LogOut size={18} />Logout</button>
              <Link to='/aiInsights' className='flex items-center text-[#3A2F3B] text-sm font-medium font-mono gap-1  bg-yellow-400 px-3 py-2 border border-neutral-300 rounded-lg'><Sparkles size={18} />AI Insights</Link>
            </>
          ) : (

            <button onClick={()=>navigate('/register'} className="flex items-center gap-1 text-lg font-medium text-white bg-[#3A2F3B] px-4 py-2 rounded-lg">
              Sign up <ArrowUpRight size={18} />
            </button>


          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
