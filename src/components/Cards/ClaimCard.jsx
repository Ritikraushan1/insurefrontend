import PropTypes from 'prop-types';

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const ClaimCard = ({ claim }) => {
    return (
        <div className="card shadow-sm mb-3" style={{ maxWidth: "400px" }}>
            <div className="card-body">
                <h5 className="card-title text-primary">Claim Details</h5>
                <p className="mb-1"><strong>Claim ID:</strong> {claim.id}</p>
                <p className="mb-1"><strong>Order ID:</strong> {claim.orderId}</p>
                <p className="mb-1"><strong>Policy:</strong> {claim.policyDetails.policyName}</p>
                <p className="mb-1"><strong>Reason:</strong> {claim.reason}</p>
                <p className="mb-1"><strong>Status:</strong> <span className={`badge ${claim.status === 'PENDING' ? 'bg-warning' : 'bg-success'}`}>{claim.status}</span></p>
                <p className="mb-1"><strong>Claim Date:</strong> {formatDate(claim.claimDate)}</p>
            </div>
        </div>
    );
};

ClaimCard.propTypes = {
    claim: PropTypes.shape({
        id: PropTypes.number.isRequired,
        policyDetails: PropTypes.shape({
            policyName: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            coverage: PropTypes.number.isRequired,
            duration: PropTypes.number.isRequired,
            premiumAmount: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
        }),
        orderId: PropTypes.number.isRequired,
        policyId: PropTypes.string.isRequired,
        reason: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        claimDate: PropTypes.string.isRequired,
    }).isRequired,
};

export default ClaimCard;
