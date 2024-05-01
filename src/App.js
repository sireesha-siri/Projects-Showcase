import ProjectsShowcase from './components/ProjectsShowcase'

import './App.css'

// This is the list (static data) used in the application. You can move it to any component if needed.

// eslint-disable-next-line no-unused-vars
const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
const App = () => <ProjectsShowcase />

export default App
