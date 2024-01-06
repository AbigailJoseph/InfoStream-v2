import NavbarView from './Navbar';
import {auth} from '../../server/firebase-config'
import 'bootstrap/dist/css/bootstrap-grid.min.css';




const Header = () => {
    const style = {
      backgroundColor: '#9356CA',
      // Add other styles as needed
  };
  return (
    <header style = {style}>
      <div className="navbar">
        <a href="/" className="logo">
            InfoStream
          </a>
          <div className='nav-item'>
            <NavbarView />
          </div>
          <p className='nav-item'>{auth.currentUser?.displayName}</p>
      </div>
    </header>

  // <Navbar expand="lg" className="bg-body-tertiary btn">
  // <Container>
  //   <Navbar.Brand href="/">Infostream</Navbar.Brand>
  //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //   <Navbar.Collapse id="basic-navbar-nav">
  //     <Nav className="me-auto">
  //       <Nav.Link href="/">Home</Nav.Link>
  //        <NavDropdown title="Topics" id="basic-nav-dropdown">
  //        <NavDropdown.Item href="/entertainment">Entertainment</NavDropdown.Item>
  //         <NavDropdown.Item href="/business">Business</NavDropdown.Item>
  //         <NavDropdown.Item href="/technology">Technology</NavDropdown.Item>
  //         <NavDropdown.Item href="/science">Science</NavDropdown.Item> 
  //       </NavDropdown>
  //       <Nav.Link href="/saved">Saved Articles</Nav.Link>
  //       <Nav.Link href="/login">Login</Nav.Link>
  //     </Nav>
  //   </Navbar.Collapse>
  // </Container>
  // </Navbar>

  );
};

export default Header;