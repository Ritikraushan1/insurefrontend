
const HeroSection = () => {
    return (
        <div className="container p-0" style={{
            zIndex: 0,
        }}>
            {/* Hero Section with background */}
            <div className="row no-gutters vh-100 align-items-center">
                {/* Left Section */}
                <div className="col-12 col-md-6 text-md-left px-4">
                    <h1 className="display-4 fw-bold text-dark mb-4">
                        Your New Insurance Friends
                    </h1>
                    <p className="lead text-dark mb-6">
                        Welcome to India’s Leading Insurance Broker
                        servicing its customer through 4000
                        distributors in over 2500 locations in India. We offer personalized insurance solutions to make your life easier.
                    </p>
                    <button className="btn btn-warning btn-lg">
                        Get Started
                    </button>
                </div>

                {/* Right Section (Image in Circular Box) */}
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src="/hero/hero1.svg" // Replace with your image path
                        alt="Insurance"
                        className="w-50 h-100 object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
