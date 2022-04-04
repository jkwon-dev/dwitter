import express from 'express'; 
import 'express-async-errors'; 
import * as tweetsRepository from '../data/tweet.js'; 

const router = express.Router(); 


//GET /tweets
//GET /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username; 
    const data = username ? tweetsRepository.getAllByUsername(username) : tweetsRepository.getAll(); 
    res.status(200).json(data); 
});
//GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id; 
    const tweet = tweetsRepository.getById(id); 
    if(tweet) {
        res.status(200).json(tweet); 
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` }); 
    }
});
//POST /tweets
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body; 
    const tweet = tweetsRepository.create(text, name, username); 
    res.status(201).json(tweet); 
}); 
//PUT /tweets/:id
router.put('/:id', (req, res, next) =>{
    const id = req.params.id; 
    const text = req.body.text; 
    const tweet = tweetsRepository.update(id, text); 
    if(tweet) {
        res.status(200).json(tweet); 
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` }); 
    }
 });
//DELET /tweets/:id 
router.delete('/:id', (req, res, next)=>{
    const id = req.params.id; 
    tweetsRepository.remove(id); 
    res.sendStatus(204); 
});

export default router;