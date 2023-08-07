import { Button, Checkbox, Icon, Item } from "semantic-ui-react";

const Task = ({ isCompleted = false }: { isCompleted?: boolean }) => {
  return (
    <Item.Content>
      <Item.Extra>
        <Item.Header as="h3">name</Item.Header>
        {!isCompleted && <Checkbox />}
        <Button floated="right">
          <Icon name="trash" color="red" />
        </Button>
      </Item.Extra>
    </Item.Content>
  );
};

export default Task;
