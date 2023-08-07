import { Button, Container, Grid, Input, Item } from "semantic-ui-react";
import Task from "./Task";

const Board = () => {
  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <Grid.Column>
          <Item>
            <Item.Content verticalAlign="middle">
              <Item.Header as="h2">New Tasks</Item.Header>
            </Item.Content>
          </Item>
          <Task />
        </Grid.Column>
        <Grid.Column>
          <Container>
            <Input placeholder="To Do List Name" />
            <Button primary>Add</Button>
          </Container>
        </Grid.Column>
        <Grid.Column>
          <Grid.Column>
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header as="h2">Completed Tasks</Item.Header>
              </Item.Content>
            </Item>
            <Task isCompleted={true} />
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Board;
