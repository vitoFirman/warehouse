import { Breadcrumb } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import SidebarComponent from "../../Components/Sidebar"
import { HiChartPie } from "react-icons/hi"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ChangeRole = () => {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Change Role'
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/')
        }
    })
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
                <Breadcrumb.Item>Change Role</Breadcrumb.Item>
            </Breadcrumb>
            </div>
        </div>
    )
}

export default ChangeRole