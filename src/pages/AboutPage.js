import React from 'react'
import styled from 'styled-components'
import PageHero  from '../components/PageHero'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title="about" />
    <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ante sem, consequat tempor justo in, malesuada sagittis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam elementum sit amet libero id efficitur. Aliquam bibendum semper lorem, sit amet ultricies ante posuere ut. Duis orci nunc, iaculis et lectus quis, pharetra ullamcorper sapien. Nam rutrum condimentum nisi at posuere. Suspendisse potenti. Quisque posuere nunc quis velit dictum porta.
          </p>
        </article>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
