import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../../store";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    if (searchField) {
      let queryString = `title=true&q=${searchField}`;
      router.push(`/artwork?${queryString}`);
      setSearchHistory((current) => [...current, queryString]);
      setSearchField("");
    }
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary fixed-top"
        bg="dark"
        data-bs-theme="dark"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Renato</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={() => setIsExpanded(!isExpanded)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  onClick={() => setIsExpanded(!isExpanded)}
                  active={router.pathname === "/search"}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href={"/favourites"} passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={() => setIsExpanded(!isExpanded)}
                    active={router.pathname === "/favourites"}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href={"/history"} passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={() => setIsExpanded(!isExpanded)}
                    active={router.pathname === "/history"}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
