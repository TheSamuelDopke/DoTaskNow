import Tasks from "./components/Tasks";
import { useState } from "react";
import AddTask from "./components/AddTask";
import { v4 } from "uuid";
import { useEffect } from "react";

import Image from "./components/Image";
import Message from "./components/Message";
import ButtonTheme from "./components/ButtonTheme";

import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light" // Inicializa com o tema salvo no localStorage ou "light"
  );

  const [themeColor, setThemeColor] = useState();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme); // Salva o tema no localStorage sempre que ele muda
  }, [theme]);

  const [message, setMessage] = useState();

  const [type, setType] = useState();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "light") {
      setThemeColor("#F0FFF0");
    } else {
      setThemeColor("#1E1E1E");
    }
  }, [theme]);

  //Usando o useEffect que é chamado cada vez que o array que colocamos no final é modificado, para salvar os dados no localStorage do usuário!
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Quando passamos no useEffect uma lista vazia como no caso abaixo, ela só será executada uma vez, que é a entrada do usuário na aplicação!
  //E se precisamos usar await, como no caso abaixo, devemos colocar async atrás da função!
  useEffect(() => {
    //   //Aqui pegamos do JSON placeholder(nosso fake backend) 10 tarefas como configurado na url ?_limit=10
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setTasks(data);
    };
    //Deixamos aqui abaixo desatualizado para não pegar objetos do json placeholder pois isso acaba com a funcionalidade do LocalStorage!
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //Caso seja true atualizará a tarefa para realizada!
      if (task.id == taskId) {
        //Se o id for o id passado na função, ele muda o status revertendo o valor com o operador !. Se a task esta completa ela já não está mais e vice-versa
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function deleteTask(taskId) {
    //A variavel removeTask vai receber todos os itens que não forem iguais ao id da task que removi, o que significa que vai receber todos os itens menos o que decidi tirar.
    const removeTask = tasks.filter((task) => task.id !== taskId);
    if (!message) {
      setMessage("Task deleted successfully!");
      setType("success");
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 3000);
    }

    setTasks(removeTask);
  }

  function onAddTaskSubmit(title, description, priority) {
    if (!title.trim()) {
      if (!message) {
        setMessage("The task must have a title!");
        setType("error");

        setTimeout(() => {
          setMessage("");
          setType("");
        }, 3000);
      }
    } else if (title.length > 30) {
      if (!message) {
        setMessage("The title must not contain more than 30 characters!");
        setType("error");
        setTimeout(() => {
          setMessage("");
          setType("");
        }, 3000);
      }
    } else {
      //Criamos a nova lista com base nos inputs.
      const newTask = {
        id: v4(),
        title: title,
        description: description,
        priority: priority,
        isCompleted: false,
        createdAt: new Date(),
      };
      //Setamos todas as tasks que ja existiam com o ...tasks, e também a nova task!
      if (!message) {
        setMessage("Task added successfully!");
        setType("success");
        setTimeout(() => {
          setMessage("");
          setType("");
        }, 3000);
      }

      setTasks([...tasks, newTask]);
    }
  }

  const [priorityOrder, setPriorityOrder] = useState("asc"); // asc or desc
  const [dateOrder, setDateOrder] = useState("asc"); // asc or desc

  const [activeFilter, setActiveFilter] = useState(null);

  const priorityOrderMap = {
    "Low priority": 1,
    "Moderate priority": 2,
    "High priority!": 3,
  };

  const sortedTasks = [...tasks].slice().sort((a, b) => {
    if (activeFilter === "priority") {
      const orderA = priorityOrderMap[a.priority];
      const orderB = priorityOrderMap[b.priority];
      if (priorityOrder === "asc") {
        return orderA - orderB;
      } else {
        return orderB - orderA;
      }
    } else if (activeFilter === "date") {
      if (dateOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }
    return 0;
  });

  const handlePriorityClick = () => {
    if (activeFilter === "priority") {
      setPriorityOrder(priorityOrder === "asc" ? "desc" : "asc");
    } else {
      setActiveFilter("priority");
    }
  };

  const handleDateClick = () => {
    if (activeFilter === "date") {
      setDateOrder(dateOrder === "asc" ? "desc" : "asc");
    } else {
      setActiveFilter("date");
    }
  };

  return (
    <div
      id="main-content"
      className={`min-h-screen w-screen flex justify-center p-6 space-x-5 ${
        theme === "light" ? "bg-[#F0FFF0]" : "bg-[#1E1E1E]"
      }`}
    >
      <ButtonTheme
        theme={theme}
        themeColor={themeColor}
        toggleTheme={toggleTheme}
      ></ButtonTheme>

      <div className="w-[500px] space-y-5">
        <div className="flex align-middle justify-center space-x-5">
          <Image></Image>
          <Title>DoTaskNow!</Title>
        </div>

        {/* Aqui passamos uma função, a função que atualiza se a tarefa isCompleted ou não como props para o component Tasks */}
        {message && <Message type={type} msg={message}></Message>}
        <AddTask onAddTask={onAddTaskSubmit}></AddTask>
        {tasks.length === 0 ? (
          <div className="text-center text-[#8DDD64] mt-4 p-2 rounded-md font-bold text-[20px]">
            Add a task now!
          </div>
        ) : (
          <Tasks
            tasks={sortedTasks}
            onTaskClick={onTaskClick}
            onDelClick={deleteTask}
            theme={theme}
            themeColor={themeColor}
            setPriorityOrder={handlePriorityClick}
            setDateOrder={handleDateClick}
            priorityOrder={priorityOrder}
            dateOrder={dateOrder}
            activeFilter={activeFilter}
          ></Tasks>
        )}
      </div>
    </div>
  );
}

export default App;
