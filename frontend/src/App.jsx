import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import './App.css'

function App() {
  const [startDate,setStartDate] = useState('');
  const [time, setTime] = useState("00:00");
  const [users, setUsers]= useState([]);
  const [updatingUser, setUpdatingUser] = useState()
  const {register , handleSubmit, setValue, reset, formState: {errors} } = useForm();
  
  const onSubmit = async(data) => {
    try{
      if(updatingUser){
        await axios.put(`http://localhost:8000/api/v1/update/${updatingUser}`, data);
        alert("User Updated Successfully!!!");
      }
      else{
        const resposnse = await axios.post("http://localhost:8000/api/v1/create", data);
        console.log(resposnse.data);

        alert("User created Successfully!!");
        
      }
    
      reset();
      setUpdatingUser(null);
      fetchData();
    }catch(error){
     console.log(error);
    } 
  }

  const deleteUser = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/delete/${id}`)
      
      setUsers(users.filter((user) => user.id !==id));
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async(id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/get/${id}`)
      const userdata = response.data;

      setValue("name", userdata.name || "");
      setValue("department", userdata.department || "");
      setValue("salary" , userdata.salary || "");
      setValue("address", userdata.address || "");
      
      const parseDate = userdata.startDate ? new Date(userdata.startDate) : null;
      setStartDate(parseDate);
      setValue("startDate", userdata.startDate || "");

      setTime(userdata.time || "");
      setValue("time", userdata.time || "");


      setUpdatingUser(id);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() =>{
    const fetchData = async() => {
      try{
      const res = await axios.get("http://localhost:8000/api/v1/get")
      setUsers(res.data);
      }catch(error){
        console.log(error)
      }
    }

    fetchData()
  },[])


  return (
    <>
      <div className='flex flex-col w-full min-h-screen min-w-screen items-center justify-center'>
        <h2 className='text-xl font-medium mb-4'>User Dashboard</h2>

        <form className='w-full max-w-2xl mb-4' onSubmit={handleSubmit(onSubmit)}>


          <div className='flex space-x-4 mb-4'>
            <div className='w-1/2'>
              <label className='block text-s font-s text-left'>Name</label>
              <input type="text" {...register("name")} className='text-s w-full borde border-amber-50 rounded text-black bg-amber-50'/>
            </div>
            <div className='w-1/2'>
              <label className='block text-s font-s text-left'>Department</label>
              <select {...register("department")} className='w-full text-s bg-amber-50 text-black rounded'>
                <option value="Information Techology">Information Technology</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil</option>
                <option value="Chemical">Chemical</option>
                <option value="E&TC">E&TC</option>
              </select>
              <input type="hidden" name="department" {...register("department")}/>
            </div>
          </div>


          <div className='flex space-x-4 mb-4'>
            <div className='w-1/2'>
              <label className='block text-s font-s text-left'>Salary</label>
              <input type="Number"{...register("salary")} className='text-s w-full borde border-amber-50 rounded text-black bg-amber-50'/>
            </div>
            <div className='w-1/2'>
              <label className='block text-s font-s text-left'>Address</label>
              <input type="text" {...register("address")} className='text-s w-full borde border-amber-50 rounded text-black bg-amber-50'/>
            </div>
          </div>

          <div className='flex space-x-4 mb-4'>
            <div className='w-1/2'>
              <label className='block text-s font-s text-left'>Start Date</label>
              <DatePicker
              selected={startDate}
              onChange={(date) => {
                const formatDate = date ? date.toISOString().split('T')[0] : "";
                setStartDate(date);
                setValue("startDate", formatDate);
              }}
              dateFormat="yyyy-MM-dd"
              className='w-full border text-black rounded bg-amber-50'
              wrapperClassName='w-full'
              />
               <input type="hidden" {...register("startDate")} />
            </div>
            <div className='w-1/2'>
              <label className='block text-s font-s text-left'>Time</label>
              <input
                type="time"
                value={time}
                {...register("time")}
                onChange={(e) => {
                  setTime(e.target.value);
                  setValue("time", e.target.value);
                }}
                className='text-s w-full border border-amber-50 rounded text-black bg-amber-50'
              />
            </div>
          </div>

        <div className='flex justify-end items-center space-x-2 ml-auto'>
          <button
          type="submit"
          className="w-1/4 !bg-green-700 text-white flex justify-center items-center"
          >
            SAVE
          </button>
        </div>

        </form>

        <div>
          <table className='table w-full border-collapse border border-green-950'>
    <thead>
      <tr className='bg-green-100'>
        <th className='border border-green-950 p-2 text-black'>Id</th>
        <th className='border border-green-950 p-2 text-black'>NAME</th>
        <th className='border border-green-950 p-2 text-black'>DEPARTMENT</th>
        <th className='border border-green-950 p-2 text-black'>SALARY</th>
        <th className='border border-green-950 p-2 text-black'>ADDRESS</th>
        <th className='border border-green-950 p-2 text-black'>START DATE</th>
        <th className='border border-green-950 p-2 text-black'>TIME</th>
        <th className='border border-green-950 p-2 text-black'>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {users && users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id} className='border-t'>
            <td className='border border-green-950 p-2'>{user.id}</td>
            <td className='border border-green-950 p-2'>{user.name}</td>
            <td className='border border-green-950 p-2'>{user.department}</td>
            <td className='border border-green-950 p-2'>{user.salary}</td>
            <td className='border border-green-950 p-2'>{user.address}</td>
            <td className='border border-green-950 p-2'>{user.startDate?.split('T')[0]}</td>
            <td className='border border-green-950 p-2'>{user.time}</td>
            <td className='border border-green-950 p-2'>
              <button className='text-blue-600 mr-2'
              onClick={() => updateUser(user.id)}
              >Edit</button>
              <button className='text-red-600'
              onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className='text-center p-4'>No DATA FOUND</td>
        </tr>
      )}
    </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default App
