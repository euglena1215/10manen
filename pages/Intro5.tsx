import Layout from "../components/Layout";
import Link from "next/link";
import styled from "styled-components";

export default () => (
  <Layout>
    <Title>ルール</Title>
    <TextBox>
      <p>期限までに申請フォームを完成させてください。</p>

      <Link href="/CreateForm">
        <TextBoxNextLinkWrapper>
          <TextBoxNextLink>> つくるぞ！</TextBoxNextLink>
        </TextBoxNextLinkWrapper>
      </Link>
    </TextBox>

    <ImgWrapper>
      <img src="/images/intro5.png" alt="" width="400px;" />
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
