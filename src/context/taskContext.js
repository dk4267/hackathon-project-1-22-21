import { AsyncStorage } from '@react-native-async-storage/async-storage';
import createCustomContext from './CreateCustomContext';

const taskReducer = (state, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}

const getAllDates = (dispatch) => async() => {
    try {
        //get from async storage
        //if null, pass empty array to dispatch
        //if not, pass data to dispatch
    } catch (err) {
        console.log(err);
    }
}

const getToday = (dispatch) => async() => {
    try {
        //get dates from async storage
        //get today's date
        //find today's date from async data
        //pass to dispatch if not null
    } catch (err) {
        console.log(err);
    }
}

const addTodaysDate = (dispatch) => async() => {
    try {
        //get dates
        //find today's date
        //add date to date array with empty data
        //save to async storage
    } catch (err) {
        console.log(err);
    }
}

const addTask = (dispatch) => async(date, info) => {
    try {
        //get dates
        //find specified date
        //add task to date's task array
        //save in async storage
    } catch (err) {
        console.log(err);
    }
}

const editTask = (dispatch) => async(date, task, info) => {
    try {
        //get dates
        //find specified date
        //find specified task
        //put in new info, combine into all data
        //save in async storage
    } catch (err) {
        console.log(err);
    }
}

const deleteTask = (dispatch) => async(date, task) => {
    try {
        //get dates
        //find specified date
        //find specified task, remove from array
        //combine, save in async storage
    } catch (err) {
        console.log(err);
    }
}

export const { Provider, Context } = createCustomContext(taskReducer, {getAllDates, getToday, addTodaysDate, addTask, editTask, deleteTask}, []);