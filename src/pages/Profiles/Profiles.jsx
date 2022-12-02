import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import styles from './Profiles.module.css'

import moment from 'moment'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/pro-solid-svg-icons'


const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  return (
    <main>
      <h1>User Index</h1>
      <div id='addUser'>
        <FontAwesomeIcon
          icon={faUserPlus} 
          size='3x'
          style={{
            position: 'fixed',
            right: '10%',
            top: '20%'
          }}
        />
      </div>
      {profiles.length ? 
        <table>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Name</th>
              <th>Active</th>
              <th>Date Registered</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {profiles.map(profile =>
            <tr key={profile._id}>
              <td>{profile.name}</td>
              <td>{profile.isAdmin ? "Yes" : "No"}</td>
              <td>{profile.isActive ? "Yes" : "No"}</td>
              <td><Moment 
                    date={profile.createdAt}
                    format="dddd, MMMM Do, YYYY"
                    /></td>
              <td><button>Edit User</button></td>
            </tr>
          )}
          </tbody>
        </table>
      :
        <p>No profiles yet</p>
      }
    </main>
  )
}
 
export default Profiles