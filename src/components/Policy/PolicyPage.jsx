import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import to access the current URL
import { PolicyService } from "../../api/policyApi";
import PolicyCard from "../Cards/PolicyCard";
import "bootstrap/dist/css/bootstrap.min.css";

const PolicyPage = () => {
    const [policies, setPolicies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const location = useLocation(); // Get the current URL location

    useEffect(() => {
        const fetchPolicy = async () => {
            const res = await PolicyService.getAllActivePolicy();
            console.log("res after getting policy", res);

            if (res.status === "error") {
                alert(res.message);
            } else {
                setPolicies(res.data.policies);
                applyFilters(res.data.policies);
            }
        };

        const applyFilters = (allPolicies) => {
            const searchParams = new URLSearchParams(location.search);
            const category = searchParams.get("category"); // Extract the category query param

            let filtered = allPolicies;

            // Filter by category if it exists
            if (category) {
                filtered = allPolicies.filter(policy =>
                    policy.category.toLowerCase() === category.toLowerCase()
                );
            }

            setFilteredPolicies(filtered);
        };

        fetchPolicy();
    }, [location.search]); // Re-run when the URL changes

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = policies.filter(policy =>
            policy.policyName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPolicies(filtered);
    };

    return (
        <div className="container p-0 pt-5">
            <div className="mb-4 pt-5">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search policies by name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="row">
                {filteredPolicies.length > 0 ? (
                    filteredPolicies.map((item, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <PolicyCard policy={item} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <h5>No policies found for this category</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PolicyPage;
