import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/Layout";

const Index = () => (
  <Layout>
    <Title>10万円支給されるやつ（仮）</Title>

    <Link href="/intro">
      <a>スタート</a>
    </Link>
  </Layout>
);
export default Index;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
`;
