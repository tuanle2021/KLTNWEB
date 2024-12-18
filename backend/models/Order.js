const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "cancelled", "awaiting_payment"],
      default: "awaiting_payment",
    },
    shipping_address: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    method: {
      type: String,
      enum: ["cod", "paypal", "bank_transfer"],
    },

    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["processing", "shipped", "cancelled", "awaiting_payment"],
            default: "awaiting_payment",
        },
<<<<<<< HEAD
      },
    ],
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
=======
        shipping_address: {
            type: String,
            required: true,
        },
        payment_status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        method: {
            type: String,
            enum: ["cod", "paypal", "bank_transfer"],
        },
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
        },
        post_office: {
            type: String,
            default: "Ho Chi Minh",
        },
    },
    {
        timestamps: true,
    }
>>>>>>> ab0dc78f956c0940da33b05143456108ae516085
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;