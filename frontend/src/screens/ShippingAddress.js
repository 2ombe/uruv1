import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/Checksteps";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function ShippingAddress() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [umudugudu, setMudugudu] = useState(shippingAddress.umudugudu || "");
  const [akagali, setKagali] = useState(shippingAddress.akagali || "");
  const [umurenge, setMurenge] = useState(shippingAddress.umurenge || "");
  const [akarere, setKarere] = useState(shippingAddress.akarere || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "RW");
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, umudugudu, akagali, umurenge, akarere, phone },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, umudugudu, akagali, umurenge, akarere, phone })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Imwirondoro</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Amazina yombi</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Umudugudu</Form.Label>
            <Form.Control
              value={umudugudu}
              onChange={(e) => setMudugudu(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Akagali</Form.Label>
            <Form.Control
              value={akagali}
              onChange={(e) => setKagali(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Umurenge</Form.Label>
            <Form.Control
              value={umurenge}
              onChange={(e) => setMurenge(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Akarere</Form.Label>
            <Form.Control
              value={akarere}
              onChange={(e) => setKarere(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nomero ya telephone</Form.Label>
            <PhoneInput
              defaultCountry="RW"
              value={phone}
              onChange={setPhone}
              placeholder="+250 789654567"
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Komeza
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
