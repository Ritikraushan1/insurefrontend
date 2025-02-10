import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';


const BoughtPolicyCard = ({ policy }) => {
    console.log("poplicy in card", policy);
    
    const navigate = useNavigate()
    // Format remaining time and premium due date
    const remainingTimeText = policy.remainingTime
        ? `${policy.remainingTime} days remaining`
        : "Policy has ended";

    const nextPremiumDueDate = new Date(policy.nextPremiumDue);
    const formattedNextPremiumDue = `${nextPremiumDueDate.toLocaleString('default', { month: 'long' })} ${nextPremiumDueDate.getFullYear()}`;

    // Generate PDF with policy details
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text("Policy Details", 10, 10);
        doc.text(`Policy Name: ${policy?.policyDetails?.policyName || "N/A"}`, 10, 20);
        doc.text(`Category: ${policy?.policyDetails?.category || "N/A"}`, 10, 30);
        doc.text(`Coverage Amount: $${policy?.policyDetails?.coverage || "N/A"}`, 10, 40);
        doc.text(`Duration: ${policy?.policyDetails?.duration || "N/A"} years`, 10, 50);
        doc.text(`Premium Amount: $${policy?.policyDetails?.premiumAmount || "N/A"}`, 10, 60);
        doc.text(`Description: ${policy?.policyDetails?.description || "N/A"}`, 10, 70);
        doc.text(`Remaining Time: ${remainingTimeText}`, 10, 80);
        doc.text(`Next Premium Due: ${formattedNextPremiumDue}`, 10, 90);
        doc.text(`Assigned On: ${new Date(policy.assignedDate).toLocaleDateString()}`, 10, 100);

        if (policy.additionalInformation) {
            doc.text(`Additional Information: ${policy.additionalInformation}`, 10, 110);
        }

        doc.save("policy_details.pdf"); // Save the PDF
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h5>{policy?.policyDetails?.policyName || "Policy Name Unavailable"}</h5>
            </div>
            <div className="card-body">
                <p><strong>Category:</strong> {policy?.policyDetails?.category || "Category Unavailable"}</p>
                <p><strong>Coverage Amount:</strong> ${policy?.policyDetails?.coverage || "Coverage Unavailable"}</p>
                <p><strong>Duration:</strong> {policy?.policyDetails?.duration || "Duration Unavailable"} years</p>
                <p><strong>Premium Amount:</strong> ${policy?.policyDetails?.premiumAmount || "Premium Unavailable"}</p>
                <p><strong>Description:</strong> {policy?.policyDetails?.description || "Description Unavailable"}</p>

                {/* Show remaining time */}
                <p><strong>Remaining Time:</strong> {remainingTimeText}</p>

                {/* Show Next Premium Due */}
                <p><strong>Next Premium Due:</strong> {formattedNextPremiumDue}</p>

                {/* Show Assigned Date */}
                <p><strong>Assigned On:</strong> {new Date(policy.assignedDate).toLocaleDateString()}</p>

                {/* Additional Info */}
                {policy.additionalInformation && (
                    <p><strong>Additional Information:</strong> {policy.additionalInformation}</p>
                )}
            </div>

            {/* Buttons at the bottom */}
            <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => navigate("/make-claim", { state: { policy } })}>
                    Apply Claim
                </button>
                <button className="btn btn-secondary" onClick={downloadPDF}>
                    Download Details
                </button>
            </div>
        </div>
    );
};

BoughtPolicyCard.propTypes = {
    policy: PropTypes.shape({
        policyDetails: PropTypes.shape({
            policyName: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            coverage: PropTypes.number.isRequired,
            duration: PropTypes.number.isRequired,
            premiumAmount: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }),
        assignedDate: PropTypes.string.isRequired,
        remainingTime: PropTypes.number,
        nextPremiumDue: PropTypes.string.isRequired,
        additionalInformation: PropTypes.string,
    }).isRequired,
};

export default BoughtPolicyCard;
