import  Container  from "react-bootstrap/Container"
import Event from "./Event"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import { useEffect, useState } from "react"
import { deleteEvent, getallEvents } from "../service/api"
import { useDispatch, useSelector } from "react-redux"
import { deleteEventReducer, selectEvents } from "../redux/slices/eventsSlice"
import {decrement, selectWishlist} from "../redux/slices/wishlistSlice.js";
import {Button} from "react-bootstrap";
function EventWishlist() {

    const [events,setEvents]  = useState([]);
    const [loading,setLoading]=useState(true);
    const dispatch = useDispatch()
    const wishlist = useSelector(selectWishlist);
    const [isShowAlert , setIsShowAlert] = useState(false)
    const [isWelcome, setIsWelcome] = useState(true);

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            let myEvents = [];
            for (const wish of wishlist) {
                const response = await getallEvents(wish);
                myEvents.push(response.data);
            }
            setEvents(myEvents);
            setLoading(false);
            console.log(myEvents);
        }
        fetchData();
        const isWelcomeTimeout = setTimeout(() => {
            setIsWelcome(false);
        }, 3000);

        return () => {
            clearTimeout(isWelcomeTimeout);
        };

    }, []);
    const showAlert = ()=>{

        setIsShowAlert(true)

        setTimeout(()=>
                setIsShowAlert(false)
            , 2000 )
    }


    const handleDelete = async (eventId)=>{

        await deleteEvent(eventId);

        dispatch(deleteEventReducer(eventId))

    }
    const handleClear = ()=>{
        dispatch(decrement({id:1}));
        setEvents([]);
    }
    return (
        <>
            {isWelcome && (
                <Alert style={{ width: "70%", marginBottom: 40 }} variant="success">
                    Hey welcome to Esprit Events
                </Alert>
            )}
            {loading ? <div>Loading...</div> :
                <Container>

                    <Row>
                        {events.map((event, index) => (

                            <Event key={index} event={event} showAlert={showAlert} delete={handleDelete}/>

                        ))}

                    </Row>

                    {isShowAlert && (<Alert variant="success">
                        <Alert.Heading>You have booked an event</Alert.Heading>

                    </Alert>)}
                <Button onClick={handleClear}>Clear list</Button>
                </Container>
            }
        </>
    )
}

export default EventWishlist