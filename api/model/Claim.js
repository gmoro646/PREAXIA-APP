var mongoose = require('mongoose');

var ClaimSchema = new mongoose.Schema({
    claimand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Claim' },
    claimand: String,
    description: String,
    date: { type: Date, default: Date.now },
    amount: Number,
    image: [],
    status:String,
    updated_time: { type: Date, default: Date.now },
});

mongoose.model('Claim', ClaimSchema);