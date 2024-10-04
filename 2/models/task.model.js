const {Schema, model} = require('mongoose')
const slugify = require('slugify')

const taskSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: false,
    },
    estimation: {
        type: Number, // hours
        required: false,
    },
    priority: {
        type: String, // low, medium, high
        enum: {
            values: ['low', 'medium', 'high']
        },
        default: 'medium'
    },
    isPrivate: {
        type: Boolean,
        default: true
    }
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})

taskSchema.virtual('estimationDays').get(function() {
    return (this.estimation || 0) / 8
})

taskSchema.pre('save', function (next) {
    this.slug = slugify(this.title)
    this.startedAt = Date.now()
    next()
})

taskSchema.post('save', function (doc) {
    console.log(`Request took ${Date.now() - this.startedAt} ms`)
})

taskSchema.pre('aggregate', function() {
    this.pipeline().unshift({
        $match: {
            isPrivate: false
        }
    })
})

taskSchema.pre('find', function() {
    this.find({isPrivate: false})
})

const Task = model('Task', taskSchema);
module.exports = Task;