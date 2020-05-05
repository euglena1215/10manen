import Layout from "../components/Layout";
import Link from "next/link";
import styled from "styled-components";

export default () => (
  <Layout>
    <Title>ストーリー</Title>
    <TextBox>
      <p>「国民に10万円支給したいから申請フォーム作って！</p>
      <p>
        ただ、国民全員に申請されちゃうと財源無くなっちゃうから良い感じに煩雑にして調整して（笑）」
      </p>

      <Link href="/Intro5">
        <TextBoxNextLinkWrapper>
          <TextBoxNextLink>> 次へ</TextBoxNextLink>
        </TextBoxNextLinkWrapper>
      </Link>
    </TextBox>

    <ImgWrapper>
      <img src="/images/intro4.png" alt="" width="300px;" />
    </ImgWrapper>

    <Link href="/CreateForm">
      <SkipLinkWrapper>
        <SkipLink>>> スキップ</SkipLink>
      </SkipLinkWrapper>
    </Link>
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

const SkipLinkWrapper = styled.div`
  text-align: right;
  margin: 10px;
`;

const SkipLink = styled.a`
  color: #555;
  cursor: pointer;
  font-size: 0.7rem;

  :hover {
    color: #000;
  }
`;
