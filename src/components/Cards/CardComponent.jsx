// CardComponent.js
import PropTypes from 'prop-types';

const CardComponent = ({ title, value }) => {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
                <h5>{title}</h5>
                <p className="mb-0">{value}</p>
            </div>
        </div>
    );
};

CardComponent.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
};

export default CardComponent;
