import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

const EmployeeList = () => {

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await EmployeeService.getEmployee();
        setEmployees(response.data);
      }
      catch(error){
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id)
      .then(() => {
        if(employees){
          setEmployees((prevElement) => {
            return prevElement.filter((employee) => employee.id !== id);
          })
        }
      })
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`)
  };

  const navigate = useNavigate();
  return (
    <div className="container mx-auto my-8">
        <div>
          <button onClick={() => navigate("/addEmployee")} className="bg-slate-600 hover:bg-blue-700 my-12 font-semibold px-20 py-2 rounded">Add Employee 🧑‍💼</button>
        </div>  
        <div>
          <table className="shadow">
            <thead className="bg-slate-600">
              <tr>
                <th className="px-6 py-3 uppercase tracking-wide"> Name </th>
                <th className="px-6 py-3 uppercase tracking-wide"> Phone </th>
                <th className="px-6 py-3 uppercase tracking-wide"> Email </th>
                <th className="px-6 py-3 uppercase tracking-wide"> Action </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="text-white-500 bg-black/50 text-lg">
                {employees.map((employee) => {
                  return (
                    <tr className="hover:bg-white hover:text-black">
                      <td className="text-left px-6 py-4 whitespace-nowrap"> {employee.name} </td>
                      <td className="text-left px-6 py-4 whitespace-nowrap"> {employee.phone} </td>
                      <td className="text-left px-6 py-4 whitespace-nowrap"> {employee.email} </td>
                      <td className="text-left px-6 py-4 whitespace-nowrap">
                        <a
                        onClick={(e) => editEmployee(e, employee.id)}
                        className='hover:text-green-500 hover:cursor-pointer'
                        > Edit ✏️</a>
                        <a
                        onClick={(e) => deleteEmployee(e, employee.id)}
                        className='hover:text-red-500 hover:cursor-pointer'
                        > Delete 🗑️</a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
  )
}

export default EmployeeList