import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as orderController from '../controllers/orderController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';




//Login_Logout_PasswordResetUsingOTP_googleLogin_googleLogout
/** POST Methods */
router.route('/register').post(controller.register); // register user
router.route('/googleregister').post(controller.googleregister); // register user via GoogleAuth
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser,controller.login); // login in app
router.route('/googlelogin').post(controller.verifyUser,controller.googlelogin); // login using google in app


/** GET Methods */
router.route('/user/:username').get(controller.getUser) // user with username
router.route('/users/:userId').get(controller.getUserById) // user with userId
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables


/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



//Shop-Orders routes
/** POST Methods */
router.route('/order/addneworder').post(Auth,orderController.addOrder); // add an order

/** GET Methods */
router.route('/orders').get(Auth,orderController.getAllOrder) // get all orders
router.route('/order/:id').get(Auth,orderController.getOrderbyid) // get one order by id

/** PUT Method */
router.route('/order/edit/:id').put(Auth,orderController.editOrder); // is use to update the order

/** DELETE Method */
router.route('/order/delete/:id').delete(Auth,orderController.deleteOrder); // is use to delete the order


export default router;