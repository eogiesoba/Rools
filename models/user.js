const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    created_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  var user = this;

  // Hash the password only if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;