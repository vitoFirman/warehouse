import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { baseUrl } from "../../Config/Axios"
import Swal from "sweetalert2"
import { setOpen } from "../../Redux/Features/setOpenModal"
import { Button, Spinner, TextInput } from "flowbite-react"
import { stockIn } from "../../Redux/Features/stockSlice"
import { format } from "date-fns";
import DatePicker from "react-datepicker"
import {id as LocaleId} from 'date-fns/locale'

import "react-datepicker/dist/react-datepicker.css";

const ModalAddStockIn = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState(null)
    const open = useSelector(state => state.modal.open)

    const [formData, setFormData] = useState({
        product_name: '',
        supplier_name: '',
        qty: 0,
        date_in: format(new Date(), 'yyyy-MM-dd'),
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(`${baseUrl}/stock/in`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    dispatch(stockIn())
                    dispatch(setOpen(null))
                }
            });
            Toast.fire({
                icon: "success",
                title: res.data.message,
            });
            setValidationError(null)
        } catch (error) {
            console.log(error);
            setValidationError(error.response.data.errors)
        } finally {
            setLoading(false)
        }
    }

    const closeModal = () => {
        dispatch(setOpen(null))
        setValidationError(null)
    }

    return (
        <div>
            {open === 'addStockIn' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Add Stock In
                                </h3>
                                <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                <div className="flex flex-col gap-4 px-3">
                                    <div>
                                        <label htmlFor="product_name" className={`block mb-2 text-sm ${validationError?.product_name ? 'text-red-600' : 'dark:text-white'}`}>Product Name</label>
                                        <TextInput value={formData.product_name} name="product_name" id="product_name" type="text" onChange={handleChange} autoComplete="off"/>
                                        {validationError?.product_name && <span className="text-red-600 text-xs">{validationError?.product_name[0]}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="supplier_name" className={`block mb-2 text-sm ${validationError?.supplier_name ? 'text-red-600' : 'dark:text-white'}`}>Supplier Name</label>
                                        <TextInput value={formData.supplier_name} name="supplier_name" id="supplier_name" type="text" onChange={handleChange} />
                                        {validationError?.supplier_name && <span className="text-red-600 text-xs">{validationError?.supplier_name[0]}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="qty" className={`block mb-2 text-sm ${validationError?.qty ? 'text-red-600' : 'dark:text-white'}`}>Quantity</label>
                                        <TextInput value={formData.qty} name="qty" id="qty" type="number" onChange={handleChange} />
                                        {validationError?.qty && <span className="text-red-600 text-xs">{validationError?.qty[0]}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="date_in" className={`block mb-2 text-sm ${validationError?.date_in ? 'text-red-600' : 'dark:text-white'}`}>Date in</label>
                                        <DatePicker selected={formData.date_in} onChange={(date) => setFormData({...formData, date_in: format(date, 'yyyy-MM-dd')})} withPortal locale={LocaleId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                        {validationError?.date_in && <span className="text-red-600 text-xs">{validationError?.date_in[0]}</span>}
                                    </div>
                                    
                                    <Button type="submit" color={'blue'} className="mt-3">{loading ? <Spinner /> : 'Save'}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalAddStockIn;
