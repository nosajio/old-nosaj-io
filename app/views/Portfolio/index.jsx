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
      activeTile: null,
    }
  },

  componentDidMount () {
  },

  handleActiveTile (project) {
    this.setState({
      activeTile: project.slug,
    })
  },

  handleInactiveTile () {
    this.setState({activeTile: null});
  },

  projectEl (project, index) {
    const {activeTile} = this.state;
    const styles = {
      backgroundColor: project.colors[0],
      color: project.colors[1],
    };
    const hasCover = project.coverImages ? project.coverImages.length > 0 : false;
    return (
      <article
        onMouseOver={this.handleActiveTile.bind(this, project)}
        onMouseOut={this.handleInactiveTile}
        key={index}
        style={styles}
        className={`project-tile ${activeTile === project.slug ? 'project-tile--is-selected' : ''}`}>
        <div className="project-tile__meta">
          <h1 className="project-tile__title">{project.title}</h1>
          <span className="project-tile__types">{project.types.map((type, i) => `${type}${i < project.types.length - 1 ? ', ' : ''}`)}</span>
        </div>
        {hasCover ? (
          <div className="project-tile__cover">
            {/* Reverse to preserve layer order (first on top, last on bottom) */}
            {project.coverImages.map((img, index) => (
              <div
                  key={index}
                  className={`cover-image cover-image--${index+1}`}
                  style={{
                    backgroundImage: `url(/img/portfolio/${img})`
                  }}></div>
            ))}
          </div>
        ) : null}
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
