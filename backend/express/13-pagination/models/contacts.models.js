import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define schema
const contactSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

// Add pagination plugin to the schema
contactSchema.plugin(mongoosePaginate);

// Mongoose model
const contact = mongoose.model("Contact", contactSchema);

export default contact;