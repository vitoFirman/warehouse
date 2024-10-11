import { Breadcrumb, Button, Card, Spinner, TextInput } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import { HiChartPie } from "react-icons/hi"
import { useState } from "react"
import axios from "axios"
import { baseUrl } from "../../Config/Axios"
import Swal from "sweetalert2"

const SupplierAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        address: '',
    })

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
            const res = await axios.post(`${baseUrl}/suplier/create`, formData, {
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
                }
            });
            Toast.fire({
                icon: "success",
                title: res.data.message,
                });
                setValidationError(null)
                setFormData({
                    name: '',
                    contact_person: '',
                    phone: '',
                    email: '',
                    address: '',
                })
        } catch (error) {
            setValidationError(error.response.data.errors)
        } finally {
            setLoading(false)
        }
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
                    <Breadcrumb.Item href="#">Supplier</Breadcrumb.Item>
                    <Breadcrumb.Item>Add</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                <div>
                    <Card className="md:max-w-max">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="name" className={`block mb-2 text-sm ${validationError?.name ? 'text-red-600' : 'dark:text-white'}`}>name</label>
                                    <TextInput value={formData.name} name="name" id="name" type="text" className={`md:w-[450px]`} onChange={handleChange}/>
                                    {validationError?.name && <><span className="text-red-600 text-xs">{validationError?.name[0]}</span></>}
                                </div>
                                <div>
                                    <label htmlFor="contact_person" className={`block mb-2 text-sm ${validationError?.contact_person ? 'text-red-600' : 'dark:text-white'}`}>contact person</label>
                                    <TextInput value={formData.contact_person} name="contact_person" id="contact_person" type="text" className={`md:w-[450px]`} onChange={handleChange}/>
                                    {validationError?.contact_person && <><span className="text-red-600 text-xs">{validationError?.contact_person[0]}</span></>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className={`block mb-2 text-sm ${validationError?.phone ? 'text-red-600' : 'dark:text-white'}`}>phone</label>
                                    <TextInput value={formData.phone} name="phone" id="phone" type="text" className={`md:w-[450px]`} onChange={handleChange}/>
                                    {validationError?.phone && <><span className="text-red-600 text-xs">{validationError?.phone[0]}</span></>}
                                </div>
                                <div>
                                    <label htmlFor="email" className={`block mb-2 text-sm ${validationError?.email ? 'text-red-600' : 'dark:text-white'}`}>email</label>
                                    <TextInput value={formData.email} name="email" id="email" type="text" className={`md:w-[450px]`} onChange={handleChange}/>
                                    {validationError?.email && <><span className="text-red-600 text-xs">{validationError?.email[0]}</span></>}
                                </div>
                                <div>
                                    <label htmlFor="address" className={`block mb-2 text-sm ${validationError?.address ? 'text-red-600' : 'dark:text-white'}`}>address</label>
                                    <TextInput value={formData.address} name="address" id="address" type="text" className={`md:w-[450px]`} onChange={handleChange}/>
                                    {validationError?.address && <><span className="text-red-600 text-xs">{validationError?.address[0]}</span></>}
                                </div>
                                <Button type="submit" color={'blue'} className="mt-3">{loading ? <Spinner/> : 'Submit'}</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            <div>
            </div>
            </div>
        </div>
    )
}

export default SupplierAdd