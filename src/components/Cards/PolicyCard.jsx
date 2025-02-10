import PropTypes from "prop-types"; // Import PropTypes
import { useUser } from "../../config/context/userContext";
import { useNavigate } from "react-router-dom";

const PolicyCard = ({ policy }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleBuyNow = () => {
        navigate("/buy-policy", { state: { policy } }); // Pass policy details via state
    };

    return (
        <div className="card text-center shadow-lg m-3" style={{ maxWidth: "400px" }}>
            <div className="card-header bg-primary text-white">
                <h4>{policy.policyName}</h4>
                <span className="badge bg-light text-dark">{policy.category}</span>
            </div>
            <div className="card-body">
                <p className="card-text">
                    <strong>Coverage Amount:</strong> ${policy.coverage}
                </p>
                <p className="card-text">
                    <strong>Duration:</strong> {policy.duration} years
                </p>
                <p className="card-text">
                    <strong>Minimum Age Required:</strong> {policy.validAge} years
                </p>
                <p className="card-text text-muted">
                    {policy.description}
                </p>
            </div>
            <div className="card-footer text-muted">
                Premium Amount: ${policy.premiumAmount}
            </div>
            {user ? (
                <button className="btn btn-success" onClick={()=>handleBuyNow()}>
                    Buy Now
                </button>
            ) : (
                <button className="btn btn-warning">
                    To buy:{" "}
                    <a
                        onClick={() => navigate("/login")}
                        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                    >
                        Login First
                    </a>
                </button>
            )}
        </div>
    );
};

// Add PropTypes validation
PolicyCard.propTypes = {
    policy: PropTypes.shape({
        policyName: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        coverage: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        validAge: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        premiumAmount: PropTypes.number.isRequired,
    }).isRequired,
};

export default PolicyCard;
