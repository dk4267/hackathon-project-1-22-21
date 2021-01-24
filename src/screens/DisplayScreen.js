import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Context } from '../context/taskContext';

const DisplayScreen = ({ navigation, route }) => {

    const {id, date} = route.params;
    const {state} = useContext(Context);
    const [targetTask, setTargetTask] = useState({})


    useEffect(() => {
        const data = state.filter((item) => item.date === date);
        console.log(data);
        const task = data[0].tasks.find((item) => item.id === id);
        console.log('target task:');
        console.log(task);
        setTargetTask(task);
    }, [state])

    return <View>
        <Text>{targetTask.taskName}</Text>
        <Text>{targetTask.time}</Text>
        <Text>{targetTask.duration}</Text>
        <Text>{targetTask.satisfaction}</Text>
        <Text>{targetTask.category}</Text>
        <Text>{targetTask.note}</Text>
        <Button onPress={() => navigation.navigate('Edit', {task: targetTask, date: date})} title='Go to edit page'/>
            
    </View>
}

const styles = StyleSheet.create({

});

export default DisplayScreen;