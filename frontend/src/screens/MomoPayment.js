import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ericssonrwandadeveloperapi.portal.azure-api.net/docs/services/collection/operations/RequesttoPay/console", // Assuming the backend route is '/api/payment'
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjU4YTc1YmUwLTM1Y2YtNDE0MC1iZGNlLWZhYmNlNjY5NzZlNiIsImV4cGlyZXMiOiIyMDIzLTA3LTAyVDE4OjAyOjM1LjYxMzg4MSIsInNlc3Npb25JZCI6IjQ0MzEwN2EwLWU3YTktNGZmZi05ODYzLTRhZGU3NTAwYzY3YiJ9.agShfp3aqdPqA5q8e-n5epjMM2pUB9wnWcJWokXYSqB3mwj69FhKmz2lcg-vHisUXzuvmUzyRyrz8z8Y2MbfGZ_nE953wvjOOPFmrz-zHBJOToC03LvdoyloqrDl3mMeAcSSq_TuzZLULOOO7oQvNK2dBpxThZ4D-TjndhhljNmFCiTB9QK3ov9dA4jia2AaBpOO3E-UkKHmGyjtHekEhIos0KWuyG-sX99G6JLDjrOXgzrzfTp3whmW17mshv-aMkYPV4t0MQo6DGF_T5I5loRLW48RYGO_7-GzmvbEjcSrOGROqxTYZqeSg3HAKS0pjxPVa2uzwvO9W4jQbliQUA`,
            "X-Reference-Id": "9639a003-543e-4a5c-9fe6-c1ff5c1430e2",
            "X-Target-Environment": "mtnrwanda",
            "Ocp-Apim-Subscription-Key": "c798a73214f341f79a45bc801150b8b4",
          },
          body: {
            amount,
            customerName,
            currency,
            externalId: `250${customerPhone}`,
            payer: {
              partyIdType: "MSISDN",
              partyId: `250780486359`,
            },
            payerMessage: `You received payment from ${customerName}`,
            payeeNote: `You received payment from ${customerName}`,
          },
        }
      );

      console.log("Success:", response.data);
      // Handle success response as per your requirements
    } catch (error) {
      console.log("Error:", error);
      // Handle error response as per your requirements
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="customerName">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="customerEmail">
        <Form.Label>Customer Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter customer email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="currency">
        <Form.Label>Currency</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="customerPhone">
        <Form.Label>Customer Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter customer phone"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PaymentForm;
