import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Store } from './Store.js';
import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { Link } from 'react-router-dom';
import CartScreen from './screens/CartScreen.js';
import ShippingAddress from './screens/ShippingAddress';
import SignupScreen from './screens/SignupScreen';
import PaymentMethods from './screens/PaymentMethods';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistory from './screens/OrderHistory';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';

import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

import Iyandikishe from './screens/Irandikishe';
import ProductListScreen from './screens/productListScreen copy';
import HomePage from './screens/Landing';
import PaymentForm from './screens/MomoPayment';
import TermsAndConditions from './screens/TermsScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo, acceptedTerms } = state;
  const [showTermsModel, setShowTermsModel] = useState(false);

  // const [showTermsModal, setShowTermsModal] = useState(false);
  const handleOpenTermsModal = () => {
    setShowTermsModel(true);
  };

  const handleAcceptTerms = () => {
    ctxDispatch({ type: 'ACCEPT_TERMS' });
    setShowTermsModel(false);
  };

  useEffect(() => {
    if (acceptedTerms) {
      setShowTermsModel(false);
    } else if (window.location.pathname === '/') {
      setShowTermsModel(true);
    }
  }, [acceptedTerms]);
  console.log(userInfo);
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  //we committed this

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            style={{ backgroundColor: 'rgb(6, 3, 73)' }}
            variant="dark"
            expand="lg"
          >
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/list">
                <Navbar.Brand>
                  <img
                    src="/images/capture.png"
                    width={40}
                    height={40}
                    style={{
                      borderRadius: '50%',
                    }}
                    alt="logo"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end ">
                  <Link to="/cart" className="nav-link">
                    Tumiza
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.length}
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Imyirondoro</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sohoka
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link
                      className="nav-link"
                      to="/signin"
                      onClick={handleOpenTermsModal}
                    >
                      Injira
                    </Link>
                  )}
                  {userInfo && (userInfo.isAdmin || userInfo.suAdmin) && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Amakuru</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>
                          Abyabonye ba nyirabyo
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/product">
                        <NavDropdown.Item>Ububiko</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/momo" element={<PaymentForm />} />
              <Route path="/signin" element={<Iyandikishe />} />
              <Route path="/signup" element={<SignupScreen />} />

              <Route path="/search" element={<SearchScreen />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orderHistory"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route path="/shipping" element={<ShippingAddress />} />
              <Route path="/payment" element={<PaymentMethods />} />
              {/*Admin Routes*/}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              />

              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<HomeScreen />} />
              <Route path="/terms" element={<TermsAndConditions />} />
            </Routes>
          </Container>
        </main>
        <footer>
          {showTermsModel && (
            <div className="terms-modal">
              <div className="terms-content">
                <h3>Terms and Conditions</h3>
                <p>
                  Please read and accept the terms and conditions to proceed.
                </p>
                <button className="accept-button" onClick={handleAcceptTerms}>
                  Accept
                </button>
                <Link to="/terms" className="read-terms-link">
                  Read Terms
                </Link>
              </div>
            </div>
          )}
          <div className="text-center">all right reserved @Uruvu</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
