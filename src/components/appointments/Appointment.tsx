import React from 'react';

interface AppointmentProps {
  date: string;
  name: string;
  onDelete: () => void;
  onEdit:() => void;
}

const Appointment: React.FC<AppointmentProps> = ({ date, name, onDelete, onEdit }) => {
  return (
    <div className="card my-2">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{date}</p>
        <div className='row' >
        <button  className=" col-md-2 btn btn-danger mx-3" onClick={onDelete}>Delete</button>
        <button className="col-md-2 btn btn-primary" onClick={onEdit}>Edit</button>

        </div>
      </div>
    </div>
  );
}

export default Appointment;
