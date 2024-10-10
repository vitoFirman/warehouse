import { Breadcrumb, Button, Pagination, Table, Tooltip, useThemeMode } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import { HiChartPie } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { productList } from "../../Redux/Features/productSlice"
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import ModalAddProduct from "../../Components/Modal/ModalAddProduct"

const ProductList = () => {
    const mode = useThemeMode()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let product = useSelector(state => state.product.data)
    const loading = useSelector(state => state.product.loading)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = product?.per_page

    useEffect(() => {
        document.title = 'Product List'
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/')
        } else {
            dispatch(productList(currentPage))
        }
    }, [navigate, dispatch, currentPage])

    const onPageChange = (page) => {
        setCurrentPage(page)
        dispatch(productList(page))
    };

    const startIndex = (currentPage - 1) * itemsPerPage;

    const [open, setOpen] = useState(false)
    return (
        <div className="min-h-screen">
            <NavbarComponent/>
            <div className="p-4 sm:ml-64">
                <div className="mt-20">
                <Breadcrumb aria-label="Solid background breadcrumb example" className="my-4 rounded-none max-w-max">
                    <Breadcrumb.Item href="#" icon={HiChartPie}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                </Breadcrumb>
                {/* <!-- Modal toggle --> */}
                <Button onClick={() => setOpen(true)} size={'xs'} color={'blue'} className="my-3">Add Product</Button>
                <ModalAddProduct open={open} setOpen={setOpen} page={currentPage}/>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                        <Table.HeadCell>No</Table.HeadCell>
                        <Table.HeadCell>Code</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Unit Price</Table.HeadCell>
                        <Table.HeadCell>Stock</Table.HeadCell>
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
                                product?.data?.map((product, index) => (
                                    <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {startIndex + index + 1}
                                        </Table.Cell>
                                        <Table.Cell>{product.code}</Table.Cell>
                                        <Table.Cell>{product.name}</Table.Cell>
                                        <Table.Cell>{product.unite_price}</Table.Cell>
                                        <Table.Cell>{product.stock}</Table.Cell>
                                        <Table.Cell className="flex gap-5">
                                            <Tooltip content="Edit" style={mode.mode === 'dark' ? 'light' : 'dark'}>
                                                <a href="#" className="font-medium hover:underline text-xl text-green-600 dark:text-green-500">
                                                    <FaRegEdit className="hover:text-green-400" />
                                                </a>
                                            </Tooltip>
                                            <Tooltip content="Delete" style={mode.mode === 'dark' ? 'light' : 'dark'}>
                                                <a href="#" className="font-medium text-xl text-red-600 dark:text-red-500">
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
                    <div className="flex my-5 overflow-x-auto sm:justify-start">
                        <Pagination currentPage={currentPage} totalPages={product.last_page ? product.last_page : 1} onPageChange={onPageChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList