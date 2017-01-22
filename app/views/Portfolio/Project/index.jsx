import React, { PropTypes } from 'react'

import projectsData from '../projects-data.json';
import './project.scss'

const Project = (props) => {
  const {slug} = props.params;
  const project = projectsData.filter(p => p.slug === slug)[0];


  if (! project) {
    return (
      <main className="project-not-found">
        Don't you just hate when this happens... the project can't be found right now, but there are more on the <a href="/portfolio">Portfolio</a> page.
      </main>
    );
  }

  const projectStyles = {
    background: project.colors[0],
    color: spin.getLuminance(project.colors[0]) < 50 ? '#fff' : 'auto',
    borderColor: project.colors[2],
  };

  const projectImagesStyles = {
    background: project.colors[1],
  };

  return (
    <div style={projectStyles} className="project">
      <main className="project__body">
        <section className="project__text">
          <header className="project__header">
            <h1>{project.title}</h1>

          </header>
          <h2>About {project.title}</h2>
          <p>{project.aboutCompany}</p>
          <h2>What I Did</h2>
          <ul className="project__points">
            {project.whatIDid.map((it, index) => (
              <li key={index} className="project__point">{it}</li>
            ))}
          </ul>
        </section>
        <section style={projectImagesStyles} className="project__images"></section>
      </main>
    </div>
  )
}

export default Project;
