import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: murshidmonzpv@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/murshidameenpv",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/murshid-ameen/",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com/users/21191293/murshid-ameen",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const scrollPosition = useRef(0);
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition < scrollPosition.current) { // Scrolling up
        headerRef.current.style.transform = 'translateY(0)';
      } else { // Scrolling down
        headerRef.current.style.transform = 'translateY(-200px)';
      }
      scrollPosition.current = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          spacing={4}
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
         <nav>
      <HStack spacing={4}>
     {socials.map((social, index) => (
      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={social.icon} size="2x" />
        </a>
      ))}
     </HStack>
     </nav>
          <nav>
  <HStack spacing={8}>
    <a href="#projects-section" onClick={handleClick("projects")}>Projects</a>
    <a href="#contactme-section" onClick={handleClick("contactme")}>Contact Me</a>
  </HStack>
</nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
