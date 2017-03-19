import React, { PropTypes } from 'react'

import Logo from '../../components/Logo';
import Posts from '../../components/Posts';
import FrontIntro from '../../components/FrontIntro';

import './front.scss';

const Front = ({ data: { allPosts, freshRender, isBusy, navigateToPost, showoff, triggerNavDance } }) => (    
  <div className={`front-view ${freshRender ? 'animate' : ''}`}>
    <Logo 
      onTrigger={triggerNavDance}
      text="nosaj" 
      showoff={showoff} 
      loading={isBusy} />
    <main className="front-view__main">
      <FrontIntro className="front-section" />
      {allPosts && (
        <Posts 
          className="front-section" 
          data={allPosts} 
          navigateToPost={(location) => navigateToPost(location)} 
        />
      )}
    </main>
  </div>
)

Front.propTypes = {
  data: PropTypes.object, // this will be the shared state object
  updateState: PropTypes.func,
};

export default Front
