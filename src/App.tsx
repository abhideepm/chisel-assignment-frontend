import { Container, Tab } from "semantic-ui-react";
import Board from "./Board";

const App = () => {
  return (
    <Container>
      <h1>Todo App</h1>
      <h3>Boards</h3>
      <Tab
        panes={[
          {
            menuItem: "Tab 1",
            render: () => <Board />
          },
          {
            menuItem: "Tab 2",
            render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
          },
          {
            menuItem: "Tab 3",
            render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
          }
        ]}
      />
    </Container>
  );
};

export default App;
