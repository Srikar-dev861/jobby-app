import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import JobsCard from '../JobsCard'
import './index.css'
import {ClipLoader} from 'react-spinners'

const AllJobCards = ({ employmentTypes = [], salaryRange = '' }) => {
  const [jobsList, setJobsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      const jwtToken = Cookies.get('jwt_token')
      if (!jwtToken) {
        navigate('/login', {replace: true})
        return
      }
      const response = await fetch('https://apis.ccbp.in/jobs', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      if (response.ok) {
        const data = await response.json()
        setJobsList(data.jobs)
      } else {
        navigate('/login', {replace: true})
      }
      setIsLoading(false)
    }
    fetchJobs()
  }, [navigate])

  const filteredJobs = jobsList.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase())
    const matchesEmployment =
      employmentTypes.length === 0 ||
      employmentTypes.includes(
        (job.employment_type || '').replace(/\s/g, '').toUpperCase()
      )
    const matchesSalary =
      !salaryRange || job.package_per_annum.replace(/[^\d]/g, '') >= salaryRange.replace(/[^\d]/g, '')
    return matchesSearch && matchesEmployment && matchesSalary
  })

  return (
    <div className="all-jobs-container">
      <div className="job-search-bar" style={{marginBottom: '16px', position: 'relative'}}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="clear-search-btn"
            onClick={() => setSearch('')}
            aria-label="Clear search"
            type="button"
          >
            &times;
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="custom-spinner">
          <ClipLoader
            size={80}
            color="#4fa94d"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        filteredJobs.map(job => <JobsCard key={job.id} job={job} />)
      )}
    </div>
  )
}

export default AllJobCards
