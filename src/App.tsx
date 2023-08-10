import { useState, useEffect } from 'react'
import { getApiRoot, projectKey } from './api'

import './App.css'

function App() {
  const [projectDetails, setProjectDetails] = useState<{ limit: number } | null>(null)

  const getProject = async () => {
    try {
      const project = await getApiRoot().withProjectKey({ projectKey }).products().get().execute()

      // .customers()
      // .get()
      // .execute()

      setProjectDetails(project.body)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getProject()
  }, [])

  return (
    <>
      <div>Project Details</div>
      {projectDetails?.limit}
    </>
  )
}

export default App
