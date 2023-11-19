
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineMessage } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
}

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    // Fetch user data from MongoDB API
    axios
      .get('http://localhost:4561/api/user/signup/fetch-emails')
      .then((response) => {
        const userData: User[] = response.data.users;
        setUsers(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Add a useEffect to fetch the number of unread messages
  useEffect(() => {
    axios
      .get('http://localhost:4561/api/contact/admin/unread-messages')
      .then((response) => {
        const unreadCount: number = response.data.unreadCount;
        setUnreadMessages(unreadCount);
      })
      .catch((error) => {
        console.error('Error fetching unread messages count:', error);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Task Master
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/messages">
                  <MdOutlineMessage style={{ fontSize: '24px' }} />
                  {unreadMessages > 0 && (
                    <span className="badge badge-danger ml-1">
                      {unreadMessages}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <button
                  className="btn btn-danger"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">User List</h2>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search by username"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Serial No</th>
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3}>No users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;


