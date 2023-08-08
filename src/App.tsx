import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "semantic-ui-react";
import Boards from "./Boards";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <h1
          style={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          Todo App
        </h1>
        <Boards />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
