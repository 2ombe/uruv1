import express from "express";
import expressAsyncHandler from "express-async-handler";
const paymentRouter = express.Router();
import axios from "axios";
import Momo from "../models/momoModel.js";

const headers = {
  // Request headers
  Authorization: "",
  "X-Target-Environment": "",
  "X-Callback-Url": "",
  "Content-Type": "application/x-www-form-urlencoded",
  "Ocp-Apim-Subscription-Key": "{subscription key}",
};

paymentRouter.post(
  "/",

  expressAsyncHandler(async (req, res) => {
    try {
      const { amount, customerName, customerEmail, currency, customerPhone } =
        req.body;

      const newPayment = new Momo({
        amount: "Enter amount",
        customerName: "Enter name",
        externalId: "client number",
        externalId: {
          partyIdType: "MSISDN",
          partyId: "250780486359",
        },
        currency: "RWF",
      });

      const data = await newPayment.save();
      res.send({ message: "Payment sent", data });
    } catch (error) {
      res.send(error);
    }
  })
);

export default paymentRouter;
