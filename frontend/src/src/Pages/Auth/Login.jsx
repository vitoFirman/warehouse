import { Alert, Button, Card, Spinner, TextInput, useThemeMode } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import loginBg from '../../assets/image/bg.jpg'


const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            navigate('/dashboard')
        }
    })
    const mode = useThemeMode()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [validationError, setValidationError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('https://inventory.vito.web.id/api/auth/login', formData)
            const token = res.data.token
            localStorage.setItem('token', token)
            navigate('/dashboard')
        } catch (error) {
            if(error.response.data.status) {
                setError(error.response.data.message)
                setValidationError(null)
            } else {
                setValidationError(error.response.data)
                setError(null)
            }
        } finally {
            setLoading(false)
        }
    }

    const style = {backgroundImage: `url(${loginBg})`, backgroundSize: 'cover'}
    
    return (
        <section className="min-h-screen" style={style}>
            <div className="flex justify-center items-center">
                <Card className="mt-20">
                    <a href="https://flowbite.com/" className="flex items-center justify-center space-x-3 rtl:space-x-reverse my-3">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-10 w-10 md:h-14 md:w-14" alt="Flowbite Logo" />
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a>
                    {/* <p className={`text-lg font-light md:text-2xl mb-3 ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Sign In To Your Account</p> */}
                    {
                        error && (
                        <Alert color="failure" className="flex items-center justify-center">
                            <p className="text-xs md:text-base">{error}</p>
                        </Alert>
                        )
                    }
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="username" className={`text-sm mb-2 block ${validationError?.errors?.username ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>username</label>
                            <TextInput className="md:w-[450px] mb-1" value={formData.username} id="username" type="text" color={validationError?.errors?.username ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, username: e.target.value})}/>
                            {validationError?.errors?.username && <><span className="text-red-600 text-xs">{validationError?.errors?.username[0]}</span></>}
                        </div>
                        <div>
                            <label htmlFor="password" className={`text-sm mb-2 block ${validationError?.errors?.password ? 'text-red-600 ' : mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>password</label>
                            <TextInput className="md:w-[450px] mb-1" value={formData.password} id="password" type="password" color={validationError?.errors?.password ? 'failure' : 'gray'} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                            {validationError?.errors?.password && <><span className="text-red-600 text-xs">{validationError?.errors?.password[0]}</span></>}
                        </div>
                        <Button type="submit">{loading ? (<><Spinner color="warning" aria-label="Success spinner example" /></>) : 'Login'}</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}

export default Login