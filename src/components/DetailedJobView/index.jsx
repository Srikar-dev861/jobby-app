import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom' // <-- use this
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import {FaLocationDot} from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

const DetailedJobView = () => {
  const {id} = useParams() // <-- get id from route
  const [jobDetails, setJobDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/jobs/${id}` // <-- use dynamic id
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      const formattedData = {
        job_details: {
          id: fetchedData.job_details.id,
          title: fetchedData.job_details.title,
          company_logo_url: fetchedData.job_details.company_logo_url,
          company_website_url: fetchedData.job_details.company_website_url,
          job_description: fetchedData.job_details.job_description,
          skills: fetchedData.job_details.skills.map(skill => ({
            name: skill.name,
            image_url: skill.image_url,
          })),
          life_at_company: {
            description: fetchedData.job_details.life_at_company.description,
            image_url: fetchedData.job_details.life_at_company.image_url,
          },
          location: fetchedData.job_details.location,
          employment_type: fetchedData.job_details.employment_type,
          package_per_annum: fetchedData.job_details.package_per_annum,
          rating: fetchedData.job_details.rating,
        },
      }
      setJobDetails(formattedData.job_details)
      setIsLoading(false)
    }
    fetchJobDetails()
  }, [id])

  const renderDetailedJobView = () => {
    const {
      title,
      company_logo_url,
      company_website_url,
      job_description,
      skills,
      life_at_company,
      location,
      employment_type,
      package_per_annum,
      rating,
    } = jobDetails
    return (
      <>
      <Header />
      <div className="job-details-container">
        <div className="job-header">
          <img src={company_logo_url} alt="company logo" className="job-logo" />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-rating">⭐ {rating}</div>
          </div>
        </div>
        <div className="job-info-row">
          <span className="job-info-item">
            <FaLocationDot className="job-info-icon" /> {location}
          </span>
          <span className="job-info-item">
            <BsBriefcaseFill className="job-info-icon" /> {employment_type}
          </span>
          <span className="job-info-item job-package">
            {package_per_annum}
          </span>
        </div>
        <hr></hr>
        <a href={company_website_url} target="_blank" rel="noopener noreferrer" className="company-website-link">
          Visit <FaExternalLinkAlt />
        </a>
        <h2>Description</h2>
        <p>{job_description}</p>
        <h3>Skills</h3>
        <ul className="skills-list">
          {skills.map(skill => (
            <li key={skill.name} className="skill-item">
              <img src={skill.image_url} alt={skill.name} className="skill-img" />
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
        <h3 className="life">Life at Company</h3>
        <div className="life-at-company">
          <p>{life_at_company.description}</p>
          <img src={life_at_company.image_url} alt="life at company" className="life-img" />
        </div>
      </div>
      </>
    )
  }
  return (
    <div className="detailed-job-view">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : jobDetails ? (
        renderDetailedJobView()
      ) : (
        <div className="error">Job details not found</div>
      )}
    </div>
  )
}

export default DetailedJobView