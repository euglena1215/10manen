import { useRouter } from "next/router";
import styled from "styled-components";

import ResultBase from "../components/ResultBase";

const Result = () => {
  const router = useRouter();
  const {
    consumeRate,
    userVoices,
    clientVoices,
    userImagePath,
    clientImagePath,
  } = router.query;

  const formattedUserVoices =
    typeof userVoices === "string" ? userVoices.split(",") : userVoices || [];
  const formattedClientVoices =
    typeof clientVoices === "string"
      ? clientVoices.split(",")
      : clientVoices || [];

  const zaigen = 1000;

  const isAkaji = (rate) => Number(rate) > 1;

  const actual = Math.floor(zaigen * Number(consumeRate));

  return (
    <ResultBase
      twitterContent={`想定財源${zaigen}億円に対して、${actual}億円使いました！%0a国民の声：${formattedUserVoices
        .map((voice) => `「${voice}」`)
        .join("")}%0a政府の声：「${formattedClientVoices.join("")}」%0a`}
    >
      <Title1>想定財源{zaigen}億円に対して...</Title1>
      <Title2>
        {isAkaji(Number(consumeRate)) ? (
          <AkajiStyled>{actual}</AkajiStyled>
        ) : (
          actual
        )}
        億円使いました！
      </Title2>

      <VoiceWrapper>
        <ClientVoice>
          <ClientVoiceTitle>政府の声</ClientVoiceTitle>
          <Balloon>
            {formattedClientVoices &&
              formattedClientVoices.map((clientVoice) => <p>{clientVoice}</p>)}
          </Balloon>
          <ImgWrapper>
            <img src={clientImagePath as string} height="200px" />
          </ImgWrapper>
        </ClientVoice>
        <UserVoice>
          <UserVoiceTitle>国民の声</UserVoiceTitle>
          <Balloon>
            {formattedUserVoices &&
              formattedUserVoices.map((userVoice) => <p>「{userVoice}」</p>)}
          </Balloon>
          <ImgWrapper>
            <img src={userImagePath as string} height="200px" />
          </ImgWrapper>
        </UserVoice>
      </VoiceWrapper>
    </ResultBase>
  );
};
export default Result;

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

const AkajiStyled = styled.span`
  color: red;
`;
