import React, { PropTypes } from 'react';

import './projects-grid.scss';

const ProjectsGrid = ({ projects, className }) => (
  <section className={`list-of-posts ${className}`}>
  </section>
);

ProjectsGrid.propTypes = {
  projects: PropTypes.array,
  className: PropTypes.string,
};

export default ProjectsGrid
