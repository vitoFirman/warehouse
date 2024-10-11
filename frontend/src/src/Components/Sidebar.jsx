import { Sidebar } from "flowbite-react";
import {  HiChartPie,  HiShoppingBag } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { PiUserListFill, PiUserSwitchFill } from "react-icons/pi";
import { FaList, FaUserPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaCartArrowDown, FaCartPlus, FaShop, FaTruck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { checkAbility } from "../Config/CheckAbility";


const SidebarComponent = () => {
    const navigate = useNavigate()
    const [canManageUsers, setCanManageUsers] = useState(false)
    const [canViewSupplier, setCanViewSupplier] = useState(false);
    const [canManageSupplier, setCanManageSupplier] = useState(false);

    const open = useSelector(state => state.sidebar.open)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login')
        }
        const checkUserAbilities = async () => {
            const manageUsers = await checkAbility('manage-users')
            const viewSupplier = await checkAbility('view-suplier');
            const manageSupplier = await checkAbility('manage-suplier');

            setCanManageUsers(manageUsers);
            setCanViewSupplier(viewSupplier);
            setCanManageSupplier(manageSupplier);
        };

        checkUserAbilities();
    }, [dispatch, navigate])    

    const path = useLocation().pathname
    return (
        <>
            <Sidebar aria-label="Sidebar with multi-level dropdown example" className={`md:w-64 outline-none md:translate-x-0 border-r dark:border-gray-700 ${open ? 'w-64' : 'w-0 -translate-x-10'} duration-300 fixed z-40 pt-16 rounded-none`}>
            <a href="#" className="ms-2 flex md:hidden mb-8">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">MyInventory</span>
            </a>
            <Sidebar.Items className={`transition-all duration-300 ease-in-out md:opacity-100 md:translate-x-0 ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Sidebar.ItemGroup>
                <Sidebar.Item href="/dashboard" icon={HiChartPie} active={path === '/dashboard'}>
                    Dashboard
                </Sidebar.Item>
                {
                    canManageUsers && (
                        <Sidebar.Collapse icon={RiAdminFill} label="Administration" open={/\/administration\/.*/.test(path)}>
                            <Sidebar.Item href="/administration/list-user" icon={PiUserListFill} active={path === '/administration/list-user'}>List User</Sidebar.Item>
                            <Sidebar.Item href="/administration/add-user" icon={FaUserPlus} active={path === '/administration/add-user'}>Add User</Sidebar.Item>
                            <Sidebar.Item href="/administration/change-role" icon={PiUserSwitchFill} active={path === '/administration/change-role'} className={`${!canManageUsers ? 'hidden' : ''}`}>Change Role</Sidebar.Item>
                        </Sidebar.Collapse>
                    )
                }
                <Sidebar.Collapse icon={FaTruck} label="Supplier" open={/\/supplier\/.*/.test(path)}>{
                    canViewSupplier || canManageSupplier ? (
                            <Sidebar.Item href="/supplier/list" icon={FaList} active={path === '/supplier/list'}>
                                List Supplier
                            </Sidebar.Item>    
                        ) : (<></>)
                    }
                    {
                        canManageSupplier && (
                            <Sidebar.Item href="/supplier/add" icon={MdOutlineLibraryAdd} active={path === '/supplier/add'}>
                                Add Supplier
                            </Sidebar.Item>
                        )
                    }
                </Sidebar.Collapse>
                <Sidebar.Item href="/product/list" icon={HiShoppingBag} active={path === '/product/list'}>
                    Products
                </Sidebar.Item>
                <Sidebar.Collapse icon={FaShop} label="Stock" open={/\/stock\/.*/.test(path)}>
                    <Sidebar.Item href="/stock/in" icon={FaCartPlus} active={path === '/stock/in'}>Stock In</Sidebar.Item>
                    <Sidebar.Item href="/stock/out" icon={FaCartArrowDown} active={path === '/stock/out'}>Stock Out</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item href="/update-password" icon={IoIosSettings} active={path === '/update-password'}>
                    Settings
                </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default SidebarComponent