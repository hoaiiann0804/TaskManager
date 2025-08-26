const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    deadline: Date,
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done', 'cancelled'],
        default: 'todo'
    },
    labels: {
        type: [String],
        default: []
    },
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
},
    { timestamps: true}
)
const Tasks = mongoose.model('Task', TaskSchema);
module.exports = Tasks; 