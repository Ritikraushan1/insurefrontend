import { useLocation } from "react-router-dom"
import ApplyClaimForm from "../Forms/ApplyClaim"
import { useUser } from "../../config/context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ApplyClaim = () => {
    const navigate = useNavigate()
    const { user } = useUser();
    const location = useLocation()
    const { state } = location
    const { policy } = state || {};
    console.log("policy in make claim", policy);
    useEffect(() => {
            const timer = setTimeout(() => {
                if (!user) {
                    navigate("/login"); // Redirect to login if the user is not logged in
                } 
            }, 2000);
    
            return () => clearTimeout(timer); // Cleanup timer
        }, [user, navigate]);
    
    return (
        <>
            <ApplyClaimForm policy={policy} />
        </>
    )
}

export default ApplyClaim