import { AsyncStorage } from '@react-native-async-storage/async-storage';
import createCustomContext from './CreateCustomContext';

export const formatDate = (date) => {
    const initDate = new Date(date);
    const year = initDate.getFullYear();
    const month = initDate.getMonth();
    const day = initDate.getDate();
    return (day + '/' + month + '/' + year);
}

const taskReducer = (state, action) => {
    switch(action.type) {
        case 'get_all_dates':
        case 'get_one_date':
            return action.payload;
        default: 
            return state;
    }
}

const getAllDates = (dispatch) => async() => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        if (result === null) {
            dispatch({ type: 'get_all_dates', payload: []});
        } else {
            dispatch({ type: 'get_all_dates', payload: JSON.parse(result)});
            console.log(result);
        }

    } catch (err) {
        console.log(err);
    }
}

const getOneDate = (dispatch) => async(date) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        if (result === null) {
            dispatch({ type: 'get_one_date', payload: {}});
        } else {
            const targetDate = JSON.parse(result).filter(item => item.date === date);
            dispatch({ type: 'get_one_date', payload: JSON.parse(targetDate[0])});
            console.log(targetDate);
        }

    } catch (err) {
        console.log(err);
    }
}

const addTodaysDate = (dispatch) => async() => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        const todaysDate = formatDate(new Date());
        let dateArray = [];

        if (result !== null) {
            dateArray = JSON.parse(result);
        }

        const dateData = { date: todaysDate, tasks: [], note: ''};
        dateArray.push(dateData);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(dateArray));

    } catch (err) {
        console.log(err);
    }
}

const addTask = (dispatch) => async(date, taskName, duration, satisfaction, mood, productivity, note) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        let id;
        let dateData = {};
        let otherDates = [];
        if (result !== null) {
            dateData = JSON.parse(result).filter(item => item.date === date);
            otherDates = JSON.parse(result).filter(item => item.date !== date);
        } else {
            dateData = { date: formatDate(date), tasks: [], note: ''};
        }

        let taskId = await AsyncStorage.getItem('TASK_ID');
        if (taskId !== null) {
            let taskIdNum = JSON.parse(taskId);
            id = taskIdNum[0] + 1;
        } else {
            id = 1;
        }

        const newTask = { id, taskName, duration, satisfaction, mood, productivity, note };
        dateData.tasks.push(newTask);
        otherDates.push(dateData);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(otherDates));
        await AsyncStorage.setItem('TASK_ID', JSON.stringify([id]));

    } catch (err) {
        console.log(err);
    }
}

const editTask = (dispatch) => async(date, id, taskName, duration, satisfaction, mood, productivity, note) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        let dateData = {};
        let otherDates = [];
        if (result !== null) {
            dateData = JSON.parse(result).filter(item => item.date === date);
            otherDates = JSON.parse(result).filter(item => item.date !== date);
        } else {
            //should not happen
            dateData = { date: formatDate(date), tasks: [], note: ''};
        }

        const editedTask = { id, taskName, duration, satisfaction, mood, productivity, note };
        otherTasks = [];
        if (dateData.tasks.length !== 0) {
            otherTasks = dateData.tasks.filter(item => item.id !== id);
        } 
        otherTasks.push(editedTask);
        dateData.tasks = otherTasks;
        otherDates.push(dateData);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(otherDates));        

    } catch (err) {
        console.log(err);
    }
}

const deleteTask = (dispatch) => async(date, id) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        let dateData = {};
        if (result !== null) {
            dateData = JSON.parse(result).filter(item => item.date === date);
        } else {
            dateData = { date: formatDate(date), tasks: [], note: ''};
        }

        const otherTasks = dateData.tasks.filter(item => item.id != id);
        dateData.tasks = otherTasks;
        otherDates.push(dateData);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(otherDates));


    } catch (err) {
        console.log(err);
    }
}

export const { Provider, Context } = createCustomContext(taskReducer, {getAllDates, getOneDate, addTodaysDate, addTask, editTask, deleteTask}, []);