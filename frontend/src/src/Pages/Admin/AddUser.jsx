import { Breadcrumb, Button, Card, Select, Spinner, TextInput, useThemeMode } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import SidebarComponent from "../../Components/Sidebar"
import { HiChartPie } from "react-icons/hi"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2';


const AddUser = () => {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Add user'
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/')
        }
    })
    const mode = useThemeMode()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: 'staff',
        first_name: '',
        last_name: '',
        address: '',
        city: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData.role);
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('http://localhost:3000/api/administration/user/create', formData, {
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
            setError(null)
            setFormData({
                ...formData,
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                role: 'staff',
                first_name: '',
                last_name: '',
                address: '',
                city: ''
            })
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen">
            <NavbarComponent/>
            <SidebarComponent/>
            <div className="p-4 sm:ml-64 mt-16 md:px-12">
            <Breadcrumb aria-label="Solid background breadcrumb example" className="my-4 rounded-none max-w-max">
                <Breadcrumb.Item href="#" icon={HiChartPie}>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">Administration</Breadcrumb.Item>
                <Breadcrumb.Item>Add User</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <Card className="md:max-w-max">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="email" className={`text-sm mb-2 block ${error?.errors?.email ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>email</label>
                            <TextInput name="email" value={formData.email} className="md:w-[400px]" id="email" type="email" onChange={handleChange} color={error?.errors?.email ? 'failure' : 'gray'}/>
                            {error?.errors?.email && <><span className="text-red-600 text-xs">{error?.errors?.email[0]}</span></>}
                        </div>
                        <div className="md:w-[400px]">
                            <div className="mb-2 block">
                                <label htmlFor="role" className={`text-sm mb-2 block dark:text-white`}>select role</label>
                            </div>
                            <Select id="role" value={formData.role} name="role" onChange={handleChange}>
                                <option value={'staff'}>staff</option>
                                <option value={'admin'}>admin</option>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className={`text-sm mb-2 block ${error?.errors?.name ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>username</label>
                        <TextInput name="name" value={formData.name} className="" id="name" type="text" onChange={handleChange} color={error?.errors?.name ? 'failure' : 'gray'}/>
                        {error?.errors?.name && <><span className="text-red-600 text-xs">{error?.errors?.name[0]}</span></>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_name" className={`text-sm mb-2 block ${error?.errors?.first_name ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>first name</label>
                            <TextInput name="first_name" value={formData.first_name} className="md:w-[400px]" id="first_name" type="text" onChange={handleChange} color={error?.errors?.first_name ? 'failure' : 'gray'}/>
                            {error?.errors?.first_name && <><span className="text-red-600 text-xs">{error?.errors?.first_name[0]}</span></>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className={`text-sm mb-2 block ${error?.errors?.last_name ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>last name</label>
                            <TextInput name="last_name" value={formData.last_name} className="md:w-[400px]" id="last_name" type="text" onChange={handleChange} color={error?.errors?.last_name ? 'failure' : 'gray'}/>
                            {error?.errors?.last_name && <><span className="text-red-600 text-xs">{error?.errors?.last_name[0]}</span></>}
                        </div>
                        <div>
                            <label htmlFor="address" className={`text-sm mb-2 block ${error?.errors?.address ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>address</label>
                            <TextInput name="address" value={formData.address} className="md:w-[400px]" id="address" type="text" onChange={handleChange} color={error?.errors?.address ? 'failure' : 'gray'}/>
                            {error?.errors?.address && <><span className="text-red-600 text-xs">{error?.errors?.address[0]}</span></>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className={`text-sm mb-2 block ${error?.errors?.city ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>city</label>
                            <TextInput name="city" value={formData.city} className="md:w-[400px]" id="city" type="text" onChange={handleChange} color={error?.errors?.city ? 'failure' : 'gray'}/>
                            {error?.errors?.city && <><span className="text-red-600 text-xs">{error?.errors?.city[0]}</span></>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className={`text-sm mb-2 block ${error?.errors?.password ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>password</label>
                            <TextInput name="password" value={formData.password} className="md:w-[400px]" id="password" type="password" onChange={handleChange} color={error?.errors?.password ? 'failure' : 'gray'}/>
                            {error?.errors?.password && <><span className="text-red-600 text-xs">{error?.errors?.password[0]}</span></>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirm_password" className={`text-sm mb-2 block ${error?.errors?.confirm_password ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>confirm password</label>
                            <TextInput name="confirm_password" value={formData.confirm_password} className="md:w-[400px]" id="confirm_password" type="password" onChange={handleChange} color={error?.errors?.confirm_password? 'failure' : 'gray'}/>
                            {error?.errors?.confirm_password && <><span className="text-red-600 text-xs">{error?.errors?.confirm_password[0]}</span></>}
                        </div>
                    </div>
                    <Button type="submit" className="mt-4">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : 'Submit'}</Button>
                </form>
                </Card>
            </div>
            </div>
        </div>
    )
}

export default AddUser