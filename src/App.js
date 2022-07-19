import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [Users, setUsers] = useState([])
  let fetchData = async() => {
    let res = await axios.get('http://localhost:3001/student');
    console.log(res.data);
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
        await axios.post('http://localhost:3001/students', values);
      } catch (error) {
        console.log(error);
      }
    },
  })
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
              </tr>
            </thead>
            <tbody>
              {
                Users.map((user, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
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
