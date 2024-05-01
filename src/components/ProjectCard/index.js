import './index.css'

const ProjectCard = props => {
  const {projectDetails} = props

  const {imageUrl, name} = projectDetails

  return (
    <li>
      <div className="product-card">
        <img src={imageUrl} alt={name} className="product-image" />
        <p className="product-heading">{name}</p>
      </div>
    </li>
  )
}

export default ProjectCard
