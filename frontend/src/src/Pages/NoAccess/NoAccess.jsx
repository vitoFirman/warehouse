import { Card } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"

const NoAccess = () => {
    return (
        <div className="min-h-screen">
            <NavbarComponent/>
            <div className="p-4 sm:ml-64 mt">
                <div className="mt-16">
                    <Card className="">
                        <p className="md:text-2xl dark:text-white text-center">You do not have access to this page</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default NoAccess