const User = require('../../models/user')

module.exports = {
    getNewUserByMonths: async (ctx) => {
        const January = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 1] },
                        ],
                    },
                ],
            },
        }).count();
        const February = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 2] },
                        ],
                    },
                ],
            },
        }).count();
        const March = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 3] },
                        ],
                    },
                ],
            },
        }).count();
        const April = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 4] },
                        ],
                    },
                ],
            },
        }).count();
        const May = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 5] },
                        ],
                    },
                ],
            },
        }).count();
        const June = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 6] },
                        ],
                    },
                ],
            },
        }).count();
        const July = await User.find({
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$createdAt" }, 7] },
                        ],
                    },
                ],
            },
        }).count();

        const data = [January, February, March, April, May, June, July];
        return (ctx.body = {
            status: true,
            data
        })
    },
}