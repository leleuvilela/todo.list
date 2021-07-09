import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import trashIcon from "../assets/icons/trash/trash.png";
import xIcon from "../assets/icons/x/X.png";
import penIcon from "../assets/icons/pen/Pen.png";

import { Task } from "./TasksList";

interface TaskItemProps {
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
  index: number;
}

function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`x-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleCancelEditing()}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`pen-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => handleStartEditing()}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.separator} />
        <TouchableOpacity
          disabled={isEditing}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer : {
    flexDirection: 'row'
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});

export default TaskItem;
