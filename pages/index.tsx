import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/Layout";

export default () => (
  <Layout>
    <Title>10万円支給されるやつ（仮）</Title>
    <ImgWrapper>
      <img src="/images/index.png" alt="" />
    </ImgWrapper>

    <StartLinkWrapper>
      <Link href="/Intro">
        <StartLink>> スタート</StartLink>
      </Link>
    </StartLinkWrapper>
  </Layout>
);

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const ImgWrapper = styled.div`
  text-align: center;
`;

const StartLinkWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const StartLink = styled.a`
  color: #555;
  cursor: pointer;

  :hover {
    color: #000;
  }
`;
