import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client, getProfileById, getPublications } from "../../api";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState({});
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    if (id) fetchProfile();
    console.log(profile);
  }, [id, profile]);

  async function fetchProfile() {
    try {
      const response = await client.query(getProfileById, { id }).toPromise();
      setProfile(response.data.profile);

      const publicationsData = await client
        .query(getPublications, { id })
        .toPromise();
      setPublications(publicationsData.data.publications.items);
    } catch (error) {
      console.log(error);
    }
  }

  if (!profile) return null;

  return (
    <Box>
      {profile.picture && (
        <Image
          src={profile.picture.original.url}
          width={"200px"}
          height={"200px"}
          alt={"profile pic"}
        />
      )}
      <Heading size="md">{profile.handle}</Heading>
      <Text>{profile.bio}</Text>
      <Text>Followers: {profile?.stats?.totalFollowers}</Text>
      <Text>Following: {profile?.stats?.totalFollowing}</Text>
      <VStack alignItems={"start"} p={4}>
        {publications?.map((pub) => (
          <Text key={pub.id}>{pub.metadata.content}</Text>
        ))}
      </VStack>
    </Box>
  );
};

export default Profile;
