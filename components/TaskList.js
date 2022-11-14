import React, { useEffect, useState } from "react";
import {FlatList,RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import TaskItem from "./TaskItem";
import { deleteTask, getTasks } from "../api";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [refresing, setRefresing] = useState(false);

  const isFocused=useIsFocused();

  //Obtener las tareas por la API'S
  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  //Ejecucion inicial con la funcion cargar tareas
  useEffect(() => {
    loadTasks();
  }, [isFocused]);//Si el valor es true,vuelve ejecutar el use Effect

  const handleDelete = async(id) => {
    await deleteTask(id);
    await loadTasks();
  };

  const renderItem = ({ item }) => {
    return <TaskItem task={item} handleDelete={handleDelete} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadTasks();
    setRefresing(false);
  });

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refresing}
          colors={["#78e08f"]}
          onRefresh={onRefresh}
          progressBackgroundColor="#0a3d62"
        />
      }
    />
  );
};

export default TaskList;
