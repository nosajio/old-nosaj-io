import React, { PropTypes } from 'react'

import './portfolio.scss';
import profileImg from '../../static/img/jason.jpg';
import projectsData from './projects-data.json';

const Portfolio = React.createClass({
  propTypes: {
    data: PropTypes.object,
  },

  getInitialState () {
    return {
      projects: projectsData,
    }
  },

  componentDidMount () {
  },

  projectEl (project, index) {
    const styles = {
      background: project.colors[0],
      color: project.colors[1],
    };
    return (
      <article
        key={index}
        style={styles}
        className="project-tile">
        <span className="project-tile__meta">
          <h1 className="project-tile__title">{project.title}</h1>
        </span>
      </article>
    );
  },

  render () {
    const {projects} = this.state;

    if (! projects) {
      return null;
    }

    return (
      <div className="portfolio">
        <main className="portfolio__body">
          <header className="project-tile projects-intro">
            <div className="projects-intro__picture">
              <img src={profileImg} alt="Jason Howmans Portrait"/>
            </div>
            <div className="projects-intro__text">
              Hi I'm Jason. I design and build software for the internet. Im currently accepting new projects.
            </div>
          </header>
          {projects.map(this.projectEl)}
        </main>
      </div>
    )
  }
})

export default Portfolio
