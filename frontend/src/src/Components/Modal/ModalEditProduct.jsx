import { useDispatch, useSelector } from "react-redux"
import { setOpen } from "../../Redux/Features/setOpenModal"
import { Button, Spinner, TextInput } from "flowbite-react"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../Config/Axios"
import Swal from "sweetalert2"
import { productList } from "../../Redux/Features/productSlice"

const ModalEditProduct = ({code, currentPage}) => {
    const dispatch = useDispatch()
    const open = useSelector(state => state.modal.open)
    const products = useSelector(state => state.product.data?.data)
    const product = products ? products.find((product) => product.code === code) : null

    const [formData, setFormData] = useState({
        name: '',
        unite_price: ''
    })

    useEffect(() => {
        if(product) {
            setFormData({
                name: product.name,
                unite_price: product.unite_price,
            })
        }
    }, [product])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.put(`${baseUrl}/product/update/${code}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    dispatch(productList(currentPage))
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
    
    return (
        <div>
        {open === 'editProduct' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Product
                                </h3>
                                <button type="button" onClick={() => dispatch(setOpen(null))} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                                    <label htmlFor="name" className={`block mb-2 text-sm ${validationError?.name ? 'text-red-600' : 'dark:text-white'}`}>name</label>
                                    <TextInput value={formData.name} name="name" id="name" type="text" className={``} onChange={handleChange}/>
                                    {validationError?.name && <><span className="text-red-600 text-xs">{validationError?.name[0]}</span></>}
                                </div>
                                <div>
                                    <label htmlFor="unite_price" className={`block mb-2 text-sm ${validationError?.unite_price ? 'text-red-600' : 'dark:text-white'}`}>unite price</label>
                                    <TextInput value={formData.unite_price} name="unite_price" id="unite_price" type="text" className={``} onChange={handleChange}/>
                                    {validationError?.unite_price && <><span className="text-red-600 text-xs">{validationError?.unite_price[0]}</span></>}
                                </div>
                                <Button type="submit" color={'blue'} className="mt-3">{loading ? <Spinner/> : 'Save'}</Button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
    </div>
    )
}

export default ModalEditProduct

ModalEditProduct.propTypes = {
    code: PropTypes.string,
    currentPage: PropTypes.number,
}