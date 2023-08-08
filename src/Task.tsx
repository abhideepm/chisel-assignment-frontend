import { Checkbox, Grid, Icon, Item } from "semantic-ui-react";

type TaskProps = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onMarkCompleted: () => void;
};

const Task = ({
  name,
  isCompleted = false,
  onDelete,
  onMarkCompleted
}: TaskProps) => {
  return (
    <Item.Content>
      <Item.Extra>
        <Grid columns={3} verticalAlign="middle">
          <Grid.Column width={10}>
            <Item.Header as="h3">{name}</Item.Header>
          </Grid.Column>
          <Grid.Column width={2} textAlign="center">
            {!isCompleted && <Checkbox onClick={onMarkCompleted} />}
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            <Icon name="trash" color="red" onClick={onDelete} />
          </Grid.Column>
        </Grid>
      </Item.Extra>
    </Item.Content>
  );
};

export default Task;
