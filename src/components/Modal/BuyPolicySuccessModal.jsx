import { Modal, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes

const SuccessBuyPolicyModal = ({ show, onClose, policy, user }) => {
    const navigate = useNavigate();

    const handleDownloadPdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Insurance Summary", 20, 20);

        doc.setFontSize(12);
        doc.text(`Policy Name: ${policy.policyName}`, 20, 40);
        doc.text(`Category: ${policy.category}`, 20, 50);
        doc.text(`Coverage Amount: $${policy.coverage}`, 20, 60);
        doc.text(`Duration: ${policy.duration} years`, 20, 70);
        doc.text(`Premium Amount: $${policy.premiumAmount}`, 20, 80);
        doc.text(`Description: ${policy.description}`, 20, 90);

        doc.text(`User Details`, 20, 110);
        doc.text(`Name: ${user.name}`, 20, 120);
        doc.text(`Email: ${user.email}`, 20, 130);
        doc.text(`Age: ${user.age} years`, 20, 140);
        doc.text(`Income: $${user.income}`, 20, 150);

        doc.save("Insurance_Summary.pdf");

        // After downloading the PDF, navigate to the /users page
        navigate("/users");
    };

    const handleClose = () => {
        onClose();
        navigate("/users");
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Insurance Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Policy Details</h5>
                <p><strong>Policy Name:</strong> {policy.policyName}</p>
                <p><strong>Category:</strong> {policy.category}</p>
                <p><strong>Coverage Amount:</strong> ${policy.coverage}</p>
                <p><strong>Duration:</strong> {policy.duration} years</p>
                <p><strong>Premium Amount:</strong> ${policy.premiumAmount}</p>
                <p><strong>Description:</strong> {policy.description}</p>
                <hr />
                <h5>User Details</h5>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age} years</p>
                <p><strong>Income:</strong> ${user.income}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleDownloadPdf}>
                    Download PDF
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

// Add PropTypes validation for props
SuccessBuyPolicyModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    policy: PropTypes.shape({
        policyName: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        coverage: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        premiumAmount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        income: PropTypes.number.isRequired,
    }).isRequired,
};

export default SuccessBuyPolicyModal;
