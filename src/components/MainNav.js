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
import { addToHistory } from "../../lib/userData";
import { readToken, removeToken } from "../../lib/authenticate";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();
  const router = useRouter();

  async function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);
    if (searchField) {
      let queryString = `title=true&q=${searchField}`;
      router.push(`/artwork?${queryString}`);
      setSearchHistory(await addToHistory(queryString));
      setSearchField("");
    }
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

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
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(!isExpanded)}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
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
            )}
            {!token && (
              <Nav>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(!isExpanded)}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>

                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={() => setIsExpanded(!isExpanded)}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
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
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
