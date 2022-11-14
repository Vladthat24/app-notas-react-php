import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Layout from "../components/Layout";
import { saveTask, getTask,updateTask } from "../api";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    descripcion: "",
  });

  const [editing, setEditing] = useState(false);

  //console.log(route.params);//Obtener parametro de envio del List

  //Obtener el valor y guardar el nombre
  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  //functio para guardar
  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTask(task);
        navigation.navigate("HomeScreen");
      } else {
        await updateTask(route.params.id, task);
        navigation.navigate("HomeScreen");
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: "Updating a Task" });
      setEditing(true);
      (async () => {
        const task = await getTask(route.params.id);
        setTask({ title: task.title, descripcion: task.descripcion });
      })();
    }
  }, []);

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder="Escribe el Titulo"
        placeholderTextColor="#546574"
        onChangeText={(text) => handleChange("title", text)}
        value={task.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Escribe una Descripcion"
        placeholderTextColor="#546574"
        onChangeText={(text) => handleChange("descripcion", text)}
        value={task.descripcion}
      />
      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar Tarea</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Editar Tarea</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 35,
    color: "#ffffff",
    padding: 4,
    textAlign: "center",
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
  },
  buttonUpdate:{
    padding:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:3,
    backgroundColor:"#e58e26",
    width:"90%",
  }
});
export default TaskFormScreen;
