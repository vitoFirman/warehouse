import axios from "axios";
import { Button, Select, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../Config/Axios";
import Swal from "sweetalert2";
import { userList } from "../../Redux/Features/userSlice";
import PropTypes from "prop-types";

function ModalChangeRole({ open, setOpen, userid }) {
    const users = useSelector((state) => state.user.userList.data);
    const user = users.find((user) => user.id === userid);
    const [role, setRole] = useState(user?.role);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
        setRole(user.role);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post(`${baseUrl}/administration/change-role/${userid}`, {role}, {
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
                    dispatch(userList())
                    setOpen(false)
                }
            });
            Toast.fire({
                icon: "success",
                title: res.data.message,
                });
        } catch (error) {
            setError(error.response.data)
        } finally {
            setLoading(false)
        }
    };

    const handleClose = () => {
        setOpen(false)
        setError(null)
    }   

    return (
    <div>
        {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Product
                                </h3>
                                <button onClick={() => handleClose()} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                <div className="w-full mb-12">
                                <Select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value={"staff"}>Staff</option>
                                    <option value={"admin"}>Admin</option>
                                </Select>
                                {error?.errors?.role && <><span className="text-red-600 text-xs">{error?.errors?.role[0]}</span></>}
                                </div>
                                <Button type="submit" color={'blue'} className="mt-4 w-full">
                                    {loading ? (<Spinner color="warning" aria-label="Loading spinner" />) : 'Change Role'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
    </div>
    );
}

export default ModalChangeRole;

ModalChangeRole.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    userid: PropTypes.number
}
