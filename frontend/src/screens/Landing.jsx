import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { GiPassport } from "react-icons/gi";
import { HiIdentification } from "react-icons/hi";
import { BsFillBagFill } from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { MdOutlineDriveEta } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FcPhoneAndroid } from "react-icons/fc";
import { CSSTransition } from "react-transition-group";
import "./HomePage.css"; // Import custom CSS for styling and animations
import SearchBox from "../components/SearchBox";

const HomePage = () => {
  const [showTitle, setShowTitle] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
  };

  React.useEffect(() => {
    setShowTitle(true);
  }, []);

  return (
    <div className="homepage">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <CSSTransition
              in={showTitle}
              timeout={1000}
              classNames="fade"
              unmountOnExit
            >
              <div>
                <h1>Lost and Found</h1>
                <p>Welcome to our Lost and Found service.</p>
              </div>
            </CSSTransition>
          </Col>
        </Row>

        <Row className="items-container">
          <Col md={3} sm={6} xs={12}>
            <Card>
              <HiIdentification
                className="link"
                style={{ fontSize: "200px" }}
              />
              <Card.Body>
                <Card.Title>ID Card</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <BsFillBagFill className="link" style={{ fontSize: "200px" }} />
              <Card.Body>
                <Card.Title>
                  Ibikapu <span>Bag</span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <GiPassport className="link" style={{ fontSize: "200px" }} />
              <Card.Body>
                <Card.Title>Passport</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <MdComputer className="link" style={{ fontSize: "200px" }} />
              <Card.Body>
                <Card.Title>
                  mudasobwa <span>Computer</span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Row className="search-container justify-content-center">
            <Col md={6} style={{ margin: "100px" }}>
              <SearchBox />
            </Col>
          </Row>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <FcPhoneAndroid className="link" style={{ fontSize: "200px" }} />
              <Card.Body>
                <Card.Title>
                  {" "}
                  Telefone <span> Phone</span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <GrCertificate className="link" style={{ fontSize: "200px" }} />
              <Card.Body>
                <Card.Title>Cyangombwa cy'ubutaka</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <MdOutlineDriveEta
                className="link"
                style={{ fontSize: "200px" }}
              />
              <Card.Body>
                <Card.Title>
                  Cyangombwa cyo gutwara <span>Permi</span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <Card>
              <FaRegAddressCard
                className="link"
                style={{ fontSize: "200px" }}
              />
              <Card.Body>
                <Card.Title>
                  Izindi karita <span>Card</span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
