import { useEffect, useState } from "react";
import { useUser } from "../../../config/context/userContext";
import { useNavigate } from "react-router-dom";
import { BuyPolicyService } from "../../../api/assignPolicy";
import CardComponent from "../../Cards/CardComponent";
import BoughtPolicyCard from "../../Cards/BoughtPolicyCard"; // Import BoughtPolicyCard component
import { ClaimService } from "../../../api/claimsApi";
import ClaimCard from "../../Cards/ClaimCard";

const UserDashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [loading, setLoading] = useState(true); // Loader state
    const [boughtPolicy, setBoughtPolicy] = useState([]); // Array to store bought policies
    const [error, setError] = useState(""); // To store any error messages
    const [userClaims, setUserClaims] = useState([])

    const getUserClaims = async () => {
        try {
            const response = await ClaimService.getClaimsForUser();
            if (response.code === 404) {
                setUserClaims([])
                return;
            }
            if (response.status === "error") {
                setError(response.message)
            } else {
                setUserClaims(response.data.data)
            }
        } catch (error) {
            console.log("eror in getting claims", error);
            setError("Failed to fetch claims. Please try again later.");

        }
    }

    // Fetch all bought policies
    const getAllPolicy = async () => {
        try {
            const response = await BuyPolicyService.getAssignedPolicyForUser();
            if (response.status === "error") {
                setError(response.message); // Set error message
            } else {
                setBoughtPolicy(response.data); // Set bought policies data
            }
        } catch (err) {
            console.log(err);

            setError("Failed to fetch policies. Please try again later."); // Handle network errors
        }
    };
    console.log("bought policy", boughtPolicy);


    // UseEffect for checking user status and fetching policies
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) {
                navigate("/login"); // Redirect to login if the user is not logged in
            } else {
                getAllPolicy();
                getUserClaims() // Fetch policies when user is available
            }
            setLoading(false); // Stop loading after delay
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timer
    }, [user, navigate]); // Dependencies are user and navigate

    if (loading) {
        // Display loader while waiting for user or policies
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {user && (
                <div className="mb-4">
                    <h3>Welcome, {user.name}!</h3>
                    {/* Display Policies Bought and Claims Raised in the same row */}
                    <div className="row">
                        <div className="col-md-6">
                            <CardComponent title="Policies Bought" value={boughtPolicy.length} />
                        </div>
                        <div className="col-md-6">
                            <CardComponent title="Claims Raised" value={userClaims.length || 0} />
                        </div>
                    </div>
                </div>
            )}

            {/* Error Handling */}
            {error && (
                <div className="alert alert-danger">
                    <h5>Error fetching policies:</h5>
                    <p>{error}</p>
                </div>
            )}

            {/* Display bought policies */}
            <div className="card shadow-sm">
                <div className="card-header bg-secondary text-white">
                    <h5>Policies Bought By You</h5>
                </div>
                <div className="card-body">
                    {boughtPolicy.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {boughtPolicy.map((policy) => (
                                <div className="col" key={policy.orderId}>
                                    <BoughtPolicyCard policy={policy} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>You have not bought any policy yet.</p>
                    )}
                </div>
            </div>
            <div className=" pt-5"></div>

            {/* Display Claims Raised By User */}
            {userClaims.length > 0 && <div className="card shadow-sm">
                <div className="card-header bg-secondary text-white">
                    <h5>Claims Raised By You</h5>
                </div>
                <div className="card-body">
                    {userClaims.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {userClaims.map((claim,index) => (
                                <div className="col" key={index}>
                                    <ClaimCard claim={claim} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>You have not bought any policy yet.</p>
                    )}
                </div>
            </div>}
        </div>
    );
};

export default UserDashboard;
