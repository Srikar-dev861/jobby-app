import './index.css'

const EMPLOYMENT_OPTIONS = [
  { id: 'fulltime', value: 'FULLTIME', label: 'Full Time' },
  { id: 'parttime', value: 'PARTTIME', label: 'Part Time' },
  { id: 'freelance', value: 'FREELANCE', label: 'Freelance' },
  { id: 'internship', value: 'INTERNSHIP', label: 'Internship' },
]

const SALARY_OPTIONS = [
  { id: '10lpa', value: '10LPA', label: '10 LPA and above' },
  { id: '20lpa', value: '20LPA', label: '20 LPA and above' },
  { id: '30lpa', value: '30LPA', label: '30 LPA and above' },
  { id: '40lpa', value: '40LPA', label: '40 LPA and above' },
]

const JobFilters = ({
  employmentTypes = [],
  onEmploymentTypeChange = () => {},
  salaryRange = '',
  onSalaryRangeChange = () => {},
}) => (
  <div className="job-filters-container">
    <div className="filter-section">
      <h5 className="filter-title">Type of Employment</h5>
      {EMPLOYMENT_OPTIONS.map(opt => (
        <div className="filter-option" key={opt.id}>
          <input
            type="checkbox"
            id={opt.id}
            value={opt.value}
            checked={employmentTypes.includes(opt.value)}
            onChange={() => onEmploymentTypeChange(opt.value)}
          />
          <label htmlFor={opt.id}>{opt.label}</label>
        </div>
      ))}
    </div>
    <hr className="filter-divider" />
    <div className="filter-section">
      <h5 className="filter-title">Salary Range</h5>
      {SALARY_OPTIONS.map(opt => (
        <div className="filter-option" key={opt.id}>
          <input
            type="radio"
            id={opt.id}
            name="salaryRange"
            value={opt.value}
            checked={salaryRange === opt.value}
            onChange={() => onSalaryRangeChange(opt.value)}
          />
          <label htmlFor={opt.id}>{opt.label}</label>
        </div>
      ))}
    </div>
  </div>
)

export default JobFilters