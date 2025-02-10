import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PolicyService } from "../../../api/policyApi";
import { Button, Form, Table } from "react-bootstrap";

const AllPolicyTable = () => {
    const [allPolicy, setAllPolicy] = useState([]);
    const [filteredPolicies, setFilteredPolicies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all"); // 'all' or 'active'
    const navigate = useNavigate();

    useEffect(() => {
        const getAllPolicy = async () => {
            const response = await PolicyService.getAllPolicy();
            if (response.status === "success") {
                setAllPolicy(response.data.policies);
                setFilteredPolicies(response.data.policies); // Initially show all
            }
        };
        getAllPolicy();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this policy?")) {
            console.log("Deleting policy with ID:", id);
            // API call to delete
        }
    };

    const handleUpdate = (policy) => {
        navigate("/policy/edit-policy", { state: { policyData: policy } });
    };

    const handlePolicyActive = async (policy) => {
        const newStatus = !policy.isActive; // Toggle status
        if (window.confirm(`Are you sure you want to mark this policy as ${newStatus ? "Active" : "Inactive"}?`)) {
            try {
                const response = await PolicyService.updatePolicyStatus(policy.policyId, newStatus);
                console.log("response after updating", response);
                
                if (response.status === "success") {
                    setAllPolicy((prevPolicies) =>
                        prevPolicies.map((p) =>
                            p.id === policy.id ? { ...p, isActive: newStatus } : p
                        )
                    );
                }
            } catch (error) {
                console.error("Error updating policy status:", error);
            }
        }
    };

    // Filter policies based on search and active status
    useEffect(() => {
        let filtered = allPolicy.filter((item) =>
            item.policyName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filterType === "active") {
            filtered = filtered.filter((item) => item.isActive);
        }

        setFilteredPolicies(filtered);
    }, [searchTerm, filterType, allPolicy]);

    return (
        <div className="container mt-4 py-5">
            <h2 className="mb-3">All Policies</h2>

            {/* Header: Search & Filter Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by Policy Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-50"
                />
                <div>
                    <Button
                        variant={filterType === "all" ? "primary" : "outline-primary"}
                        className="me-2"
                        onClick={() => navigate("/policy/add-policy")}
                    >
                        Add New POlicy
                    </Button>
                    <Button
                        variant={filterType === "all" ? "primary" : "outline-primary"}
                        className="me-2"
                        onClick={() => setFilterType("all")}
                    >
                        Show All Policies
                    </Button>
                    <Button
                        variant={filterType === "active" ? "success" : "outline-success"}
                        onClick={() => setFilterType("active")}
                    >
                        Show Only Active Policies
                    </Button>
                </div>
            </div>

            {/* Policies Table */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Policy Name</th>
                        <th>Premium Amount</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPolicies.length > 0 ? (
                        filteredPolicies.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.policyName}</td>
                                <td>{item.premiumAmount}</td>
                                <td>{item.duration}</td>
                                <td>
                                    <Button
                                        variant={item.isActive ? "danger" : "success"}
                                        onClick={() => handlePolicyActive(item)}
                                    >
                                        {item.isActive ? "Mark Inactive" : "Mark Active"}
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => handleUpdate(item)} // ✅ Navigate with policy data
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No policies found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AllPolicyTable;
