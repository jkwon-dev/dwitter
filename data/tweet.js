let tweets = [
    {
        id: '1',
        text: 'Hello, This is first message', 
        createAt: Date.now().toString(), 
        name: 'Bob', 
        username: 'bob', 
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',

    },
    {
        id: '2',
        text: 'Drink coffee', 
        createAt: Date.now().toString(), 
        name: 'Han', 
        username: 'han', 
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',

    },
];

export async function getAll() {
    return tweets; 
}

export async function getAllByUsername(username) {
   return tweets.filter((tweet) => tweet.username === username)
}

export async function getById(id) {
    return tweets.find((tweet) => tweet.id === id)
}

export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(), 
        name,
        username, 
    };
    tweets = [tweet, ...tweets]; 
    return tweet; 
}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id); 
    if(tweet) {
        tweet.text = text;
    }
    return tweet;  
}

export async function remove(id){
    tweets = tweets.filter((tweet)=> tweet.id !== id);
}