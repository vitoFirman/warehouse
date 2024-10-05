import { Sidebar } from "flowbite-react";
import {  HiChartPie,  HiShoppingBag } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { PiUserListFill, PiUserSwitchFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../Redux/Features/userSlice";
import { FaCartArrowDown, FaCartPlus, FaShop, FaTruck } from "react-icons/fa6";



const SidebarComponent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user.fetchUser.data)
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/')
        } else {
            dispatch(fetchUser())
        }
    }, [dispatch, navigate])

    const path = useLocation().pathname
    return (
        <>
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                <Sidebar.Item href="/dashboard" icon={HiChartPie} active={path === '/dashboard'}>
                    Dashboard
                </Sidebar.Item>
                <Sidebar.Collapse icon={RiAdminFill} label="Administration" open={/\/administration\/.*/.test(path)} disabled={user.role !== 'admin'}>
                    <Sidebar.Item href="/administration/list-user" icon={PiUserListFill} active={path === '/administration/list-user'}>List User</Sidebar.Item>
                    <Sidebar.Item href="/administration/add-user" icon={FaUserPlus} active={path === '/administration/add-user'}>Add User</Sidebar.Item>
                    <Sidebar.Item href="/administration/change-role" icon={PiUserSwitchFill} active={path === '/administration/change-role'}>Change Role</Sidebar.Item>
                    <Sidebar.Item href="/administration/update-password" icon={GoPasskeyFill} active={path === '/administration/update-password'}>Update Password</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item href="/supplier/list" icon={FaTruck}>
                    Supplier
                </Sidebar.Item>
                <Sidebar.Item href="/product/list" icon={HiShoppingBag}>
                    Products
                </Sidebar.Item>
                <Sidebar.Collapse icon={FaShop} label="Stock" open={/\/stock\/.*/.test(path)}>
                    <Sidebar.Item href="/stock/in" icon={FaCartPlus} active={path === '/stock/in'}>Stock In</Sidebar.Item>
                    <Sidebar.Item href="/stock/out" icon={FaCartArrowDown} active={path === '/stock/out'}>Stock Out</Sidebar.Item>
                </Sidebar.Collapse>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
            </Sidebar>
        </aside>
        </>
    )
}

export default SidebarComponent