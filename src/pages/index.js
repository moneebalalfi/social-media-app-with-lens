import {
  Container,
  Flex,
  Heading,
  Image as ChakraImage,
  LinkBox,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { client, recommendedProfiles } from "../api";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
    console.log(profiles);
  }, [profiles]);

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendedProfiles).toPromise();
      setProfiles(response.data.recommendedProfiles);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Lens app</title>
        <meta name="description" content="Web3 social media app with Lens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDir={"column"}>
        {!loading ? (
          <Container maxW={"container.lg"} p={6}>
            {profiles.map((profile) => (
              <Link key={profile.id} href={`/profile/${profile.id}`} passHref>
                <LinkBox p={4} cursor="pointer" borderBottom={"1px"}>
                  {profile.picture ? (
                    <ChakraImage
                      src={
                        profile.picture?.original?.url || profile.picture.uri
                      }
                      alt={profile.handle}
                      w={32}
                      h={32}
                    />
                  ) : null}
                  <Heading size="md">{profile.handle}</Heading>
                  <Text>{profile.bio}</Text>
                </LinkBox>
              </Link>
            ))}
          </Container>
        ) : (
          <Spinner />
        )}
      </Flex>
    </>
  );
}
