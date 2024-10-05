import axios from "axios"
import { Button, Spinner, TextInput, useThemeMode } from "flowbite-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { productList } from "../../Redux/Features/productSlice"

function ModalAddProduct() {
    const mode = useThemeMode()
    const [name, setName] = useState('')
    const [unite_price, setUnitePrice] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('https://inventory.vito.web.id/api/product/create', {name, unite_price}, {
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
                    dispatch(productList())
                }
            });
            Toast.fire({
                icon: "success",
                title: res.data.message,
                });
            setError(null)
            setName('')
            setUnitePrice(0)
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            {/* <!-- Main modal --> */}
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New Product
                            </h3>
                            <button onClick={() => setError(null)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${error?.errors?.name ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Name</label>
                                    <TextInput name="name" value={name} className="" id="name" type="text" onChange={(e) => setName(e.target.value)} color={error?.errors?.name ? 'failure' : 'gray'}/>
                                    {error?.errors?.name && <><span className="text-red-600 text-xs">{error?.errors?.name[0]}</span></>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="unite_price" className={`block mb-2 text-sm font-medium ${error?.errors?.unite_price ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Unite price</label>
                                    <TextInput name="unite_price" value={unite_price} className="" id="unite_price" type="text" onChange={(e) => setUnitePrice(e.target.value)} color={error?.errors?.unite_price ? 'failure' : 'gray'}/>
                                    {error?.errors?.unite_price && <><span className="text-red-600 text-xs">{error?.errors?.unite_price[0]}</span></>}
                                </div>
                            </div>
                            <Button type="submit" color={'blue'} className="mt-4 w-full">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : 'Add New product'}</Button>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ModalAddProduct