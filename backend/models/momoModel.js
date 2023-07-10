import mongoose from "mongoose";

const momoSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  customerName: { type: String, required: true },
  externalId: { type: String, required: true },
  externalId: {
    partyIdType: { type: String, default: "MSISDN" },
    partyId: { type: String, default: "250780486359" },
  },
  currency: { type: String, required: true, default: "RWF" },
});

const Momo = mongoose.model("Momo", momoSchema);
export default Momo;
