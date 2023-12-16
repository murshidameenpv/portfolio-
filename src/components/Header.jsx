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
   url: "mailto: murshidmon@gmail.com", 
 }, 
 { 
   icon: faGithub, 
   url: "https://github.com/murshidameenpv", 
 }, 
 { 
   icon: faLinkedin, 
   url: "https://www.linkedin.com/in/murshidameenpv/", 
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

/** 
* This component illustrates the use of both the useRef hook and useEffect hook. 
* The useRef hook is used to create a reference to a DOM element, in order to tweak the header styles and run a transition animation. 
* The useEffect hook is used to perform a subscription when the component is mounted and to unsubscribe when the component is unmounted. 
* Additionally, it showcases a neat implementation to smoothly navigate to different sections of the page when clicking on the header elements. 
*/ 
const Header = () => { 
 const headerRef = useRef(null); 
 
 useEffect(() => { 
   let prevScrollPos = window.scrollY; 
 
   const handleScroll = () => { 
     const currentScrollPos = window.scrollY; 
     const headerElement = headerRef.current; 
     if (!headerElement) { 
       return; 
     } 
     if (prevScrollPos > currentScrollPos) { 
       headerElement.style.transform = "translateY(0)"; 
     } else { 
       headerElement.style.transform = "translateY(-200px)"; 
     } 
     prevScrollPos = currentScrollPos; 
   } 
   window.addEventListener('scroll', handleScroll) 
 
   return () => { 
     window.removeEventListener('scroll', handleScroll) 
   } 
 }, []); 
 
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
 return ( 
   <Box 
     position="fixed" 
     top={0} 
     left={0} 
     right={0} 
     translateY={0} 
     transitionProperty="transform" 
     transitionDuration=".3s" 
     transitionTimingFunction="ease-in-out" 
     backgroundColor="#18181b" 
     ref={headerRef} 
   > 
     <Box color="white" maxWidth="1280px" margin="0 auto"> 
       <HStack 
         px={16} 
         py={4} 
         justifyContent="space-between" 
         alignItems="center" 
       > 
         <nav> 
           <HStack spacing={8}> 
             {socials.map(({ icon, url }) => ( 
               <a 
                 key={url} 
                 href={url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
               > 
                 <FontAwesomeIcon icon={icon} size="2x" key={url} /> 
               </a> 
             ))} 
           </HStack> 
         </nav> 
         <nav> 
           <HStack spacing={8}> 
             <a href="#projects" onClick={handleClick("projects")}> 
               Projects 
             </a> 
             <a href="#contactme" onClick={handleClick("contactme")}> 
               Contact Me 
             </a> 
           </HStack> 
         </nav> 
       </HStack> 
     </Box> 
   </Box> 
 ); 
}; 

export default Header;


// scrollPosition reference is initially set to zero and it is indeed a mutable object.
// The line if (currentScrollPosition < scrollPosition.current) is checking if the current scroll position of the page is less than the last known scroll position. If it is, that means the user is scrolling up.
// The scrollPosition.current value is updated with the line scrollPosition.current = currentScrollPosition; which is executed every time the handleScroll function runs. This line sets scrollPosition.current to the current scroll position of the page, effectively “remembering” the last scroll position for the next time the user scrolls.

// This is possible because useRef in React creates a mutable object. The .current property of the reference object created by useRef is mutable and can be changed freely, and it will persist for the full lifetime of the component. This makes it ideal for storing values that need to persist across renders but don’t need to trigger a re-render when they change, like the scroll position in this case.

// I hope this helps! Let me know if you have any other questions.


