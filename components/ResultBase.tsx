import styled from "styled-components";
import Layout from "./Layout";
import Link from "next/link";

export default ({ children, twitterContent }) => {
  return (
    <Layout>
      {children}

      <Link href="/CreateForm">
        <LinkWrapper>
          <LinkText>つくり直す</LinkText>
        </LinkWrapper>
      </Link>

      <LinkWrapper>
        <LinkText
          href={`http://twitter.com/share?url=https://10manen.now.sh/&text=${twitterContent}&hashtags=10万円支給されるやつ`}
          target="_blank"
        >
          Twitterで共有する
        </LinkText>
      </LinkWrapper>
    </Layout>
  );
};

const LinkWrapper = styled.div`
  border: 2px solid;
  border-radius: 3px;
  padding: 10px;
  width: 30%;
  text-align: center;
  margin: 10px auto;
  font-size: 0.8rem;

  :hover {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
  }
`;

const LinkText = styled.a`
  text-decoration: none;
  color: #000;
  cursor: pointer;
`;
