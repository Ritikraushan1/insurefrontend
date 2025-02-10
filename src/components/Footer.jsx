
const Footer = () => {
  return (
    <div className="w-100 bg-light shadow-sm pt-5">
      {/* Main Footer Section */}
      <div className="container py-5">
        <div className="row">
          {/* About Us Section */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img 
                src="/logo/ia_logo.png" 
                alt="Infoaxon Insurance Portal" 
                width={100} 
                height={50} 
              />
            </a>
            <p className="mt-3 text-muted">InfoAxon designs, engineers, and delivers frictionless digital experience that transform how you connect with your customers, partners, and employees.</p>
          </div>
          {/* Menu Section */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5 className="text-dark">Menu</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted">Home</a></li>
              <li><a href="/policy" className="text-muted">Policy</a></li>
              <li><a href="/about" className="text-muted">About Us</a></li>
              <li><a href="/contact" className="text-muted">Contact Us</a></li>
            </ul>
          </div>

          {/* Pages Section */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5 className="text-dark">Pages</h5>
            <ul className="list-unstyled">
              <li><a href="/privacy-policy" className="text-muted">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted">Terms and Conditions</a></li>
              <li><a href="/claims" className="text-muted">Claims</a></li>
              <li><a href="/faq" className="text-muted">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-12 col-md-3">
            <h5 className="text-dark">Newsletter</h5>
            <p className="text-muted">Subscribe to get updates and offers.</p>
            <form>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email" 
                  aria-label="Newsletter Email" 
                />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-100 bg-dark text-white py-3">
        <div className="container text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Infoaxon Insurance Portal. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;