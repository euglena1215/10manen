import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styled from "styled-components";

export default () => {
  const router = useRouter();
  const { consumeRate, userVoices } = router.query;

  const formattedUserVoices =
    typeof userVoices === "string" ? userVoices.split(",") : userVoices;

  const zaigen = 100;

  return (
    <Layout>
      <Title1>想定財源{zaigen}億円に対して...</Title1>
      <Title2>
        {(zaigen * Number(consumeRate)).toString().slice(0, 3)}
        億円使いました！
      </Title2>

      <VoiceWrapper>
        <ClientVoice>
          <ClientVoiceTitle>政府の声</ClientVoiceTitle>
          <Balloon>
            <p>いやー、良かったよ！</p>
            <p>これからもよろしく頼むよ！</p>
          </Balloon>
          <ImgWrapper>
            <img src="/images/client.png" height="200px" />
          </ImgWrapper>
        </ClientVoice>
        <UserVoice>
          <UserVoiceTitle>国民の声</UserVoiceTitle>
          <Balloon>
            {formattedUserVoices &&
              formattedUserVoices.map((userVoice) => <p>「{userVoice}」</p>)}
          </Balloon>
          <ImgWrapper>
            <img src="/images/user.png" height="200px" />
          </ImgWrapper>
        </UserVoice>
      </VoiceWrapper>

      <Link href="/CreateForm">
        <RetryLink>
          <Retry>つくり直す</Retry>
        </RetryLink>
      </Link>
    </Layout>
  );
};

const Title1 = styled.p`
  margin: 20px;
  font-size: 1rem;
  text-align: center;
`;

const Title2 = styled.p`
  margin: 20px;
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;
`;

const VoiceWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const UserVoice = styled.div`
  width: 45%;
`;

const UserVoiceTitle = styled.p`
  text-align: center;
  width: 100%;
`;

const ClientVoice = styled.div`
  width: 45%;
`;

const ClientVoiceTitle = styled.p`
  text-align: center;
  width: 100%;
`;

const Balloon = styled.div`
  position: relative;
  display: inline-block;
  margin: 1.5em 1rem;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #fff;
  border: solid 3px #555;
  box-sizing: border-box;

  :before {
    content: "";
    position: absolute;
    bottom: -24px;
    left: 50%;
    margin-left: -15px;
    border: 12px solid transparent;
    border-top: 12px solid #fff;
    z-index: 2;
  }

  :after {
    content: "";
    position: absolute;
    bottom: -30px;
    left: 50%;
    margin-left: -17px;
    border: 14px solid transparent;
    border-top: 14px solid #555;
    z-index: 1;
  }
`;

const ImgWrapper = styled.div`
  text-align: center;
`;

const Retry = styled.div`
  border: 2px solid;
  border-radius: 3px;
  padding: 10px;
  width: 120px;
  text-align: center;
  color: #000;
  margin: 10px auto;
  font-size: 0.8rem;

  :hover {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
  }
`;

const RetryLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
