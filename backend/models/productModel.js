import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },

    category: {
      type: String,
      enum: [
        'Indangamuntu',
        'Uruhushya rwo gutwara',
        'Passport',
        'Infunguruzo',
        'Ibikapu',
        'Imizigo',
        "Icyangombwa cy'ubutakaka",
        'Ibindi',
      ],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 2000,
      required: true,
    },

    countInStock: {
      type: Number,
      default: 1,
    },

    rating: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', async function (next) {
  if (this.isModified('image slag')) {
    return next();
  }
  const salt = await bcrypt.genSalt(6);
  const hashedInfo = await bcrypt.hash(this.slug, salt);
  this.slug = hashedInfo;

  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
