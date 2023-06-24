import axios from "axios";
import {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";

function AllFruits(){
    const [allFruits,setAllFruits]=useState([]);
    const [showModal,setshowModal]=useState(false);
    const [itemIdToDelete,setitemIdToDelete]=useState(0);
    const navigate=useNavigate();

    useEffect(()=>{
    axios.get("http://localhost:4000/fruits").then((response)=>{
        setAllFruits((previousState)=>{
          return response.data;
        });
    });
},[]);
  const openDeleteConfirmModalHandler=(id)=>{
    setshowModal(true);
    setitemIdToDelete(id);
  }
  const closeModalHandler=()=>{
    setshowModal(false);
    setitemIdToDelete(0);

  }
  const  confirmDeleteHandler =()=>{
    axios.delete(`http://localhost:4000/fruits/${itemIdToDelete}`)
    .then(()=>{
      setAllFruits((previousState)=>{
        return previousState.filter(_=>_.id!==itemIdToDelete);
      })
      setitemIdToDelete(0);
      setshowModal(false);

    })

  }

    return(
      <>
        <DeleteConfirmation
          showModal={showModal}
          title="Delete Warning!"
          body="Are you want to delete this item?"
          closeModalHandler={closeModalHandler}
          confirmDeleteHandler={confirmDeleteHandler}
          >
        </DeleteConfirmation>
      <Row className="mt-2">
        <Col md={{span:4, offset:4}}> 
        <Button variant="primary" type="button" onClick={()=>navigate("/add-fruit")}>
          Add A New Fruit         
        </Button>
        </Col>
      </Row>
        <Row xs={1} md={3} className="g-2">
           {allFruits.map((item) => (
              <Col key={item.id}>
                <Card>
                ,<Card.Img variant="top" src={item.imageUrl} style={{'width': '300px', 'height': '200px'}}/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                       Quantity(KG Units)-{item.quantity}
                    </Card.Text>
                    <Card.Text>
                        cost-{item.cost}
                    </Card.Text>
                    <Button variant="primary" type="button" onClick={()=>navigate(`/edit-fruit/${item.id}`)}>
                          Edit        
                    </Button>
                    <Button variant="danger" type="button" onClick={()=>{openDeleteConfirmModalHandler(item.id)}}>
                          Delete       
                    </Button>
                    </Card.Body>
            </Card>
        </Col>
      ))}
    </Row>
    </>
    )
}


export default AllFruits;