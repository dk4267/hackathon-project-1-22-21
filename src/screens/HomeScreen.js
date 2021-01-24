import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList, ScrollView } from 'react-native';
import { Context } from '../context/taskContext';
import { formatDate } from '../context/taskContext';

const HomeScreen = ({ navigation }) => {

    const { state, getDates, deleteTask } = useContext(Context);
    let data;
    const [targetTasks, setTargetTasks] = useState({})


    useEffect(() => {      
        getDates();
        
    }, []);

    useEffect(() => {
        data = state.find((item) => item.date === formatDate(new Date));
        setTargetTasks(data);
    }, [state])
    

    return <View>
        <Text>{formatDate(new Date)}</Text>
        <Button onPress={() => navigation.navigate('Edit', {task: {}, date: formatDate(new Date)})} title='Add task for today' />
        
        { targetTasks ? 
        <View>
        <FlatList data={targetTasks.tasks} extraData={targetTasks} keyExtracter={(item) => item.taskName} renderItem={({item}) => {
            return (
            <View>
                <Text>{item.taskName}</Text>
                <Text>{item.time}</Text>
                <Text>{item.duration}</Text>
                <Text>{item.satisfaction}</Text>
                <Button title="Edit task" onPress={() => navigation.navigate('Display', {id: item.id, date: formatDate(new Date)})} />
                <Button title="Delete task" onPress={() => deleteTask(formatDate(new Date), item.id) } />
            </View>
            )
        }}/></View> : null }
           
    </View>
}

const styles = StyleSheet.create({

});

export default HomeScreen;