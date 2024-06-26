const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customer_id: String,
    history_nav: String,
    no_quiz_left: String,
    quiz_done: String,
    quiz_score: String,
    quiz_total_answer: String,
    quiz_total_score: String,
    total_prediction: String,
    weekly_prediction: String,
    active_history: String,
    address: String,
    avatar: String,
    business_hours: String,
    country: String,
    created_at: Date,
    default: String,
    email:String,
    fav_team: String,
    fav_team_id: String,
    first_name: String,
    fteam: String,
    full_name: String,
    gender: String,
    inactive_history: String,
    is_predicted: String,
    language: String,
    last_message_text: String,
    last_message_time: String,
    last_name: String,
    last_sequence: String,
    locale: String,
    next_fixtures: String,
    next_fixtures_active: String,
    next_fixtures_inactive: String,
    phone: String,
    predict: String,
    predict_fixture:String,
    previous_fixtures: String,
    previous_fixtures_active: String,
    previous_fixtures_inactive: String,
    primary_id: String,
    registered: String,
    score: String,
},{
    timestamps: true
})

const Customer = mongoose.model('customers', CustomerSchema)

module.exports = Customer;