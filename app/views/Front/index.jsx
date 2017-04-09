import React, { PropTypes } from 'react'

import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import Posts from '../../components/Posts';
import FrontIntro from '../../components/FrontIntro';

import './front.scss';

const Front = ({ toggleMessageUi, data: { freshRender, isBusy, navigateToPost } }) => (    
  <div className={`a-view front-view ${freshRender ? 'fresh-render' : ''}`}>
    <Logo 
      text="nosaj" 
      loading={isBusy} />
    <main className="front-view__main">
      <FrontIntro 
        className="front-section" 
        toggleMessageUi={toggleMessageUi}
      />
        <Posts 
          className="front-section" 
          navigateToPost={(location) => navigateToPost(location)} 
        />
    </main>
    <Footer />
  </div>
)

Front.propTypes = {
  data: PropTypes.object, // this will be the shared state object
  toggleMessageUi: PropTypes.func,
};

export default Front
