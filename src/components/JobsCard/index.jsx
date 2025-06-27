import './index.css'
import { Link } from 'react-router-dom'

const JobsCard = props => {
  const { job } = props
  const { company_logo_url, employment_type, job_description, location, package_per_annum, rating, title } = job

  
//   const EMPLOYMENT_TYPE_LABELS = {
//   FULLTIME: "Full Time",
//   PARTTIME: "Part Time",
//   FREELANCE: "Freelance",
//   INTERNSHIP: "Internship"
// };

  return (
    <>
      <Link to={`/jobs/${job.id}`} className="link-style">
        <li className="job-card" >
          <div className="job-card-header">
            <img src={company_logo_url} alt="company logo" className="job-logo" />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="job-rating">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
                <span>{rating}</span>
                <span className="job-package">{package_per_annum}</span>
              </div>
            </div>
          </div>
          <div className="job-meta">
            <span>
              {location}
            </span>
            <span className="job-employment-type-badge">
              { employment_type}
            </span>
          </div>
          <hr />
          <h5>Description</h5>
          <p className="job-description">{job_description}</p>
        </li>
      </Link>
    </>
  )
}

export default JobsCard