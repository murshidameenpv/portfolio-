import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box boxShadow="lg" rounded="md" overflow="hidden">
      <Image loading="lazy" src={imageSrc} alt={title} />
      <VStack align="start" p={4}>
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
        <HStack spacing={2}>
          <Text>Read More</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;
