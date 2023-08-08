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
    await addBoardMutation.mutateAsync(`Board ${boards.length + 1}`);
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
