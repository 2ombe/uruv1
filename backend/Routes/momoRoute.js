import express from "express";
import expressAsyncHandler from "express-async-handler";
const paymentRouter = express.Router();
import axios from "axios";
import Momo from "../models/momoModel.js";

const headers = {
  // Request headers
  Authorization: process.env.AUTHORIZATION,
  "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
  "X-Callback-Url": process.env.CALLBACK_URL,
  "Content-Type": "application/x-www-form-urlencoded",
  "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
};

paymentRouter.post(
  "/",

  expressAsyncHandler(async (req, res) => {
    try {
      const { amount, customerName, customerEmail, currency, customerPhone } =
        req.body;

      const newPayment = new Momo({
        amount,
        customerName,
        customerEmail,
        currency,
        phone_number: customerPhone,
      });

      const data = await newPayment.save();
      res.send({ message: "Payment sent", data });
    } catch (error) {
      res.send(error);
    }
  })
);

export default paymentRouter;