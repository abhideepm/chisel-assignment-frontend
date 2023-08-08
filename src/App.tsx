import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "semantic-ui-react";
import Boards from "./Boards";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <h1>Todo App</h1>
        <Boards />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
