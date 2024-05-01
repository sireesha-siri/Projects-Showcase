import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectCard from '../ProjectCard'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProjectsShowcase extends Component {
  state = {
    activeId: categoriesList[0].id,
    status: apiStatus.initial,
    projectsList: [],
  }

  componentDidMount() {
    this.getProjectsData()
  }

  getProjectsData = async () => {
    this.setState({status: apiStatus.loading})

    const {activeId} = this.state

    const url = `https://apis.ccbp.in/ps/projects?category=${activeId}`

    const response = await fetch(url)

    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({projectsList: formattedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  selectOption = event => {
    this.setState({activeId: event.target.value}, this.getProjectsData)
  }

  getProjectsShowcaseView = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      case apiStatus.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  successView = () => {
    const {projectsList} = this.state

    return (
      <ul>
        {projectsList.map(each => (
          <ProjectCard key={each.id} projectDetails={each} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.retry} className="retry-button">
        Retry
      </button>
    </div>
  )

  retry = () => {
    this.getProjectsData()
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <>
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>

        <div className="projects-container">
          <select onChange={this.selectOption}>
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>

        {this.getProjectsShowcaseView()}
      </>
    )
  }
}

export default ProjectsShowcase
