import PostMessage from "./models/postMessage.js";

//Logica para encontrar diferentes POSTS
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Logica Crar POSTS
export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
       await newPost.save()

       res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}