/*********************************************************************************
 *  WEB422 – Assignment 6
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Renato Cordova Student ID: 153325238 Date: Nov 29, 2024
 *
 ********************************************************************************/

import { Container, Row, Col, Image } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col md={15} className="position-relative">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            rounded
            fluid
            className="position-relative d-block mx-auto"
          />
        </Col>
      </Row>
      <Row className="mx-auto">
        <Col md={14}>
          <h1
            style={{
              fontFamily: "serif",
              textAlign: "center",
              padding: "0.5rem 0 0 0",
            }}
          >
            Welcome to{" "}
            <span
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "0.15rem",
              }}
            >
              THE MET
            </span>{" "}
            Collection
          </h1>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially "the
            Met," is the largest art museum in the United States. With 6,479,548
            visitors to its three locations in 2019, it was the fourth most
            visited art museum in the world. Its permanent collection contains
            over two million works, divided among 17 curatorial departments. The
            main building at 1000 Fifth Avenue, along the Museum Mile on the
            eastern edge of Central Park in Manhattan's Upper East Side, is by
            area one of the world's largest art galleries.{" "}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Wiki
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
