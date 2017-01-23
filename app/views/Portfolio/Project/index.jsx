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

  const projectIndex = projectsData.indexOf(project);
  const nextProjectIndex = projectIndex + 1 >= projectsData.length ? projectsData.length - 1 : projectIndex + 1;

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
    <div style={projectStyles} className="project lod">
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
        <section className="project__images">
          <div style={projectImagesStyles} className="images-decoration"></div>
          {previewImages ? addImageIfPresent('desktop') : null}
          {previewImages ? addImageIfPresent('mobile') : null}
        </section>
      </main>
      <nav className="projects-nav">
        <a href="/portfolio" className="projects-nav__back">&larr; Back to Projects</a>
        {projectsData.map(navLinkEl)}
      </nav>
      {nextProjectIndex !== projectIndex ? (
        <a
          href={`/portfolio/${projectsData[nextProjectIndex].slug}`}
          className="project__goto-next"
          style={{
            background: projectsData[nextProjectIndex].colors[0]
          }}>
          <em>Next Project:</em>
          <h3>{projectsData[nextProjectIndex].title}</h3>
        </a>
      ) : null}
    </div>
  );
}

export default Project;
