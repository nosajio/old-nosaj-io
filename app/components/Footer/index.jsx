import React, { PropTypes } from 'react'

import './footer.scss';

const Footer = (props) => {
  return (
    <footer className={`the-end ${props.inView ? 'the-end--in-view' : 'the-end--not-in-view'}`}>
      <span className="the-end__text">
        Thanks for visiting. This is for you:
      </span>
      <span className="the-end__heart">
        <svg xmlns="http://www.w3.org/2000/svg" width="174" height="160" viewBox="0 0 174 160">
          <defs>
              <path d="M0.000546133119,48.1729083 C0.116053708,21.5680168 21.5682918,0 48.1734545,0 C64.0687606,0 78.1659666,11.6985815 86.9398186,23.5704903 C95.7136705,11.6985815 109.810877,0 125.706183,0 C152.311345,0 173.879091,21.5677457 173.879091,48.1729083 C173.879091,104.081991 91.9340671,158.321169 91.9340671,158.321169 C88.7761028,160.536247 83.6522653,160.543285 80.510798,158.272184 C80.510798,158.272184 -0.242189028,104.082165 0.000546133119,48.1729083 Z" id="path-1"></path>
          </defs>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g dangerouslySetInnerHTML={{__html: `
                <mask id="mask-2" fill="white">
                  <use xlink:href="#path-1"></use>
                </mask>
                <use fill="#8B8B8B" xlink:href="#path-1"></use>
                <g mask="url(#mask-2)">
                  <g class="the-end__heart-animate">
                    <rect width="63" height="198" x="437" fill="#11B2DF"/>
                    <rect width="63" height="198" x="500" fill="#F95741"/>
                    <rect width="63" height="198" x="563" fill="#F9A141"/>
                    <rect width="63" height="198" x="626" fill="#E8349E"/>
                    <rect width="63" height="198" x="689" fill="#9E8FEC"/>
                    <rect width="63" height="198" x="374" fill="#FBFF2C"/>
                    <rect width="94" height="198" x="280" fill="#39D475"/>
                    <rect width="106" height="198" x="174" fill="#5C31F7"/>
                    <rect width="174" height="198" fill="#c73939"/>
                  <g>
                </g>`}}>
              </g>
          </g>
        </svg>
      </span>
    </footer>
  )
}

export default Footer
