/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import AppointmentsListComponent from "../components/appointments/AppointmentsList"
import axios from "axios"
import Navbar from "../components/navbar/Navbar"


const appointmentList = () => {

    const [appointments, setAppointments] = useState([])
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [currentEditData, setCurrentEditData] = useState({ name: "", datetime: "", id: "" });

    const user:any = localStorage.getItem('user')
    const userParsed = JSON.parse(user)


    const handleDelete = async(id) => {
        const response = await axios.delete(`https://appointment-nestjs-production.up.railway.app/appointment/${id}`)
        if(response.status === 200) {
            getAppointments()
        }else {
            console.log('something went wrong')
        }
      };

      const handleSaveEdit = async () => {
        const response = await axios.patch(`https://appointment-nestjs-production.up.railway.app/appointment/${currentEditData.id}`, {
            "name": currentEditData.name,
            "date": currentEditData.datetime
        })

        if(response.status ===200) {
        setEditDialogOpen(false);
        getAppointments();
        }
        
        
    };

    const handleCloseDialog = () => {
        setEditDialogOpen(false);
    };
  

    const getAppointments = async() => {
        const UserId = userParsed['id']

        try {
            const response = await axios.get(`https://appointment-nestjs-production.up.railway.app/appointment/${UserId}`)
            if(response.status === 200) {
                console.log(response.data)
                setAppointments(response.data)
            }

        }catch(e) {
            console.log(e)
        }
    }

    const handleEdit = (appointment) => {
        console.log(appointment)
        setCurrentEditData(appointment);  
        setEditDialogOpen(true);
    };


    useEffect(() => {
        getAppointments()
    },[])

    return (
        <div>
             <div>
        <Navbar name="Home" />
      </div>
        <h4> My Appointment</h4>
        <AppointmentsListComponent onEdit={handleEdit} appointments={appointments} onDelete={handleDelete}  />

        {isEditDialogOpen && (
                <div className="edit-dialog">
                    <h4>Edit Appointment</h4>
                    <div>
                        <label>Name:</label>
                        <input 
                            type="text" 
                            value={currentEditData.name}
                            onChange={(e) => setCurrentEditData({ ...currentEditData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input 
                            type="text"
                            value={currentEditData.datetime}
                            onChange={(e) => setCurrentEditData({ ...currentEditData, datetime: e.target.value })}
                        />
                    </div>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCloseDialog}>Close</button>
                </div>
            )}
        </div>
    )
}
export default appointmentList