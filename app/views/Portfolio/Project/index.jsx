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

  const contrast = spin.getLuminance(project.colors[0]) < 50 ? 'lod' : 'dol';
  const projectStyles = {
    background: project.colors[0],
  };
  const secondaryColorStyle = { color: project.colors[1] };
  const projectImagesStyles = {
    background: project.colors[1],
  };

  const {previewImages} = project;

  const stackList = (stack) => (
    <ul className="project__stack">
      {stack.map((unit, index) => (
        <li key={index} className={`project__stack-unit project__stack-unit--${unit.toLowerCase().replace(' ', '-')}`}>{unit}</li>
      ))}
    </ul>
  );
  const addImageIfPresent = (type) => previewImages.hasOwnProperty(type) ? (
    <div
      className={`project-image project-image--${type}`}
      style={{
        backgroundImage: `url(/img/portfolio/${previewImages[type]})`,
      }}></div>
  ) : null;

  const navLinkEl = it => {
    if (it.slug === slug) {
      return (
        <span className="projects-nav__link is-active">{it.title}</span>
      );
    } else {
      return (
        <a href={`/portfolio/${it.slug}`} className="projects-nav__link">{it.title}</a>
      );
    }
  };

  return (
    <div style={projectStyles} className={`project ${contrast}`}>
      <main className="project__body">
        <section className="project__text">
          <header className="project__header">
            <h1 className="project__title">{project.title}</h1>
            <ul className="project__meta">
              <li className="project__meta-item date"><em style={secondaryColorStyle}>Date</em> {project.date}</li>
              {project.deliverables ? (
                <li className="project__meta-item brief"><em style={secondaryColorStyle}>Summary</em> {project.deliverables}</li>
              ) : null}
              {project.stack ? (
                <li className="project__meta-item brief"><em style={secondaryColorStyle}>Stack</em> {stackList(project.stack)}</li>
              ) : null}
            </ul>
          </header>
          <h2 style={secondaryColorStyle}>About {project.title}</h2>
          <p>{project.aboutCompany}</p>
          <h2 style={secondaryColorStyle}>What I Did</h2>
          <ul className="project__points">
            {project.whatIDid.map((it, index) => (
              <li key={index} className="project__point" dangerouslySetInnerHTML={{__html: it}}></li>
            ))}
          </ul>
        </section>
        {previewImages ? (
          <section className="project__images">
            <div style={projectImagesStyles} className="images-decoration"></div>
            {addImageIfPresent('desktop')}
            {addImageIfPresent('mobile')}
          </section>
        ) : null}
      </main>
      <nav className="projects-nav">
        <a href="/portfolio" className="projects-nav__back">&larr; Back to Projects</a>
        {projectsData.map(navLinkEl)}
      </nav>
    </div>
  )
}

export default Project;
