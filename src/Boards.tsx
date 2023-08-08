import { Button, Tab } from "semantic-ui-react";
import Board from "./Board";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { httpClient } from "./httpClient";

const Boards = () => {
  const queryClient = useQueryClient();
  const { data: boards, isLoading: boardsLoading } = useQuery("boards", () => {
    return httpClient
      .get<{ title: string; id: string }[]>("v1/board")
      .then((res) => res.data);
  });

  const addBoardMutation = useMutation(
    (name: string) => {
      return httpClient.post("v1/board", { title: name });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("boards");
      }
    }
  );

  const handleAddBoard = async () => {
    if (!boards) {
      return;
    }
    const newBoardName = `Board ${
      boards.length === 0
        ? 1
        : +boards[boards.length - 1].title.split(" ")[1] + 1
    }`;
    await addBoardMutation.mutateAsync(newBoardName);
  };

  return (
    <div>
      <Button onClick={handleAddBoard} floated="right" color="green">
        Add Board
      </Button>
      {boardsLoading ? (
        <div>Loading...</div>
      ) : (
        <Tab
          panes={boards?.map((board) => ({
            menuItem: board.title,
            render: () => <Board boardId={board.id} />
          }))}
        />
      )}
    </div>
  );
};

export default Boards;
