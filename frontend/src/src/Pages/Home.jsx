import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../Components/Navbar"
import { FaCartArrowDown, FaCartPlus, FaShoppingBag, FaUserTie } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { productList } from "../Redux/Features/productSlice";
import { Button, Table } from "flowbite-react";
import { stockIn, stockOut } from "../Redux/Features/stockSlice";
import { supplierList } from "../Redux/Features/suplierSlice";

const Dashboard = () => {
    const dispatch = useDispatch()
    const supplier = useSelector(state => state.supplier.data)
    const product = useSelector(state => state.product.data)
    const loading = useSelector(state => state.product.loading)
    const stockInList = useSelector(state => state.stock.stockIn.data)
    const stockOutList = useSelector(state => state.stock.stockOut.data)

    useEffect(() => {
        dispatch(supplierList())
        dispatch(productList())
        dispatch(stockIn())
        dispatch(stockOut())
        
    }, [dispatch])

    return (
        <div className="min-h-screen">
            <NavbarComponent/>
            <div className="p-4 sm:ml-64">
            <div className="mt-16">
            <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
                <a className="block w-full p-6 bg-red-600 hover:bg-red-500 text-white rounded-md">
                    <h5 className="text-2xl mb-5">
                        SUPPLIER
                    </h5>
                    <div className="flex flex-row">
                        <small className="text-white text-7xl">
                        <FaUserTie />
                        </small>
                        <p className="text-5xl ms-auto mt-6">
                            {supplier?.length}
                        </p>
                    </div>
                </a>
                <a className="block w-full p-6 bg-blue-600 hover:bg-blue-500 rounded-md text-white">
                    <h5 className="text-2xl mb-5">
                        PRODUCT
                    </h5>
                    <div className="flex flex-row">
                        <small className="text-white text-7xl">
                        <FaShoppingBag />
                        </small>
                        <p className="text-5xl ms-auto mt-6">
                            {product?.length}
                        </p>
                    </div>
                </a>
                <a className="block w-full p-6 bg-green-600 hover:bg-green-500 rounded-md text-white">
                    <h5 className="text-2xl mb-5">
                        STOCK IN
                    </h5>
                    <div className="flex flex-row">
                        <small className="text-white text-7xl">
                        <FaCartPlus />
                        </small>
                        <p className="text-5xl ms-auto mt-6">
                            {stockInList.length}
                        </p>
                    </div>
                </a>
                <a className="block w-full p-6 bg-yellow-600 hover:bg-yellow-500 rounded-md text-white">
                    <h5 className="text-2xl mb-5">
                        STOCK OUT
                    </h5>
                    <div className="flex flex-row">
                        <small className="text-white text-7xl">
                        <FaCartArrowDown />
                        </small>
                        <p className="text-5xl ms-auto mt-6">
                            {stockOutList.length}
                        </p>
                    </div>
                </a>
            </div>
                <div className="overflow-x-auto">
                <h2 className="dark:text-white text-3xl mt-16 mb-4">Product yang Stock nya di bawah 5</h2>
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
                            product?.filter(item => item.stock < 5).map((product, index) => (
                                <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>{product.code}</Table.Cell>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.unite_price}</Table.Cell>
                                    <Table.Cell>{product.stock}</Table.Cell>
                                    <Table.Cell className="flex gap-5">
                                        <Button size={'xs'} color={'blue'}><Link to={'/stock/in'}>Add Stock</Link></Button>
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

export default Dashboard