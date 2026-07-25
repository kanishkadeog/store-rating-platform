//store-rating-platform/backend/src/routes/test.routes.js

const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/auth.middleware");

const authorize =
require("../middleware/role.middleware");

router.get(

"/admin",

auth,

authorize("ADMIN"),

(req,res)=>{

res.json({

message:

"Welcome Admin"

});

}

);

module.exports =
router;