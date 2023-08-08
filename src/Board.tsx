import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Container, Grid, Input, Item } from "semantic-ui-react";
import Task from "./Task";
import { httpClient } from "./httpClient";

type Todo = {
  id: string;
  title: string;
  status: string;
};

const Board = ({ boardId }: { boardId: string }) => {
  const [todoName, setTodoName] = useState("");
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation(
    (name: string) => {
      return httpClient.post("v1/todo", { title: name, boardId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tasks_${boardId}`);
        setTodoName("");
      }
    }
  );

  const deleteTaskMutation = useMutation(
    (id: string) => {
      return httpClient.delete(`v1/todo/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tasks_${boardId}`);
      }
    }
  );

  const markTaskCompletedMutation = useMutation(
    (id: string) => {
      return httpClient.patch(`v1/todo/${id}/status`, { status: "DONE" });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`tasks_${boardId}`);
      }
    }
  );

  const { data: todos, isLoading: todosLoading } = useQuery(
    `tasks_${boardId}`,
    () => {
      return httpClient
        .get<Todo[]>(`v1/todo/${boardId}`)
        .then((res) => res.data);
    }
  );

  const handleAddTask = async () => {
    await addTaskMutation.mutateAsync(todoName);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  const handleMarkTaskCompleted = async (id: string) => {
    await markTaskCompletedMutation.mutateAsync(id);
  };

  const [inProgressTodos, completedTodos] = useMemo(() => {
    if (!todos) {
      return [[], []];
    }
    return todos.reduce(
      (acc, todo) => {
        if (todo.status === "IN_PROGRESS") {
          acc[0].push(todo);
        } else {
          acc[1].push(todo);
        }
        return acc;
      },
      [[], []] as [Todo[], Todo[]]
    );
  }, [todos]);

  return (
    <>
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header
                  as="h2"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  New Tasks
                </Item.Header>
              </Item.Content>
            </Item>
            {todosLoading ? (
              <div>Loading...</div>
            ) : (
              inProgressTodos.map((todo) => (
                <Task
                  key={todo.id}
                  name={todo.title}
                  isCompleted={false}
                  onDelete={() => handleDeleteTask(todo.id)}
                  onMarkCompleted={() => handleMarkTaskCompleted(todo.id)}
                />
              ))
            )}
          </Grid.Column>
          <Grid.Column>
            <Container textAlign="center">
              <Input
                placeholder="To Do List Item Name"
                icon="add"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                size="big"
                style={{
                  width: "100%",
                  marginTop: "50px",
                  marginBottom: "20px"
                }}
              />
              <Button
                onClick={handleAddTask}
                primary
                disabled={addTaskMutation.isLoading}
              >
                {addTaskMutation.isLoading ? "Adding..." : "Add Task"}
              </Button>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Item>
              <Item.Content verticalAlign="middle">
                <Item.Header
                  as="h2"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  Completed Tasks
                </Item.Header>
              </Item.Content>
            </Item>
            {todosLoading ? (
              <div>Loading...</div>
            ) : (
              completedTodos.map((todo) => (
                <Task
                  key={todo.id}
                  name={todo.title}
                  isCompleted={true}
                  onDelete={() => handleDeleteTask(todo.id)}
                  onMarkCompleted={() => handleMarkTaskCompleted(todo.id)}
                />
              ))
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Board;
