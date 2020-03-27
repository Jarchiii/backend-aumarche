const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/User");

const minPasswordLength = 4;
let errorMsg = "";

// ACTION : REGISTER
router.post("/signup", (req, res, next) => {
  const {
    mail,
    password, // new password is ready for database
    firstname,
    lastname,
    city,
    street,
    streetNb,
    birth,
    admin
  } = req.body;
  console.log(req.body);
  // if (!mail || !password) errorMsg += "Provide both mail & password. \n";
  if (password.length < minPasswordLength)
    errorMsg += `Password has to be at least ${minPasswordLength}!`;
  if (errorMsg) return res.status(403).json(errorMsg);
  // 403 : FORBIDDEN (if error)

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = {
    mail,
    password: hashPass, // new password is ready for database
    firstname,
    lastname,
    city,
    street,
    streetNb,
    birth,
    admin
  };

  userModel
    .create(newUser)
    .then(dbRes =>
      res.status(200).json({ msg: "OK: user created ! :) ", dbRes })
    )
    .catch(dbErr =>
      res.status(500).json({ msg: "FAIL: user not created! :( ", dbErr })
    );
  // .catch(next);
});



// ACTION : SIGN IN

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err || !user) return res.status(403).json("invalid user infos"); // 403 : Forbidden

    /**
     * req.Login is a passport method
     * check the doc here : http://www.passportjs.org/docs/login/
     */
    req.logIn(user, function(err) {
      /* doc says: When the login operation completes, user will be assigned to req.user. */
      if (err) {
        return res.json({ message: "Something went wrong logging in" });
      }

      // We are now logged in
      // You may find usefull to send some other infos
      // dont send sensitive informations back to the client
      // let's choose the exposed user below
      const { _id, mail, firstname, lastname, city, street, streetNb, admin, panier, avatar, pastOrders } = user;
      // and only expose non-sensitive inofrmations to the client's state
      next(
        res.status(200).json({
          currentUser: {
            _id,
            lastname,
            firstname,
            city,
            mail,
            panier, 
            admin
          }
        })
      );
    });
  })(req, res, next); // IIFE (module) pattern here (see passport documentation)
});


// ACTION : LOGOUT (with passport)
router.post("/signout", (req, res, next) => {
  req.logout(); // utility function provided by passport
  res.json({ message: "OK: disconnected... " });
});

router.use("/is-loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const { _id, mail, firstname, lastname, city, street, streetNb, admin, panier, avatar, pastOrders  } = req.user;
    return res.status(200).json({
      currentUser: {
            _id,
            lastname,
            firstname,
            city,
            mail,
            panier, 
            admin
      }
    });
  }
  res.status(403).json("Unauthorized");
});

module.exports = router;
