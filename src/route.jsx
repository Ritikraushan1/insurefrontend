import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Example page
import LoginComponent from './components/Login/Signin';
import SignUpComponent from './components/SignUp/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import UserDashboard from './components/Dashboard/User/UserDashboard';
import NotFound from './components/Error/NotFound';
import PolicyPage from './components/Policy/PolicyPage';
import BuyPolicy from './components/BuyPolicy/BuyPolicy';
import ApplyClaim from './components/Claim/ApplyClaim';
import Admin from './pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import AddPolicy from './components/Admin/Policy/AddPoicy';
import AllPolicyTable from './components/Admin/Policy/AllPolicy';
import EditPolicy from './components/Admin/Policy/EditPolicy';
import DynamicForm from './components/Admin/Forms/DynamicForms';
import LoginButton from './components/NewAuth/login';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './components/NewAuth/logout';
import Profile from './components/NewAuth/profile';
import Dashboard from './components/NewAuth/Dashboard';
import MultiSectionForm from './components/Admin/MultiSectionForm/MultiSectionForm';

const RouteConfig = () => {
  const {isAuthenticated} = useAuth0()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path='/new-auth' element={<Dashboard />} />
        <Route path='/new-auth/login' element={<LoginButton />} />

        {isAuthenticated && <Route path='/new-auth/logout' element={<LogoutButton />}/>}
        {isAuthenticated && <Route path='/new-auth/profile' element={<Profile />}/>}
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/buy-policy" element={<BuyPolicy />} />
          <Route path="/make-claim" element={<ApplyClaim />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<Admin />} />
          <Route path='/policy/all-policy' element={<AllPolicyTable />}/>
          <Route path='/policy/add-policy' element={<AddPolicy />}/>
          <Route path='/policy/edit-policy' element={<EditPolicy />}/>
          <Route path='/dynamic-form' element={<DynamicForm />}/>
          <Route path='/multi-step-form' element={<MultiSectionForm />}/>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
