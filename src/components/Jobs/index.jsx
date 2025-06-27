import { useState } from "react";
import AllJobCards from "../AllJobCards";
import Header from '../Header'
import './index.css'
import ProfileCard from "../ProfileCard"
import 'bootstrap/dist/css/bootstrap.min.css';
import JobFilters from "../JobFilters";

const Jobs = () => {
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState('');

  const handleEmploymentTypeChange = (type) => {
    setEmploymentTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSalaryRangeChange = (range) => {
    setSalaryRange(range);
  };

  return (
    <>
      <main className="jobs-container">
        <Header />
        <div className="jobs-content">
          <aside className="left-column">
            <ProfileCard />
            <JobFilters
              employmentTypes={employmentTypes}
              onEmploymentTypeChange={handleEmploymentTypeChange}
              salaryRange={salaryRange}
              onSalaryRangeChange={handleSalaryRangeChange}
            />
          </aside>
          <section className="right-column">
            <AllJobCards
              employmentTypes={employmentTypes}
              salaryRange={salaryRange}
            />
          </section>
        </div>
      </main>
    </>
  )
}
export default Jobs;