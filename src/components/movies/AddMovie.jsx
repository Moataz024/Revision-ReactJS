import React, { useState } from 'react'
import { Button, Container, Form } from "react-bootstrap";
import { addMovie } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovieReducer } from '../../redux/slices/eventsSlice';

function AddMovie() {



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const  [eventItem , setMovieItem] = useState({
        name:"",
        description:"",
        img:"",
        price:0,
        nbTickets:0,
        nbParticipants:0,
        like:false
    })


    const onValueChange =(e)=>{

        setMovieItem({...eventItem , [e.target.name] : e.target.value})

    }


    const onFile =(e)=>{

        setMovieItem({...eventItem , [e.target.name]:e.target.files[0].name})
    }


    const AddMovie = async()=>{

        const eventResult = await addMovie(eventItem)

        dispatch(addMovieReducer(eventItem))
        if(eventResult.status ==201){
            navigate("/events")
        }
    }

    return (
        <Container style={{ marginTop: "30px" }}>
            <h2>Add a new Movie to your Movie List</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control

                        onChange={(e)=>onValueChange(e)}
                        name="name"
                        value={eventItem.name}
                        type="text"
                        placeholder="Enter a Name"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={(e)=>onValueChange(e)}
                        value={eventItem.description}

                        as="textarea"
                        rows={3}
                        placeholder="Enter description "
                        name="description"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control

                        onChange={(e)=>onValueChange(e)}
                        value={eventItem.price}
                        type="number"
                        name="price"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of Tickets</Form.Label>
                    <Form.Control

                        onChange={(e)=>onValueChange(e)}
                        value={eventItem.nbTickets}
                        type="number"
                        name="nbTickets"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="img"

                        onChange={(e)=>onFile(e)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={AddMovie}>
                    Add an Movie
                </Button>
                <Button  variant="secondary">
                    Cancel
                </Button>
            </Form>
        </Container>
    )
}

export default AddMovie