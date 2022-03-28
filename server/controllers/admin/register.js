const User = require("../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {

  registerAdmin: async (ctx) => {
    let {
      email,
      password,
      name
    } = ctx.request.body;
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
        isAdmin: true
      });
      await user.save();
      return (ctx.body = {
        status: true,
        message: "Account successfully created",
      });
    }
  },
};