import { Badge, Box, Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lens app</title>
        <meta name="description" content="Web3 social media app with Lens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex h="100vh" alignItems={"center"} justifyContent={"center"}>
        <Heading>
          Web3 social media app with
          <Badge ml={2} fontSize="3xl" colorScheme={"blue"}>
            Lens Protocol
          </Badge>
        </Heading>
      </Flex>
    </>
  );
}
