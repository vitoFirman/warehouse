import { Alert, Breadcrumb, Button, Card, Spinner, TextInput } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import { HiChartPie } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../Config/Axios"
import Swal from "sweetalert2"

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    })

    const [loading, setLoading] = useState(false)
    const [failed, setFailed] = useState(null)
    const [validationError, setValidationError] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(`${baseUrl}/user/update-password`, formData, {
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
                setFailed(null)
                setValidationError(null)
        } catch (error) {
            if(error.response.data.status === 401) {
                setFailed(error.response.data.message)
                setValidationError(null)
            } else {
                setValidationError(error.response.data.errors);
                setFailed(null)
            }
        } finally {
            setLoading(false)
        }
    }

    console.log({failed, validationError});

    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Update Password'
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/')
        }
    })
    return (
        <div className="min-h-screen">
            <NavbarComponent/>
            <div className="p-4 sm:ml-64">
                <div className="mt-20">
                <Breadcrumb aria-label="Solid background breadcrumb example" className="my-4 rounded-none max-w-max">
                    <Breadcrumb.Item href="#" icon={HiChartPie}>
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Settings</Breadcrumb.Item>
                    <Breadcrumb.Item>Update Password</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                <div>
                    <Card className="md:max-w-max">
                        {
                            failed && (
                            <Alert color="failure" className="flex items-center justify-center">
                                <p className="text-xs md:text-base">{failed}</p>
                            </Alert>
                            )
                        }
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-[450px]">
                            <div>
                                <label htmlFor="current_password" className={`block mb-2 text-sm ${validationError?.current_password ? 'text-red-600' : 'dark:text-white'}`}>Current Password</label>
                                <TextInput name="current_password" id="current_password" type="text" onChange={handleChange} />
                                {validationError?.current_password && <><span className="text-red-600 text-xs">{validationError?.current_password[0]}</span></>}
                            </div>
                            <div>
                                <label htmlFor="new_password" className={`block mb-2 text-sm ${validationError?.new_password ? 'text-red-600' : 'dark:text-white'}`}>New Password</label>
                                <TextInput name="new_password" id="new_password" type="password" onChange={handleChange}/>
                                {validationError?.new_password && <><span className="text-red-600 text-xs">{validationError?.new_password[0]}</span></>}
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className={`block mb-2 text-sm ${validationError?.confirm_password ? 'text-red-600' : 'dark:text-white'}`}>Confirm Password</label>
                                <TextInput name="confirm_password" id="confirm_password" type="password" onChange={handleChange}/>
                                {validationError?.confirm_password && <><span className="text-red-600 text-xs">{validationError?.confirm_password[0]}</span></>}
                            </div>
                            <Button color={'blue'} className="mt-4" type="submit">{loading ? <Spinner/> : 'Save'}</Button>
                        </form>
                    </Card>
                </div>
            <div>
            </div>
            </div>
        </div>
    )
}

export default UpdatePassword