import React from 'react';
import Appointment from './Appointment';

interface AppointmentsListProps {
  appointments: { datetime: string, name: string , id: number}[];
  onDelete: (id: number) => void
  onEdit: (id) =>void
}

const AppointmentsListCom: React.FC<AppointmentsListProps> = ({ appointments, onDelete, onEdit }) => {
  return (
    <div>
      { appointments.length===0 ? <div> you didn't reverse an appointment yet </div> : appointments.map((appointment, index) => (
        <Appointment onEdit={() => onEdit(appointment)} onDelete={() => onDelete(appointment.id)} key={index} date={appointment.datetime} name={appointment.name} />
      ))}
    </div>

  );
}

export default AppointmentsListCom;
