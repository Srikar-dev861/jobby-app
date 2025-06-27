import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const ProfileCard = () => {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const jwtToken = Cookies.get('jwt_token')
      try {
        const response = await fetch('https://apis.ccbp.in/profile', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setProfile(data.profile_details)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      }
      setIsLoading(false)
    }
    fetchProfile()
  }, [])

  if (isLoading) {
    return <div className="profile-loader">Loading...</div>
  }

  if (error || !profile) {
    return <div className="profile-error">Failed to load profile</div>
  }

  return (
    <div className="profile-card">
      <img
        src={profile.profile_image_url}
        alt="profile"
        className="profile-image"
      />
      <h2 className="profile-name">{profile.name}</h2>
      <p className="profile-bio">{profile.short_bio}</p>
    </div>
  )
}

export default ProfileCard