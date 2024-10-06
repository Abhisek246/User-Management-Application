import React, { useContext } from 'react';
import User from '../assets/user-img.png';
import './Details.css';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const { details } = useContext(StoreContext);
  const nav = useNavigate();

  return (
    <>
      {Object.keys(details).length > 0 ? (
        <div>
          <div className='details-container-one'>
            <div className='user-profile'>
              <img src={User} alt='User Profile' className='user-img' />
              <p><span>Username</span> : {details.username}</p>
            </div>
            <div>
              <p><span>Name</span> : {details.name}</p>
              <p><span>Email</span> : {details.email}</p>
              <button className='edit-btn' onClick={()=> nav('/user')}>Edit</button>
            </div>
          </div>

          <div className='details-container-two'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Phone</th>
                  <th colSpan='4'>Address</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Street</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{details.name}</td>
                  <td>{details.email}</td>
                  <td>{details.website}</td>
                  <td>{details.phone}</td>
                  <td>{details.address.street}</td>
                  <td>{details.address.city}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No user details</p>
      )}
    </>
  );
};

export default Details;
