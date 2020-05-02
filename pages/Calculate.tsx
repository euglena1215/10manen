import Router, { useRouter } from "next/router";

import Layout from "../components/Layout";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      Router.push("/Result");
    }, 3000);
    return () => clearTimeout(timer);
  });

  return <Layout>公開中...</Layout>;
};
