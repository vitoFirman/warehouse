import PropTypes from "prop-types"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { checkAbility } from "../../Config/CheckAbility";

const Administration = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        const checkPermission = async () => {
            const hasAbility = await checkAbility('manage-users'); 
            if (!hasAbility) {
                navigate('/no-access');
            }
        };

        checkPermission();
    }, [navigate]);

    return (
        <div className="administration-container">
            {children}
            <Outlet/>
        </div>
    )
}

export default Administration

Administration.propTypes = {
    children: PropTypes.node
}