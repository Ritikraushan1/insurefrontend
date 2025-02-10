import { useState } from 'react';
import { useUser } from '../config/context/userContext';
import '../App.css';
import { AuthService } from '../api/authApi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State for logout confirmation modal

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user, setUser } = useUser(); // Assuming `setUser` is available for logout

  const handleLogout = async () => {
    const response = await AuthService.logout();
    console.log("response after logout", response);
    
    // Clear user session
    localStorage.removeItem('user');
    setUser(null);
    setIsLogoutModalOpen(false); // Close the modal after logout
    window.location.reload()
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-light shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center mx-5">
          {/* Logo Section */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/logo/ia_logo.png"
              alt="Infoaxon Insurance Portal"
              width={100}
              height={50}
            />
          </a>

          {/* Toggle Button for Mobile View */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            {/* Main Menu Section */}
            <div className="d-flex flex-row justify-content-center align-items-center w-100">
              <ul className="navbar-nav d-flex flex-column flex-lg-row w-100 justify-content-lg-center">
                <li className="nav-item mx-lg-2">
                  <a className="nav-link text-black" href="/">Home</a>
                </li>
                {user ? (
                  <>
                    <li className="nav-item mx-lg-2">
                      <a className="nav-link text-black" href="/users">Dashboard</a>
                    </li>
                    <li className="nav-item mx-lg-2">
                      <a className="nav-link text-black" href="/policy">Buy Policy</a>
                    </li>
                    <li className="nav-item mx-lg-2">
                      <a className="nav-link text-black" href="/apply-claims">Apply Claims</a>
                    </li>
                    <li className="nav-item mx-lg-2">
                      <a className="nav-link text-black" href="/users">Profile</a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item mx-lg-2">
                      <a className="nav-link text-black" href="/policy">Policy</a>
                    </li>
                    <li className="nav-item mx-lg-2">
                      <a className="nav-link text-black" href="/apply-claims">Pages</a>
                    </li>
                  </>
                )}
                <li className="nav-item mx-lg-2">
                  <a className="nav-link text-black" href="/about">About Us</a>
                </li>
                <li className="nav-item mx-lg-2">
                  <a className="nav-link text-black" href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* User Login/Profile Section */}
            <div className="d-flex justify-content-center align-items-center mt-3 mt-lg-0">
              {user ? (
                <button
                  className="btn btn-secondary d-flex align-items-center"
                  onClick={() => setIsLogoutModalOpen(true)} // Show the logout modal
                >
                  <div
                    className="avatar d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      fontSize: '18px',
                      marginRight: '10px',
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                  Hi, {user.name}
                </button>
              ) : (
                <a className="btn btn-primary" href="/login">Login</a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="logoutModalLabel"
          aria-hidden="true"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">Logout Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsLogoutModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to log out?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
