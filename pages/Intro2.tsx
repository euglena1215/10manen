import Layout from "../components/Layout";
import Link from "next/link";
import styled from "styled-components";

export default () => (
  <Layout>
    <Title>ストーリー</Title>
    <TextBox>
      <p>ある日、上司が案件をもってやってきた。</p>

      <Link href="/Intro3">
        <TextBoxNextLinkWrapper>
          <TextBoxNextLink>> 次へ</TextBoxNextLink>
        </TextBoxNextLinkWrapper>
      </Link>
    </TextBox>

    <ImgWrapper>
      <img src="/images/intro2.png" alt="" width="400px;" />
    </ImgWrapper>
  </Layout>
);

const Title = styled.h1`
  font-size: 1.5rem;
`;

const ImgWrapper = styled.div`
  text-align: center;
`;

const TextBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
`;

const TextBoxNextLinkWrapper = styled.div`
  text-align: right;
  margin: 10px;
`;

const TextBoxNextLink = styled.a`
  color: #555;
  cursor: pointer;

  :hover {
    color: #000;
  }
`;
