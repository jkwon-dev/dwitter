import * as tweetsRepository from '../data/tweet.js'; 

export async function getTweets(req, res) {
    const username = req.query.username; 
    const data = await(username ? tweetsRepository.getAllByUsername(username) : tweetsRepository.getAll()); 
    res.status(200).json(data); 
}; 

export async function getTweet(req, res, next) {
    const id = req.params.id; 
    const tweet = await tweetsRepository.getById(id); 
    if(tweet) {
        res.status(200).json(tweet); 
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` }); 
    }
}; 

export async function createTweet(req, res, next) {
    const { text } = req.body; 
    const tweet = await tweetsRepository.create(text, req.userId); 
    res.status(201).json(tweet); 
};

export async function updateTweet(req, res, next) {
    const id = req.params.id; 
    const text = req.body.text; 
    const tweet = await tweetsRepository.getById(id); 
    if(!tweet) {
        return res.sendStatus(404); 
    }
    if(tweet.userId !== req.userId) {
        return res.sendStatus(403); 
    }
    const updated = await tweetsRepository.update(id, text); 
    res.status(200).json(updated); 
 };

 export async function deleteTweet(req, res, next){
    const id = req.params.id; 
    const tweet = await tweetsRepository.getById(id); 
    if(!tweet) {
        return res.sendStatus(404); 
    }
    if(tweet.userId !== req.userId) {
        return res.sendStatus(403); 
    }
    await tweetsRepository.remove(id); 
    res.sendStatus(204); 
}; 