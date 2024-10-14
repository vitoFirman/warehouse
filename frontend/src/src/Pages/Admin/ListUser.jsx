import { Breadcrumb, Button, Spinner, Table, Tooltip, useThemeMode } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { userList } from "../../Redux/Features/userSlice";
import Swal from 'sweetalert2';
import axios from "axios";
import { baseUrl } from "../../Config/Axios";



const ListUser = () => {
    const mode = useThemeMode()
    const dispatch = useDispatch()
    let users = useSelector(state => state.user.userList.data)
    const loading = useSelector(state => state.user.userList.loading)

    useEffect(() => {
            dispatch(userList())
    }, [dispatch])

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
                    const res = await axios.delete(`${baseUrl}/administration/user/delete/${id}`, {
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
        <div className="min-h-screen">
            <NavbarComponent/>
            <div className="p-4 sm:ml-64">
                <div className="mt-20">
                <Breadcrumb aria-label="Solid background breadcrumb example" className="my-4 rounded-none max-w-max">
                    <Breadcrumb.Item href="#" icon={HiChartPie}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Administration</Breadcrumb.Item>
                    <Breadcrumb.Item>List User</Breadcrumb.Item>
                </Breadcrumb>
                <Button size={'xs'} color={'blue'} className="mb-3"><Link to={'/administration/add-user'}>Add User</Link></Button>
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
                                        <Spinner size={'xl'}/>
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
                                                <a href="#" className="font-medium hover:underline text-xl text-blue-600 dark:text-blue-500">
                                                    <FaRegEdit className="hover:text-blue-400" />
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
        </div>
    )
}

export default ListUser