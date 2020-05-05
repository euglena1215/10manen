import { NextApiRequest, NextApiResponse } from "next";
import { INPUT_ATTRIBUTE } from "../CreateForm";

export type ApiCalcurateResponse = {
  consume_rate: number;
  user_voices: string[];
  user_image_path: string;
  client_voices: string[];
  client_image_path: string;
  result_type: RESULT_TYPE;
};

type RESULT_TYPE = "NORMAL" | "TIME_LIMIT_EXCEEDED";

export default (
  req: NextApiRequest,
  res: NextApiResponse<ApiCalcurateResponse>
) => {
  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const inputAttributes = ((rawInputAttributes) => {
      let inputAttributes: INPUT_ATTRIBUTE[];
      if (rawInputAttributes) {
        if (rawInputAttributes !== 0) {
          inputAttributes = rawInputAttributes.map((attr) => JSON.parse(attr));
        } else {
          inputAttributes = JSON.parse(rawInputAttributes);
        }
      } else {
        inputAttributes = [];
      }
      return inputAttributes;
    })(req.body.inputAttributes);

    const time = Number(req.body.time);

    res.end(
      JSON.stringify({
        consume_rate: calculateComsumeRate(inputAttributes),
        user_voices: calculateUserVoices(inputAttributes),
        user_image_path: calculateUserImagePath(inputAttributes),
        client_voices: calculateClientVoices(inputAttributes),
        client_image_path: calculateClientImagePath(inputAttributes),
        result_type: calculateResultType(time),
      })
    );
  }
};

const calculateComsumeRate = (inputAttributes: INPUT_ATTRIBUTE[]) => {
  const initialRate = 3;

  return initialRate * 0.85 ** inputAttributes.length;
};

const calculateUserImagePath = (inputAttributes: INPUT_ATTRIBUTE[]) => {
  const rate = calculateComsumeRate(inputAttributes);

  if (rate > 1) {
    return "/images/user2.png";
  } else {
    return "/images/user.png";
  }
};

const calculateClientImagePath = (inputAttributes: INPUT_ATTRIBUTE[]) => {
  const rate = calculateComsumeRate(inputAttributes);

  if (rate > 1) {
    return "/images/client2.png";
  } else {
    return "/images/client.png";
  }
};

const calculateUserVoices = (inputAttributes: INPUT_ATTRIBUTE[]) => {
  const rate = calculateComsumeRate(inputAttributes);

  if (rate > 1) {
    return ["すごい簡単でびっくりした", "やるじゃん", "バラマキ政策じゃね？"];
  } else {
    return ["使いにくい", "項目多すぎてめんどすぎる", "申請させる気ないでしょ"];
  }
};

const calculateClientVoices = (inputAttributes: INPUT_ATTRIBUTE[]) => {
  const rate = calculateComsumeRate(inputAttributes);

  if (rate > 1) {
    return ["話と違うじゃないか！", "どうしてくれるんだ！！！"];
  } else {
    return ["いやー、良かったよ！", "これからもよろしく頼むよ！"];
  }
};

const calculateResultType = (time: number): RESULT_TYPE => {
  if (time > 0) {
    return "NORMAL";
  } else {
    return "TIME_LIMIT_EXCEEDED";
  }
};
