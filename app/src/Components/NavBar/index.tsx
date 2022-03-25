import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { logoutThunk } from '../../slices/AppSlice'

export default function NavBar() {
  // const dispatch = useDispatch()
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={"/"}>
            GMZ Stuc
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/createmeeting"}>
                New Meeting
              </Link>
            </Nav.Link>
            {/* <Nav.Link onClick={()=>dispatch(logoutThunk())}>Logout</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
