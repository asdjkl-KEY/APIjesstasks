const mongoose = require('mongoose');
const userModel = require('./usersTasks.model');

const getTasks = async (model) => {
    await userModel.findOne(model,async (err, user) => {
        if(err) {
            console.error(err)
            return "not found";
        } else {
        let tasks = await user.tasks;
        return await tasks;
        }
    });
}

const deleteTask = async (model, id) => {
    await userModel.findOne(model,async (err, user) => {
        if(err) {
            return "not found"
        } else {
            let tasks = await user.tasks;
            for(let i in tasks) {
                if(tasks[i].id == id){
                    tasks.splice(i, 1);
                    await userModel.findOneAndUpdate({username: username, email: email, password: password}, {tasks: tasks}, () => {
                        console.log(`Actualizacion de datos para el usuario: ${username} en "Tasks"`);
                    });
                    return "deleted";
                }
            }
        }
    })
}

const saveTask = async (model, newTask) => {
    await userModel.findOne(model, async (err, user) => {
        if(err) {
            return "not found";
        } else {
            let tasks = await user.tasks;
            tasks.push(newTask);
            userModel.findOneAndUpdate(model, {tasks: tasks}, () => {
                console.log("Nueva modificación para el usuario "+ model.username + " en el campo tasks");
            });
            return "created"
        }
    })
}

const getTaskById = async (model, id) => {
    await userModel.findOne(model, async (err, user) => {
        if(err) return "not found";
        let tasks = await user.tasks;
        for(let task of tasks) {
            if(task.id == id){
                return task;
            }
        }
        return "not found";
    })
}

const getTasksByCategoryAndState = async (model, category, state) => {
    await userModel.findOne(model, async (err, user) => {
        if(err) return "not found";
        let tasks = await user.tasks;
        let allTasks = [];
        for(let task of tasks) {
            if(task.category == category && task.state == state) {
                allTasks.push(task);
            }
        }
        return allTasks;
    });
}

const getTasksByCategory = async (model, category) => {
    await userModel.findOne(model, async (err, user) => {
        if(err) return "not found";
        let tasks = await user.tasks;
        let allTasks = [];
        for (let task of tasks) {
            if(task.category == category){
                allTasks.push(task);
            }
        }
        return allTasks;
    })
}

const getTasksByState = async (model, state) => {
    await userModel.findOne(model, async(err, user) => {
        if(err) return "not found";
        let tasks = await user.tasks;
        let allTasks = [];
        for (let task of tasks) {
            if(task.state == state) {
                allTasks.push(task);
            }
        }
        return allTasks;
    })
}

const updateTask = async (model, id, data, value) => {
    await userModel.findOne(model, async(err, user) => {
        if(err) return "not found";
        let tasks = await user.tasks;
        for(let i in tasks) {
            if(tasks[i].id == id){
                let task = tasks[i];
                tasks.splice(i, 1);
                task[data] = value;
                tasks.push(task);
                await userModel.findOneAndUpdate(model, {tasks: tasks}, () => {
                    console.log("Nuevo cambio al usuario "+ model.username + " en el campo tasks");
                });
                return "updated";
            }
        }
        return "not found";
    })
}
const createNewUser = async (username, password) => {
    if(username && password){
    const newUser = new userModel({
        username: username,
        password: password,
        tasks: []
    });
    newUser.save((err) => {
        if(err) return "missing data";
    });
} else {
    return "missing data";
}
}

module.exports = {
    getTasks,
    getTaskById,
    getTasksByCategoryAndState,
    getTasksByCategory,
    getTasksByState,
    deleteTask,
    saveTask,
    updateTask,
    createNewUser
}