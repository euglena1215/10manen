import Router, { useRouter } from "next/router";
import axios from "axios";

import Layout from "../components/Layout";
import { useEffect, useState } from "react";

interface Res {
  consume_rate: number;
  user_voices: string[];
}
export default () => {
  useEffect(() => {
    let timer: number;
    const fetchCalculated = async () => {
      const { data } = await axios.post<Res>("/api/calculate");
      const consumeRate = data.consume_rate;
      const userVoices = data.user_voices;
      timer = setTimeout(() => {
        Router.push(
          `/Result?consumeRate=${consumeRate}&userVoices=${userVoices.join(
            ","
          )}`
        );
        console.log(consumeRate, userVoices);
      }, 3000);
    };
    fetchCalculated();
    return () => clearTimeout(timer);
  }, []);
  return <Layout>公開中...</Layout>;
};
