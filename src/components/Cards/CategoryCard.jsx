import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; // Import PropTypes
import '../../App.css'; // Assuming your custom CSS is in App.css

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card border-2 shadow-sm position-relative overflow-hidden text-center"
            style={{
                borderRadius: "10px",
                transition: "all 0.3s ease",
                cursor: "pointer",
            }}
            onClick={() => navigate(`/policy?category=${category?.name}`)}
        >
            {/* Offer Badge */}
            <div
                className="position-absolute top-0 end-0 rounded-start py-2 px-2"
                style={{
                    top: 10,
                    backgroundColor: "#ffcc00", // Yellow background for the badge
                    color: "#fff", // White text color
                    fontWeight: "bold",
                    zIndex: 10,
                }}
            >
                {category.offer}
            </div>

            {/* Card Body */}
            <div className="card-body d-flex flex-column align-items-center justify-content-center mt-2">
                {/* Category Name as Heading */}
                <h5 className="card-title mb-3 fw-bold">{category.name}</h5>

                {/* Card Image */}
                <img
                    src={category.logo}
                    alt={category.name}
                    className="card-img-top"
                    style={{
                        height: "70px",
                        width: "100px",
                        marginBottom: "10px",
                    }}
                />

                {/* Description */}
                <p className="card-text text-muted">
                    {category.description}
                </p>
            </div>
        </div>
    );
};

// Prop types validation
CategoryCard.propTypes = {
    category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        offer: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default CategoryCard;
