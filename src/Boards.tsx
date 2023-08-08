import { Button, Tab } from "semantic-ui-react";
import Board from "./Board";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { httpClient } from "./httpClient";

const Boards = () => {
  const queryClient = useQueryClient();
  const { data: boards, isLoading: boardsLoading } = useQuery("boards", () => {
    return httpClient
      .get<{ title: string }[]>("v1/board")
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

  console.log("boards", boards);

  return (
    <div>
      <h3>Boards</h3>
      <Button onClick={handleAddBoard}>Add Board</Button>
      {boardsLoading ? (
        <div>Loading...</div>
      ) : (
        <Tab
          panes={boards?.map((board) => ({
            menuItem: board.title,
            render: () => <Board />
          }))}
        />
      )}
    </div>
  );
};

export default Boards;
