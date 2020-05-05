import Router, { useRouter } from "next/router";
import axios from "axios";

import Layout from "../components/Layout";
import { useEffect } from "react";
import { ApiCalcurateResponse } from "./api/calculate";

export default () => {
  const router = useRouter();
  const rawInputAttributes = router.query.inputAttributes as string[];

  useEffect(() => {
    let timer: number;
    const fetchCalculated = async () => {
      const { data } = await axios.post<ApiCalcurateResponse>(
        "/api/calculate",
        {
          inputAttributes: rawInputAttributes,
        }
      );
      const consumeRate = data.consume_rate;
      const userVoices = data.user_voices;
      const userImagePath = data.user_image_path;
      const clientVoices = data.client_voices;
      const clientImagePath = data.client_image_path;

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
    };
    fetchCalculated();

    return () => clearTimeout(timer);
  }, []);
  return <Layout>公開中...</Layout>;
};
