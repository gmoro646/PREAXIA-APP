var mongoose = require('mongoose');

var StatementSchema = new mongoose.Schema({
    claimand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Statement' },
    description: String,
    amount: Number,
    status:String,
    created_time:{ type: Date, default: Date.now },
    updated_time: { type: Date, default: Date.now }
});

mongoose.model('Statement', StatementSchema);