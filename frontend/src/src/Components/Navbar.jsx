import { Avatar, DarkThemeToggle, Dropdown } from "flowbite-react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../Redux/Features/userSlice"
import SidebarComponent from "./Sidebar"
import { setOpen } from "../Redux/Features/setOpenSidebar"
import { IoClose, IoMenu } from "react-icons/io5";
import { baseUrl } from "../Config/Axios"

const NavbarComponent = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const user = useSelector(state => state.user.fetchUser.data)
  const open = useSelector(state => state.sidebar.open)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      navigate('/')
    } else {
      dispatch(fetchUser())
    }
  }, [dispatch, navigate])

  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.post(`${baseUrl}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

    return (
      <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button onClick={() => dispatch(setOpen())} type="button" className="inline-flex items-center p-2 text-2xl text-gray-500 rounded-lg sm:hidden">
                <span className="sr-only">Open sidebar</span>
                <div className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                  {open ? <IoClose /> : <IoMenu />}
                </div>
            </button>
            <a href="#" className="ms-2 hidden md:flex md:me-24">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MyInventory</span>
            </a>
          </div>
          <div className="flex gap-4">
            <DarkThemeToggle/>
          <Dropdown
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
          arrowIcon={false}
          inline
        >
          <Dropdown.Header>
            <span className="block text-sm">{user?.name}</span>
            <span className="block truncate text-sm font-medium">{user?.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => handleLogout()}>Sign out</Dropdown.Item>
        </Dropdown>
          </div>
        </div>
      </div>
      </nav>
      <SidebarComponent/>
      </>
    )
}

export default NavbarComponent