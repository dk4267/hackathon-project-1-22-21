import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const HistoryScreen = ({ navigation }) => {
    return <View>
        <Text>History Screen</Text>
        <Button onPress={() => navigation.navigate('EditHistory')} title='Go to edit page'/>
            
    </View>
}

const styles = StyleSheet.create({

});

export default HistoryScreen;