import Message from "../models/message_model.js";
import User from "../models/user_model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users for sidebar: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatWith} = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatWith, receiverId: myId },
            ],
        })
        
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages: ", error.message);
        res.status(500).json({ error: error.message });
    }
}