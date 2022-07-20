import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [Users, setUsers] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState({});
  let fetchData = async () => {
    let res = await axios.get('http://localhost:3001/students');
    setUsers(res.data);
  }
  useEffect(() => {
    fetchData();
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        if (!isEdit) {
          await axios.post('http://localhost:3001/student', values);
        } else {
          await axios.put(`http://localhost:3001/student/${editUser.id}`, values);
          setIsEdit(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleEdit = async (id) => {
    try {
      let student = await axios.get(`http://localhost:3001/student/${id}`);
      formik.setValues(student.data);
      setEditUser(student.data);
      setIsEdit(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async(id) =>{
    try {
      await axios.delete(`http://localhost:3001/student/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6'>
          <form onSubmit={formik.handleSubmit}>
            <div className='col-lg-12'>
              <label>Email</label>
              <input type='text'
                placeholder='Search'
                className='form-control'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className='col-lg-12'>
              <label>password</label>
              <input type='text'
                placeholder='Search'
                className='form-control'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className='col-lg-12 m-2'>
              <input type='submit' value="Submit" className='btn btn-primary' />
            </div>
          </form>
        </div>
        < div className='col-lg-6'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Users.map((user, index) => {
                  return (
                    <tr>
                      <th scope="row">{user.id}</th>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                        <button className='btn btn-primary' onClick={() => handleEdit(user.id)}>Edit</button>
                      </td>
                      <td>
                        <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
