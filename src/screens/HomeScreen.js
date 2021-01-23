import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return <View>
        <Text>Home Screen</Text>
        <Button onPress={() => navigation.navigate('Edit')} title='Go to edit screen' />
           
    </View>
}

const styles = StyleSheet.create({

});

export default HomeScreen;