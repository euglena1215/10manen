import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/Layout";

export default () => (
  <Layout>
    <Title>10万円支給されるやつ（仮）</Title>

    <Link href="/Intro">
      <a>スタート</a>
    </Link>
  </Layout>
);

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
`;
