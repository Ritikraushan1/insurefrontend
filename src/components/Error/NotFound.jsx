import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
            <h1 className="display-1 mb-3">404</h1>
            <p className="h4 mb-4">Page Not Found</p>
            <button
                onClick={() => navigate("/")}
                className="btn btn-primary btn-lg"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;