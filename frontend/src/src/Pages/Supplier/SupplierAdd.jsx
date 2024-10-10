import { Breadcrumb, Card } from "flowbite-react"
import NavbarComponent from "../../Components/Navbar"
import { HiChartPie } from "react-icons/hi"

const SupplierAdd = () => {
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
                        
                    </Card>
                </div>
            <div>
            </div>
            </div>
        </div>
    )
}

export default SupplierAdd