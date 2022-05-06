const { Router } = require('express');
const router = Router();
const {
    getTasks,
    getTaskById,
    getTasksByCategoryAndState,
    getTasksByCategory,
    getTasksByState,
    deleteTask,
    updateTask,
    saveTask,
    createNewUser
} = require('./functions');

router.get('/', (req,res) => {
    res.send("This is a JessTasks API v"+require('./package.json').version);
})

router.get('/tasks/:username/:password/by/id/:id', async (req, res) => {
    const { username, password, id } = req.params;
    const model = {username,password};
    const response = await getTaskById(model, id);
    if(response == "not found") return res.send(response);
    return res.json(response);
})
router.get('/tasks/:username/:password', async (req, res) => {
    let model = {
        username: req.params.username,
        password: req.params.password
    }
    let response = await getTasks(model);
    if(response == "not found") return res.send(response);
    return res.json(response);
});

router.get('/tasks/:username/:password/by/category-state/:category/:state', async (req, res) => {
    const { category, state } = req.params;
    let model = {
        username: req.params.username,
        password: req.params.password
    }
    let response = await getTasksByCategoryAndState(model, category, state);
    if(response == "not found") return res.send(response);
    return res.json(response);
});

router.get('/tasks/:username/:password/by/category/:category', async (req, res) => {
    let {username, password, category} = req.params;
    let model = {username, password};
    let response = await getTasksByCategory(model, category);
    if(response == "not found") return res.send(response);
    return res.json(response);
});

router.get('/tasks/:username/:password/by/state/:state', async (req, res) => {
    const { username, password, state } = req.params;
    const model = {username,password};
    const response = await getTasksByState(model, state);
    if(response == "not found") return res.send(response);
    return res.json(response);
});

router.get("/tasks/:username/:password/update/:id/:data/:value", async (req, res) => {
    const { username, password, id, data, value } = req.params;
    const model = {username,password};
    const response = await updateTask(model,id,data,value);
    res.send(response);
});

router.get("/tasks/:username/:password/delete/:id", async (req, res) => {
    const { username, password, id } = req.params;
    const model = {username, password};
    const response = await deleteTask(model, id);
    return res.send(response);
});
router.post('/tasks/:username/:password/newtask', async (req, res) => {
    const { username, password } = req.params;
    const newTask = req.body.newtask;
    const model = {username, password};
    const response = await saveTask(model, newTask);
    return res.send(response);
});
router.get('/createuser/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    const response = await createNewUser(username, password);
    res.send(response);
})

module.exports = router;