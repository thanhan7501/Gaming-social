const User = require("../../models/user");
const InterestedGames = require("../../models/interestedGames")
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  
  registerUser: async (ctx) => {
    let { email, password, name } = ctx.request.body;
    const existAccount = await User.findOne({
      email: email,
    });
    if (existAccount)
      return (ctx.body = {
        status: false,
        message: "Account existed",
      });
    else {
      let hash = bcrypt.hashSync(password, saltRounds);
      let user = new User({
        email: email,
        password: hash,
        name: name,
      });
      await user.save();
      return (ctx.body = {
        status: true,
        message: "Account successfully created",
      });
    }
  },

  insertGame: async (ctx) => {
    const interestedGames = new InterestedGames(ctx.request.body)
    await interestedGames.save();
    return (ctx.body = {
      status: true,
      message: "Add game to interested success",
    });
  }
};