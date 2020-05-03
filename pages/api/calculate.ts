import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  consume_rate: number;
  user_voices: string[];
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const rawInputTypes = req.body.inputTypes;
    const inputTypes =
      typeof rawInputTypes === "string"
        ? rawInputTypes.split(",")
        : rawInputTypes;

    res.end(
      JSON.stringify({
        consume_rate: calculateComsumeRate(inputTypes),
        user_voices: [
          "使いにくい。これ作った人はどうかしてるのか",
          "公開遅くね？",
          "項目多すぎてめんどすぎるわ",
        ],
      })
    );
  }
};

const calculateComsumeRate = (inputTypes: string[]) => {
  const initialRate = 3;

  return Math.round(initialRate * 0.85 ** inputTypes.length * 100) / 100;
};
