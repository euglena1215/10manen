export default (req, res) => {
  if (req.method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        consume_rate: 10.0,
        user_voices: [
          "使いにくい。これ作った人はどうかしてるのか",
          "公開遅くね？",
          "項目多すぎてめんどすぎるわ",
        ],
      })
    );
  }
};
