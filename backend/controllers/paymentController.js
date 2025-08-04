const Razorpay = require('razorpay');
const shortid = require('shortid');

const razorpay=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});
exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: shortid.generate(),
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};