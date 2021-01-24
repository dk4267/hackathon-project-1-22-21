import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { Context } from '../context/taskContext';

const EditScreen = ({ navigation, route }) => {
  
    const {task, date} = route.params;
    
    const { state, addTask, editTask } = useContext(Context);


    const [taskName, setTaskName] = useState(typeof task !== 'undefined' ? task.taskName : '');
    const [taskTime, setTaskTime] = useState(typeof task !== 'undefined' ? task.time : '');
    const [taskDuration, setTaskDuration] = useState(typeof task !== 'undefined' ? task.duration : '');
    const [taskSatisfaction, setTaskSatisfaction] = useState(typeof task !== 'undefined' ? task.satisfaction : '');
    const [taskCategory, setTaskCategory] = useState(typeof task !== 'undefined' ? task.category : '');
    const [taskNote, setTaskNote] = useState(typeof task !== 'undefined' ? task.note : '');

    return <View>
        <Text>Task name</Text>
        <TextInput value={taskName} onChangeText={(text) => setTaskName(text)}/>
        <Text>Start time</Text>
        <TextInput value={taskTime} onChangeText={(text) => setTaskTime(text)}/>
        <Text>Duration</Text>
        <TextInput value={taskDuration} onChangeText={(text) => setTaskDuration(text)}/>
        <Text>Satisfaction with task</Text>
        <TextInput value={taskSatisfaction} onChangeText={(text) => setTaskSatisfaction(text)}/>
        <Text>Category</Text>
        <TextInput value={taskCategory} onChangeText={(text) => setTaskCategory(text)}/>
        <Text>Notes</Text>
        <TextInput value={taskNote} onChangeText={(text) => setTaskNote(text)}/>
        <Button title="Save" onPress={() => {
            if (typeof task === 'undefined') {
                addTask(date, taskName, taskTime, taskDuration, taskSatisfaction, taskCategory, taskNote, () => navigation.pop());
            } else {
                editTask(date, task.id, taskName, taskTime, taskDuration, taskSatisfaction, taskCategory, taskNote, () => navigation.pop());
            }
        }}/>

    </View>
}

const styles = StyleSheet.create({

});

export default EditScreen;