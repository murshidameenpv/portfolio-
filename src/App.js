import { ChakraProvider } from "@chakra-ui/react";
import { AlertProvider } from "./context/alertContext";
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <main>
          
      </main>
      </AlertProvider>
    </ChakraProvider>
  )
}

export default App;
