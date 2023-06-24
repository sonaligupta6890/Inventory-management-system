import axios from "axios";
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function UpdateFruit(){
    const {id} = useParams();


    const fruitName= useRef("");
    const quantity= useRef("");
    const price= useRef("");
    const imageUrl= useRef("");
    const navigate = useNavigate();

    useEffect = (()=>{
        axios.get(`http://localhost:4000/fruits/${id}`).then((response)=>{
            fruitName.current.value=response.data.name;
            quantity.current.value=response.data.quantity;
            price.current.value=response.data.cost;
            imageUrl.current.value=response.data.imageUrl;

        })
    },[])
    const updateFruitHandler = ()=>{
        var payload = {
            name:fruitName.current.value,
            quantity:quantity.current.value ? Number(quantity.current.value):0,
            cost:price.current.value ? Number(price.current.value):0,
            imageUrl:imageUrl.current.value
        }
        axios.put(`http://localhost:4000/fruits/${id}`,payload)
        .then(()=>{
            navigate("/")
        })
    }
    return(
        <>
        <legend>Update</legend>
          <Form>
               <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={fruitName} />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" ref={quantity} />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formCost">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" ref={price} />
               </Form.Group>
               <Form.Group className="mb-3" controlId="formImageURL">
                    <Form.Label>ImageURL</Form.Label>
                    <Form.Control type="text" ref={imageUrl} />
               </Form.Group>
               <Button variant="primary" type="button" onClick={updateFruitHandler}>
                   Submit
               </Button>
          </Form>
        </>
    )
}

export default UpdateFruit;