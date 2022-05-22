const userModel = require('../models/userModel');

module.exports.getUsers = async function getUsers(req, res) {
    try {
        const query = req.query.new;
        // if query then sort on the basis of latest 3
        const users = query ? await userModel.find().sort({ _id: -1 }).limit(3) : await userModel.find();
        res.json({
            message: "All users retrieved!",
            data: users
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

module.exports.updateUser = async function updateUser(req, res) {
    try {
        const uid = req.params.id;
        const user = await userModel.findById(uid);
        if (!user) {
            res.json({
                message: "User does not exist!"
            })
        }
        Object.keys(req.body).forEach(function(key) {
            user[key] = req.body[key];
        });
        const saveduser = await user.save();
        res.json({
            message: "user updated!",
            data: saveduser
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        res.json({
            message: "user deleted!",
            data: deletedUser
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.getUser = async function getUser(req, res) {
    try {
        const user = await userModel.findById(req.params.id);
        res.json({
            message: "user found!",
            data: user
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

module.exports.checkStats = async function checkStats(req, res) {
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastyear } } },
            { $project: { month: { $month: '$createdAt' } } },
            { $group: { _id: "$month", total: { $sum: 1 } } } 
        ]);
        res.json({
            message: "Stats retrieved!",
            data: data,
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}