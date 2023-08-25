import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface ReservationFormProps {
  onReserve: (date: string, name: string) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onReserve }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReserve(date, name);
    setDate("");
    setName("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </Form.Group>

      <Button className='my-5' variant="primary" type="submit">Reserve</Button>
    </Form>
  );
}

export default ReservationForm;
