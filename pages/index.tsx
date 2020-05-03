import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/Layout";

export default () => (
  <Layout>
    <Title>10万円支給されるやつ（仮）</Title>
    <ImgWrapper>
      <img src="/images/index.png" alt="" />
    </ImgWrapper>

    <StartLink>
      <Link href="/Intro">
        <a>スタート</a>
      </Link>
    </StartLink>
  </Layout>
);

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
`;

const ImgWrapper = styled.div`
  text-align: center;
`;

const StartLink = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5rem;
`;
