const CheckUsername = (username) => {
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}


const numCheckPassword = (password) => {
    let numberChecker = /[0-9]/;
    return numberChecker.test(password);

}

const uppercaseCheckPassword = (password) => {
    let uppercaseChecker = /[A-Z]/;
    return uppercaseChecker.test(password);

}



const checkEmail = (email) => {
    let emailChecker = /\S+@\S+\.\S+/;
    return emailChecker.test(email);
}



const registerValidator = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(!CheckUsername(username)) {
        req.flash('error', "Invalid username");
        req.session.save(err => {
            res.redirect("/registration");
        });
    }
    else if (!checkEmail(email)) {
        req.flash('error', "Please enter a valid email");
        req.session.save(err => {
            res.redirect("/registration");
        });
    }
    else if (!numCheckPassword(password)) {
        req.flash('error', "Password must contain at least one number");
        req.session.save(err => {
            res.redirect("/registration");
        });
    }
    else if (!uppercaseCheckPassword(password)) {
        req.flash('error', "Password must contain at least one Uppercase Letter");
        req.session.save(err => {
            res.redirect("/registration");
        });
    }
    else {
        next();
    }
}

const loginValidator = (req, res, next) => {

}

module.exports = {registerValidator, loginValidator}