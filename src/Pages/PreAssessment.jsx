import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'

const PreAssessment = () => {
  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header'>
            <FontAwesomeIcon icon={faCompass} />
            <h3>Pre-assessment</h3>
        </div>
      </div>
      <div className="recommendation">
      </div>
    </div>
  )
}

export default PreAssessment;