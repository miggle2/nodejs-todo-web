import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log("성공");
        getTasks();
        setTodoValue("");
      } else {
        throw new Error("task can not be added");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await api.delete(`/tasks/${_id}`);
      if (response.status === 200) {
        console.log("success");
        getTasks();
      } else {
        throw new Error("삭제가 안되는 이유를 찾아봐");
      }
    } catch (error) {
      console.log("errer", error);
    }
  };

  const handleComplete = async (_id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await api.put(`/tasks/${_id}`, { isComplete: newStatus });
      if (response.status === 200) {
        console.log("다했다");
        setTodoList((prev) =>
          prev.map((todo) =>
            todo._id === _id ? { ...todo, isComplete: newStatus } : todo
          )
        );
      } else {
        throw new Error("다했는데?");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onDelete={handleDelete}
        onComplete={handleComplete}
      />
    </Container>
  );
}

export default App;
