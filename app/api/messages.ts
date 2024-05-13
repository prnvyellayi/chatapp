import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://us1-gentle-oyster-38766.upstash.io",
  token:
    "AZduASQgYTBhZTBiMTQtYjQzMi00Zjc4LWEwZWQtZjgzYjQ1M2MzMTAwMTcxYzFjMzdiNzJlNDY5MWJmNWM2YmE1M2RkMzdmOGE=",
});

export default async function MessagesHandler({
  req,
  res,
}: {
  req: any;
  res: any;
}) {
  const data = await redis.set("foo", "bar");
}
