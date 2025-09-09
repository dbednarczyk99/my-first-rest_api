import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeats, loadSeatsRequest, getRequests } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  const [numOfFreeSeats, setNumOfFreeSeats] = useState(0);
  const numOfSeats = 50;
  
  useEffect(() => {
    dispatch(loadSeatsRequest());

    const socket = io(process.env.NODE_ENV === 'production' ? '' : 'ws://localhost:8000', { transports: ['websocket'] });
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to server with id:', socket.id);
    });

    socket.on('seatsUpdated', (seats) => {
      dispatch(loadSeats(seats));
    })

    return () => { 
      socket.disconnect();
    }; 
  }, [ dispatch ]);

  useEffect(() => {
    freeSeatsCounter();
  }, [seats, chosenDay]);

  const isTaken = (seatId) => { 
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  const freeSeatsCounter = () => {
    const takenSeats = seats.filter(seat => seat.day === chosenDay);
    const freeSeats = numOfSeats - takenSeats.length;
    console.log('seats: ', seats);
    console.log('freeSeats: ',freeSeats);
    console.log('takenSeats: ', takenSeats);
    console.log('takenSeats.length: ', takenSeats.length);

    setNumOfFreeSeats(freeSeats);
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <div className="mb-4">
        <small id="pickHelp" className="form-text text-muted ms-2"><Button disabled color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ms-2"><Button disabled outline color="primary" /> – it's empty</small>
      </div>
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(numOfSeats)].map((x, i) => prepareSeat(i+1) )}</div>}
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
      { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
      <div>
        <small id="pickHelp" className="form-text text-muted ms-2"> Free seats: {numOfFreeSeats}/{numOfSeats} </small>
      </div>
    </div>
  )
}

export default SeatChooser;