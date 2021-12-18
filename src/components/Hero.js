import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBcg from '../assets/hero-bcg.jpeg'
import heroBcg2 from '../assets/hero-bcg-2.jpeg'

const Hero = () => {
  return <Wrapper className="section-center">
    <article className="content">
      <h1>
        Furniture  <br />
        comfort zone 
      </h1>
      <p>
      Suspendisse turpis nisi, sagittis et eros non, imperdiet eleifend lorem. Ut sed leo a urna hendrerit porta. Aenean nibh diam, malesuada luctus libero nec, rhoncus blandit sem. Ut non mollis justo. Pellentesque vitae eros molestie, malesuada dui non, efficitur purus. Curabitur eget leo dictum, dignissim velit varius, rutrum dolor.
       Praesent id ullamcorper risus. Fusce feugiat, 
      </p>
      <Link to="./products" className="btn hero-btn">
          shop now
      </Link>
    </article>
    <article className="img-container">
      <img src={heroBcg} alt="nice table" className="main-img" />
      <img src={heroBcg2} alt="person working" className="accent-img" />
    </article>
  </Wrapper>
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  .btn {
    text-transform: uppercase;
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    font-weight: 400;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
  }
  .btn:hover {
    color: var(--clr-primary-1);
    background: var(--clr-primary-7);
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero
