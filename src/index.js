'use strict';

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
        this.response.speak("Hello, it's Your Mum");
        this.emit(':responseReady');
    },
    'TeaIntent': function () {
        this.response.speak('Brussels Sprouts again');
        this.emit(':responseReady');
    },
    'InsultIntent': function () {
            //delegate to Alexa to collect all the required slot values
            var filledSlots = delegateSlotCollection.call(this);

            var personToInsult = this.event.request.intent.slots.person.value;

            var speechOutput = personToInsult + " is a bumface";
            // //compose speechOutput that simply reads all the collected slot values
            // var speechOutput = randomPhrase(tripIntro);
    
            // //activity is optional so we'll add it to the output
            // //only when we have a valid activity
            // var travelMode = isSlotValid(this.event.request, "travelMode");
            // if (travelMode) {
            //   speechOutput += travelMode;
            // } else {
            //   speechOutput += "You'll go ";
            // }
    
            // //Now let's recap the trip
            // var fromCity=this.event.request.intent.slots.fromCity.value;
            // var toCity=this.event.request.intent.slots.toCity.value;
            // var travelDate=this.event.request.intent.slots.travelDate.value;
            // speechOutput+= " from "+ fromCity + " to "+ toCity+" on "+travelDate;
    
            // var activity = isSlotValid(this.event.request, "activity");
            // if (activity) {
            //   speechOutput += " to go "+ activity;
            // }
    
            //say the results
            this.response.speak(speechOutput);
            this.emit(":responseReady");
        },
    },
    'KitchenIntent': function () {
        const datetime = new Date();
        const day = datetime.getDay();

        //Peeps

        const ryan = ["ryan", "brian", "ryan crook","crian brook"];
        const luke = ["luke", "the lukeatron", "luke crook"];   
        const noone = ["it's up to the parent units", "who knows", "have a fight to find out", "its me! Hang on, no. I have no hands. It's you."];
        
        // Weekdays

        const monday = ["monday", "gunday", "manday"];
        const tuesday = ["tuesday", "bluesday", "newsday"];
        const wednesday = ["wednesday","whensgay","hensday"];
        const thursday = ["thursday", "thrursday"];
        const friday = ["friday", "froday"];
        const saturday = ["saturday"];
        const sunday = ["bumday", "sunday"];

        const week = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];
        const person = [noone, luke, ryan, luke, luke, ryan, ryan];
        const dither = ["so, I think it's", "so, it's", "so, it must be", ". It's definitely", ". Is it Ian? No, it's", ". Is it Neil? No, it's"];
        const start = ['erm, its', 'well, I know its', 'Today is', "It's"];

        const speechOutput = pick(start) + ' ' + pick(week[day]) + ' ' + pick(dither) + ' ' + pick(person[day]);

        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'This is Your Mum.';
        const reprompt = "Ask me who's on kitchen duty?";

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
