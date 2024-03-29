import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store.js';
import MessageBox from '../components/MessageBox.js';
import Card from 'react-bootstrap/Card';
import Photo from '../components/Icya.PNG';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Your property</title>
      </Helmet>
      <h1>Kurikirana</h1>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Ntacyo mwahisemo. <Link to="/list">Hitamo</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    {item &&
                    (item.category === 'Indangamuntu' ||
                      item.category === 'Uruhushya rwo gutwara' ||
                      item.category === 'Passport' ||
                      item.category === "Icyangombwa cy'ubutakaka") ? (
                      <Col md={4}>
                        <img
                          src={Photo}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                    ) : (
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                    )}
                    <Col md={3}></Col>
                    <Col md={3}>Igiciro cya serivise: {item.price} RWF</Col>

                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash btn_icon"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Ibyo mwatoye: (
                    {cartItems.reduce((a, c) => a + c.quantity, 0)} )
                  </h3>
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} RWF
                </ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Komeza
                  </Button>
                </div>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
