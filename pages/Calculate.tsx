import Router, { useRouter } from "next/router";
import axios from "axios";

import Layout from "../components/Layout";
import { useEffect } from "react";
import { ApiCalcurateResponse } from "./api/calculate";

export default () => {
  const router = useRouter();
  const rawInputAttributes = router.query.inputAttributes as string[];
  const time = Number(router.query.time);

  useEffect(() => {
    let timer: number;
    const fetchCalculated = async () => {
      const { data } = await axios.post<ApiCalcurateResponse>(
        "/api/calculate",
        {
          time: time,
          inputAttributes: rawInputAttributes,
        }
      );
      const consumeRate = data.consume_rate;
      const userVoices = data.user_voices;
      const userImagePath = data.user_image_path;
      const clientVoices = data.client_voices;
      const clientImagePath = data.client_image_path;
      const resultType = data.result_type;

      switch (resultType) {
        case "NORMAL":
          timer = setTimeout(() => {
            Router.replace(
              `/Result?consumeRate=${consumeRate}&userVoices=${userVoices.join(
                ","
              )}&clientVoices=${clientVoices.join(
                ","
              )}&userImagePath=${userImagePath}&clientImagePath=${clientImagePath}`
            );
          }, 3000);

          Router.prefetch(
            `/Result?consumeRate=${consumeRate}&userVoices=${userVoices.join(
              ","
            )}&clientVoices=${clientVoices.join(
              ","
            )}&userImagePath=${userImagePath}&clientImagePath=${clientImagePath}`
          );
          break;
        case "TIME_LIMIT_EXCEEDED":
          timer = setTimeout(() => {
            Router.replace(`/TimeLimitExceeded`);
          }, 3000);

          Router.prefetch(`/TimeLimitExceeded`);
          break;
      }
    };
    fetchCalculated();

    return () => clearTimeout(timer);
  }, []);
  return <Layout>公開中...</Layout>;
};
