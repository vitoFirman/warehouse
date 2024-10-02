import { Breadcrumb, Table, Tooltip, useThemeMode } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import SidebarComponent from "../../Components/Sidebar"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userList } from "../../Redux/Features/userSlice";
import Swal from 'sweetalert2';
import axios from "axios";



const ListUser = () => {
    const mode = useThemeMode()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let users = useSelector(state => state.user.userList.data)
    const loading = useSelector(state => state.user.userList.loading)

    useEffect(() => {
        document.title = 'List User'
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/')
        } else {
            dispatch(userList())
        }
    }, [dispatch, navigate])

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            width: '320px',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token')
                    const res = await axios.delete(`http://localhost:3000/api/administration/user/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if(res.data.status === 200) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                                users = dispatch(userList())
                            }
                        })
                        Toast.fire({
                            icon: "success",
                            title: res.data.message,
                            })
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: res.data.message,
                            icon: "error",
                            width: '320px'
                        });
                    }
            }
        });
    };
    

    return (
        <div className="h-screen md:min-h-screen">
            <NavbarComponent/>
            <SidebarComponent/>
            <div className="p-4 sm:ml-64 mt-16 md:px-12">
            <Breadcrumb aria-label="Solid background breadcrumb example" className="my-4 rounded-none max-w-max">
                <Breadcrumb.Item href="#" icon={HiChartPie}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">Administration</Breadcrumb.Item>
                <Breadcrumb.Item>List User</Breadcrumb.Item>
            </Breadcrumb>
            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>City</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {loading ? (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            users.map((user, index) => (
                                <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.profile.address}</Table.Cell>
                                    <Table.Cell>{user.profile.city}</Table.Cell>
                                    <Table.Cell className="flex gap-5">
                                        <Tooltip content="Edit" style={mode.mode === 'dark' ? 'light' : 'dark'}>
                                            <a href="#" className="font-medium hover:underline text-xl text-green-600 dark:text-green-500">
                                                <FaRegEdit className="hover:text-green-400" />
                                            </a>
                                        </Tooltip>
                                        <Tooltip content="Delete" style={mode.mode === 'dark' ? 'light' : 'dark'}>
                                            <a href="#" onClick={() => handleDelete(user.id)} className="font-medium text-xl text-red-600 dark:text-red-500">
                                                <FaRegTrashAlt className="hover:text-red-400" />
                                            </a>
                                        </Tooltip>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
                </div>
            </div>
        </div>
    )
}

export default ListUser