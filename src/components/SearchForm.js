import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const SearchBtn = ({
  loading,
  searchInput,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      
       <Row >
       <Col>
          <Form.Control
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Col>
        {loading ? (
          <Button disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Searching..
          </Button>
        ) : (
          <Button type="submit">Search</Button>
        )}
       </Row>
      

    </Form>
  );
};

export default SearchBtn;
