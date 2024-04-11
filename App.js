import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";

export default function App() {
  const [id, setId] = useState("");
  const [names, setNames] = useState("");
  const [subject, setSubject] = useState("");
  const [noteMoment1, setNoteMoment1] = useState("");
  const [noteMoment2, setNoteMoment2] = useState("");
  const [noteMoment3, setNoteMoment3] = useState("");
  const [definitiva, setDefinitiva] = useState("");
  const [observation, setObservation] = useState("");
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [isError, setIsError] = useState(false);

  const CalculateFinal = () => {
    if (
      id === "" ||
      names === "" ||
      subject === "" ||
      noteMoment2 === "" ||
      noteMoment3 === ""
    ) {
      Alert.alert("Error", "Favor llenar todos los campos");
      setIsError(true);
      return;
    }

    const moment1 = parseFloat(noteMoment1);
    const moment2 = parseFloat(noteMoment2);
    const moment3 = parseFloat(noteMoment3);

    if (moment1 > 5 || moment2 > 5 || moment3 > 5) {
      Alert.alert(
        "Recordar",
        "Las notas tienen que tener un valor de entre 0 y 5"
      );
      setIsError(true);
      return;
    }

    if (noteMoment1 && noteMoment2 && noteMoment3) {
      const definitivaValue = (
        moment1 * 0.3 +
        moment2 * 0.35 +
        moment3 * 0.35
      ).toFixed(2);

      setDefinitiva(definitivaValue);

      let obs;
      if (definitivaValue >= 2.95) {
        obs = "Aprueba";
      } else if (definitivaValue >= 2 && definitivaValue <= 2.94) {
        obs = "Habilita";
      } else {
        obs = "Reprueba";
      }

      setObservation(obs);

      const verification = studentsInfo.find(
        (student) => student.id === id && student.subject === subject
      );

      if (verification) {
        Alert.alert(
          "Error",
          "Nota ya se encuentra ingresada en sistema para esta materia"
        );
        setIsError(true);
        return;
      }

      setStudentsInfo([
        ...studentsInfo,
        {
          id,
          names,
          subject,
          noteMoment1,
          noteMoment2,
          noteMoment3,
          definitiva: definitivaValue,
          observation: obs,
        },
      ]);
    } else {
      setIsError(true);
    }
  };

  const clear = () => {
    setId("");
    setNames("");
    setSubject("");
    setNoteMoment1("");
    setNoteMoment2("");
    setNoteMoment3("");
    setDefinitiva("");
    setObservation("");
    setIsError(false);
  };

  const search = () => {
    const currentId = id;
    const currentSubject = subject;

    const studentInfo = studentsInfo.find(
      (student) => student.id === currentId && student.subject === currentSubject
    );
    if (studentInfo) {
      setId(studentInfo.id);
      setNames(studentInfo.names);
      setSubject(studentInfo.subject);
      setNoteMoment1(studentInfo.noteMoment1);
      setNoteMoment2(studentInfo.noteMoment2);
      setNoteMoment3(studentInfo.noteMoment3);
      setDefinitiva(studentInfo.definitiva);
      setObservation(studentInfo.observation);

      Alert.alert("Mensaje", "Información del estudiante encontrada.");
    } else {
      Alert.alert(
        "Error",
        "No se encontró información para la asignatura y la identificación ingresadas."
      );
      setIsError(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "space-around" }}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 30, marginTop: 30 }}>Sistema de Notas</Text>
      </View>
      <Text style={styles.label}>Identificación</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nombres</Text>
      <TextInput
        style={styles.input}
        value={names}
        onChangeText={setNames}
      />

      <Text style={styles.label}>Asignatura</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Nota Momento 1 (30%)</Text>
      <TextInput
        style={styles.input}
        value={noteMoment1}
        onChangeText={setNoteMoment1}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Nota Momento 2 (35%)</Text>
      <TextInput
        style={styles.input}
        value={noteMoment2}
        onChangeText={setNoteMoment2}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Nota Momento 3 (35%)</Text>
      <TextInput
        style={styles.input}
        value={noteMoment3}
        onChangeText={setNoteMoment3}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Definitiva</Text>
      <TextInput
        style={styles.input}
        value={definitiva}
        editable={false}
      />

      <Text style={styles.label}>Observación</Text>
      <TextInput
        style={styles.input}
        value={observation}
        editable={false}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={CalculateFinal}>
          <Text style={styles.buttonText}>Calcu/Save</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={search}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 50,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
