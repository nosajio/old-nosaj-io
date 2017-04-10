import React, { PropTypes } from 'react'

import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import Posts from '../../components/Posts';
import Head from '../../components/Head';
import FrontIntro from '../../components/FrontIntro';

import './front.scss';

const Front = ({ toggleMessageUi, data: { freshRender, isBusy, navigateToPost } }) => (    
  <div className={`a-view front-view ${freshRender ? 'fresh-render' : ''}`}>
    <Head>
      {/* OpenGraph */}
      <meta name="og:url" property="og:url" content="https://nosaj.io" />
      <meta name="og:type" property="og:type" content="website" />
      <meta name="og:title" property="og:title" content="Jason makes the internet" />
      <meta name="og:description" property="og:description" content="Hi I'm Jason. I'm a multi-disciplinary designer and software engineer." />
      <meta name="og:image" property="og:image" content="http://a.nosaj.io/og-nosaj.png" />
    </Head>
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
