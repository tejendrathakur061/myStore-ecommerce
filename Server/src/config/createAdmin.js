const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error(`Admin credentials missing in .env`);
    }

    const admin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      console.log(`Admin Created Successfully`);
    } else {
      console.log(`Admin Already Exists`);
    }
  } catch (error) {
    console.log(`Admin Creation Error: ${error.message}`);
  }
};

module.exports = createAdmin;
