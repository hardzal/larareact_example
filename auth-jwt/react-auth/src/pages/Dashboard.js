import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState('');
  const history = useHistory();

  const token = localStorage.getItem('token');
  const fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.get('http://localhost:8000/api/user').then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    if (!token) {
      history.push('/');
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.post('http://localhost:8000/api/logout').then(() => {
      localStorage.removeItem('token');
      history.push('/');
    });
  };

  return (
    <div className="container" style={{ marginTop: '120px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              {' '}
              SELAMAT DATANG{' '}
              <strong className="text-uppercase">{user.name}</strong>
              <hr />
              <button onClick={logoutHandler} className="btn btn-md btn-danger">
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
