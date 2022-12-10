const User = require("../../model/Usermodel");

const step = (id, s) => {
  User.findOneAndUpdate({ id }, { step: s }, (err) => {
    if (err) {
      console.log("Step Error");
    }
  });
};

module.exports = {
    step
}
