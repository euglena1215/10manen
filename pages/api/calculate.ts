import { NextApiRequest, NextApiResponse } from "next";
import { INPUT_ATTRIBUTE } from "../CreateForm";

type Data = {
  consume_rate: number;
  user_voices: string[];
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const rawInputAttributes = req.body.inputAttributes;
    const inputAttributes = rawInputAttributes.map(
      (attr) => JSON.parse(attr) as INPUT_ATTRIBUTE
    );

    res.end(
      JSON.stringify({
        consume_rate: calculateComsumeRate(inputAttributes),
        user_voices: [
          "使いにくい。これ作った人はどうかしてるのか",
          "公開遅くね？",
          "項目多すぎてめんどすぎるわ",
        ],
      })
    );
  }
};

const calculateComsumeRate = (inputAttributes: INPUT_ATTRIBUTE[]) => {
  const initialRate = 3;

  return initialRate * 0.85 ** inputAttributes.length;
};
