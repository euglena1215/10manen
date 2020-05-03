import Router, { useRouter } from "next/router";
import axios from "axios";

import Layout from "../components/Layout";
import { useEffect } from "react";

interface Res {
  consume_rate: number;
  user_voices: string[];
}
export default () => {
  const router = useRouter();
  const rawInputTypes = router.query.inputTypes;
  const inputTypes =
    typeof rawInputTypes === "string"
      ? rawInputTypes.split(",")
      : rawInputTypes;

  useEffect(() => {
    let timer: number;
    const fetchCalculated = async () => {
      const { data } = await axios.post<Res>("/api/calculate", {
        inputTypes,
      });
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
