import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };
  return (
    <Form className="d-flex me-auto link" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Shyiramo nimero y'icyangombwa mushakisha cyangwa izina ryacyo..."
          aria-label="search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
