import { Breadcrumb, Button, Spinner, Table } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import { HiChartPie } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import ModalChangeRole from "../../Components/Modal/ModalChangeRole"
import { setOpen } from "../../Redux/Features/setOpenModal"
import { useEffect, useState } from "react"
import { userList } from "../../Redux/Features/userSlice"

const ChangeRole = () => {
    const dispatch = useDispatch()
    let users = useSelector(state => state.user.userList.data)
    const loading = useSelector(state => state.user.userList.loading)

    useEffect(() => {
        dispatch(userList())
    }, [dispatch])

    const [userid, setUserid] = useState(null)

    const clickModal = (userid) => {
        dispatch(setOpen('changeRole'))
        setUserid(userid)
    }


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
                    <Breadcrumb.Item>Change Role</Breadcrumb.Item>
                </Breadcrumb>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                        <Table.HeadCell>No</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                loading ? (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell colSpan={4} className="text-center py-4 text-gray-500 dark:text-gray-400">
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
                                            <Table.Cell>
                                                {user.role}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button onClick={() => clickModal(user.id)} color={'blue'} size={'xs'}>Change</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )
                            }
                        </Table.Body>
                    </Table>
                        <ModalChangeRole userid={userid}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeRole