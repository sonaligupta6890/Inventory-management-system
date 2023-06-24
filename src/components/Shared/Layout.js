import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Layout(props){
  return(
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Fruit Bucket</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>{props.children}</Container>       
    </>
  )
}

export default Layout;