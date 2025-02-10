import CardComponent from "../Cards/CardComponent";
import { useUser } from "../../config/context/userContext";
import { useEffect, useState } from "react";
import { CategoryService } from "../../api/categoryApi";
import { PolicyService } from "../../api/policyApi";
import { useNavigate } from "react-router-dom";

const Admindashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [category, setCategory] = useState([]);
    const [allPolicy, setAllPolicy] = useState([]);
    const [activePolicy, setActivePolicy] = useState([]);

    const fetchCategory = async () => {
        const response = await CategoryService.getAllCategory();
        setCategory(response.data.categories);
    };

    const fetchAllPolicy = async () => {
        const response = await PolicyService.getAllPolicy();
        setAllPolicy(response.data.policies);
    };

    const fetchActivePolicy = async () => {
        const response = await PolicyService.getAllActivePolicy();
        setActivePolicy(response.data.policies);
    };

    useEffect(() => {
        fetchCategory();
        fetchAllPolicy();
        fetchActivePolicy();
    }, []);

    return (
        <div className="container py-5">
            {/* Cards in a row */}
            <div className="flex flex-wrap justify-between gap-4">
                <CardComponent title="Category Added" value={category?.length} />
                <CardComponent title="All Policy" value={allPolicy?.length} />
                <CardComponent title="Active Policy" value={activePolicy?.length} />
            </div>

            {/* View All Policies Button */}
            <div className="mt-4 d-flex justify-content-center gap-3">
                <button
                    onClick={() => navigate("/policy/all-policy")}
                    className="btn btn-primary"
                >
                    View All Policies
                </button>
                <button
                    onClick={() => navigate("/dynamic-form")}
                    className="btn btn-secondary"
                >
                    Go To Form Builder
                </button>
                <button
                    onClick={() => navigate("/admin/tickets")}
                    className="btn btn-secondary"
                >
                    Go to Tickets
                </button>
            </div>

        </div>
    );
};

export default Admindashboard;
