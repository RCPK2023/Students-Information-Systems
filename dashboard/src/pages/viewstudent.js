import React, { useEffect, useState } from 'react'
import "./viewstudent.css";
import Sidebar from './sidebar';
import axios from "axios";

function ViewStudent() {
    const [Students, setStudents] = useState([]);

    useEffect(() => 
    {
        axios
        .get('http://localhost:1337/viewStudents') 
        .then((response) =>
        {
            setStudents(response.data);
        })
        .catch((error) => {
            console.error("Error fetching student data:", error);
        });       
    }, []);

  return (
    <div id='container'>
      <Sidebar></Sidebar>

      <div className='view-container'>
            <h1>View Students</h1>
            
            <ul>
                {Students.map(student => 
                (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
      </div>
    </div>
  )
}

export default ViewStudent
