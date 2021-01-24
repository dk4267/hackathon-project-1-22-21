import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateCustomContext from './CreateCustomContext';

export const formatDate = (date) => {
    const initDate = new Date(date);
    const year = initDate.getFullYear();
    const month = initDate.getMonth();
    const day = initDate.getDate();
    return (day + '/' + (month + 1) + '/' + year);
}

export const formatTime = (date) => {
    const initDate = new Date(date);
    const hours = initDate.getHours();
    const minutes = initDate.getMinutes();
    return (hours + ':' + minutes);
}

const taskReducer = (state, action) => {
    switch(action.type) {
        case 'get_all_dates':
            return action.payload;
            
        default: 
            return state;
    }
}

const getDates = (dispatch) => async() => {
    console.log('at get dates');
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        if (result === null) {
            dispatch({ type: 'get_all_dates', payload: [{ date: formatDate(new Date()), tasks: [], note: '' }]});
        } else {
            let dates = JSON.parse(result);
            if (dates.find(date => date.date === formatDate(new Date())) !== 'undefined') {
                dispatch({ type: 'get_all_dates', payload: dates});
            } else {
                dates.push({ date: formatDate(new Date()), tasks: [], note: ''});
                dispatch({ type: 'get_all_dates', payload: dates});
                await AsyncStorage.setItem('TASK_DATES', JSON.stringify(dates));
            }
            
        }
        console.log('get dates result: ' + result);

    } catch (err) {
        console.log(err);
    }
}


const addTask = (dispatch) => async(date, taskName, time, duration, satisfaction, category, note, callback) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        let id;
        let dateData = {};
        let otherDates = [];
        if (result !== null) {
            dateData = JSON.parse(result).filter(item => item.date === date);
            otherDates = JSON.parse(result).filter(item => item.date !== date);
        } else {
            dateData = { date: date, tasks: [], note: ''};
        }
        console.log('Date data: ');
        console.log(dateData);

        let taskId = await AsyncStorage.getItem('TASK_ID');
        if (taskId !== null) {
            let taskIdNum = JSON.parse(taskId);
            id = taskIdNum[0] + 1;
        } else {
            id = 1;
        }

        const newTask = { id, taskName, time, duration, satisfaction, category, note };
        dateData[0].tasks.push(newTask);
        otherDates.push(dateData[0]);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(otherDates));
        await AsyncStorage.setItem('TASK_ID', JSON.stringify([id]));
        callback();

    } catch (err) {
        console.log(err);
    }
}

const editTask = (dispatch) => async(date, id, taskName, time, duration, satisfaction, category, note, callback) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        let dateData = {};
        let otherDates = [];
        if (result !== null) {
            dateData = JSON.parse(result).filter(item => item.date === date);
            otherDates = JSON.parse(result).filter(item => item.date !== date);
        } else {
            //should not happen
            dateData = { date: date, tasks: [], note: ''};
        }

        const editedTask = { id, taskName, time, duration, satisfaction, category, note };
        otherTasks = [];
        if (dateData[0].tasks.length !== 0) {
            otherTasks = dateData[0].tasks.filter(item => item.id !== id);
        } 
        otherTasks.push(editedTask);
        dateData[0].tasks = otherTasks;
        otherDates.push(dateData[0]);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(otherDates));
        callback();        

    } catch (err) {
        console.log(err);
    }
}

const deleteTask = (dispatch) => async(date, id) => {
    try {
        const result = await AsyncStorage.getItem('TASK_DATES');
        let dateData = {};
        let otherDates = [];
        if (result !== null) {
            dateData = JSON.parse(result).filter(item => item.date === date);
            otherDates = JSON.parse(result).filter(item => item.date !== date);
        } else {
            dateData = { date: formatDate(date), tasks: [], note: ''};
        }

        const otherTasks = dateData[0].tasks.filter(item => item.id != id);
        dateData[0].tasks = otherTasks;
        otherDates.push(dateData[0]);
        await AsyncStorage.setItem('TASK_DATES', JSON.stringify(otherDates));


    } catch (err) {
        console.log(err);
    }
}

export const { Provider, Context } = CreateCustomContext(taskReducer, { getDates, addTask, editTask, deleteTask}, []);