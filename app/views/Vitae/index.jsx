import React, { PropTypes } from 'react'

import './vitae.scss';

const vitaeData = {
  fulltime: {
    '2007': [{
      company: 'Trinity Design',
      where: 'Staffordshire, England',
      title: 'Web Developer',
    }],
    '2009': [{
      company: 'William Hill Online',
      where: 'Gibraltar',
      title: 'Web Developer',
    }],
    '2010': [{
      company: 'eSterling',
      where: 'Birmingham',
      title: 'Web Designer and Developer',
    }],
    '2012 to 2013': [{
      company: 'MrSite',
      where: 'London',
      title: 'Lead Design',
    }],
    '2014 to 2015': [{
      company: 'MetaBroadcast ',
      where: 'London',
      title: 'Creative Technologist',
    }],
  },
  freelance: {
    '2008': [{
      company: 'Davenports Beer (via Trinity Design)',
      title: 'Web Development',
    }],
    '2010': [
      {
        company: 'Elixir Productions NYC',
        title: 'Web Design and Development'
      },
      {
        company: 'InStaffs (via Trinity Design)',
        title: 'Web Design'
      }
    ],
    '2011': [
      {
        company: 'Mattebox',
        title: 'Interface Design (iOS)'
      },
      {
        company: 'Focus Multimedia',
        title: 'Web Design and Development'
      },
      {
        company: 'Cobb Lloyd (via webworkhouse)',
        title: 'Identity Design'
      },
      {
        company: 'Westley Interiors (via webworkhouse)',
        title: 'Identity Design'
      },
      {
        company: 'wewillbuyallcars.com',
        title: 'Web Development'
      }
    ],
    '2016': [
      {
        company: 'Elixir Producations NYC',
        title: 'Web Design and Development'
      },
      {
        company: 'CityGenda',
        title: 'Front End and Angular Development'
      },
      {
        company: 'TopHat Films',
        title: 'Web Design and Development'
      },
      {
        company: 'BeachFix',
        title: 'Web Design and Development'
      }
    ]
  },
  urls: {
    'GitHub': 'https://github.com/nosajj',
    'Twitter': 'https://twitter.com/jhwmns',
  },
  other: {
    'Volunteering': [{
      when: '2016',
      company: 'FabLab London',
      title: 'Lab Helper',
    }],
    'Writings': [{
      title: '',
      url: ''
    }],
  },
  school: {
    '2007 to 2009' : {
      school: 'Stafford Art College',
      course: 'BTEC Multimedia'
    },
    '2000 to 2005' : {
      school: 'Fair Oak High School'
    },
  }
};

const Vitae = (props) => {

  const listFrom = (section) => (
    <ul className="vitae__list">
      {Object.keys(vitaeData[section]).map((date, index) => (
        <li key={index} className="vitae__list-item">
          <h3><span className="vitae-date">{date}</span></h3>
          <ul className="vitae__sublist">
            {vitaeData[section][date].map((item, index) => (
              <li key={index} className="vitae__sublist-item">
                <span className="company">{item.company}</span> <span className="role">{item.title}</span>
              </li>
            ))}
          </ul>
        </li>
      )).reverse()}
    </ul>
  );

  return (
    <main className="vitae">
      <div className="vitae__inner">
        <header className="vitae__header">
          <h1>Jason Howmans</h1>
          <h2>Multi-Disciplinary Designer &amp; Software Engineer</h2>
        </header>
        <section className="vite__section">
          <header className="vitae__section-head">
            <h1>Experience</h1>
          </header>
          <div className="vitae__block">
            <h2>Full Time</h2>
            {listFrom('fulltime')}
          </div>
          <div className="vitae__block">
            <h2>Freelance</h2>
            {listFrom('freelance')}
          </div>
        </section>
        <section className="vite__section">
          <header className="vitae__section-head">
            <h1>Links</h1>
          </header>
          <ul className="vitae__list">
            {Object.keys(vitaeData.urls).map((name, index) => (
              <li key={index}><a target="_blank" href={vitaeData.urls[name]}>{name}</a></li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Vitae
