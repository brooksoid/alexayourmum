'use strict';

//process.env[‘PATH’] = process.env[‘PATH’] + ‘:’ + process.env[‘LAMBDA_TASK_ROOT’];

const Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function pick(choices) {
    return choices[randomInt(0, choices.length)];
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },
    'SayHello': function () {
        this.response.speak('Hello World!');
        this.emit(':responseReady');
    },
    'TeaIntent': function () {
        this.response.speak('Brussels Sprouts again');
        this.emit(':responseReady');
    },
    'KitchenIntent': function () {
        const datetime = new Date();
        const day = datetime.getDay();
        const ryan = ["ryan", "brian", "ryan crook","crian brook"];
        const luke = ["luke", "the lukeatron", "luke crook"];   
        const sunday = ["it's up to the parent units", "who knows", "have a fight to find out", "its me! Hang on, no. I have no hands. It's you."];
        const table = [sunday, luke, ryan, luke, luke, ryan, ryan];
        const week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const dither = ["so, I think it's", "so, it's", "so, it must be", ". It's definitely"];
        const start = ['erm, its', 'well, I know its', 'Today is', 'its the Human day cycle called']
        const speechOutput = pick(start) + ' ' + week[day] + ' ' + pick(dither) + ' ' + pick(table[day]);
        this.response.speak('bibble ' + speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'This is the Hello World Sample Skill. ';
        const reprompt = 'Say hello, to hear me speak.';

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('See you later!');
        this.emit(':responseReady');
    }
};
