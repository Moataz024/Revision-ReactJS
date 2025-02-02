import './App.css'
import React, {Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import NotFound from './components/NotFound'
import NavigationBar from './components/NavigationBar'
import EventDetails from './components/EventDetails'
import AddEvent from './components/AddEvent'
import UpdateEvent from './components/UpdateEvent'
import {fetchEvents} from './redux/slices/eventsSlice'
import {useDispatch} from 'react-redux'
import {getallEvents} from "./service/api.js";
import EventWishlist from "./components/Wishlist";


const Events = React.lazy(() => import('./components/Events'))

function App() {

    const dispatch = useDispatch()

    return (
        <>
            <NavigationBar/>
            <Suspense fallback={<p>Loading ...</p>}>
                <Routes>
                    <Route path="events">
                        <Route index element={<Events/>} loader={dispatch(fetchEvents())}/>
                        <Route path="update/:id" element={<UpdateEvent/>}/>
                        <Route path="details/:id" element={<EventDetails/>}/>
                    </Route>
                    <Route path="add" element={<AddEvent/>}/>
                    <Route path="wishlist" element={<EventWishlist/>} loader={getallEvents}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </>
    )
}

export default App
