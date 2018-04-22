'use strict';

module.exports = {
    'buildICAO': function (letter1, letter2, letter3, letter4) {
        return this.getFirstLetter(letter1.toUpperCase()) +
            this.getFirstLetter(letter2.toUpperCase()) +
            this.getFirstLetter(letter3.toUpperCase()) +
            this.getFirstLetter(letter4.toUpperCase());
    },
    'getFirstLetter': function (natoLiteral) {
        return natoLiteral.charAt(0);
    },
    'pronounceIcaoCode': function (icaoCode) {
        if (icaoCode === 'KSAC') {
            return '<say-as interpret-as="ordinal">K-SAC</say-as>';
        }
        return '<say-as interpret-as="characters">' + icaoCode + '</say-as>';
    },
    'random': function (speechOutputArray) {
        var i = 0;
        i = Math.floor(Math.random() * speechOutputArray.length);
        return speechOutputArray[i];
    },
    'returnSlotValueIfValid': function (request, slotName) {
        let slot = request.intent.slots[slotName];

        if (slot && slot.value) {
            return slot.value;
        } else {
            return undefined;
        }
    },
    'delegateSlotCollection': function () {
        console.log('in delegateSlotCollection');
        console.log('current dialogState: ' + this.event.request.dialogState);
        if (this.event.request.dialogState === 'STARTED') {
            console.log('in Beginning');
            let updatedIntent = this.event.request.intent;
            //optionally pre-fill slots: update the intent object with slot values for which
            //you have defaults, then return Dialog.Delegate with this updated intent
            // in the updatedIntent property
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED') {
            console.log('in not completed');
            // return a Dialog.Delegate directive with no updatedIntent property.
            this.emit(':delegate');
        } else {
            console.log('in completed');
            console.log('returning: ' + JSON.stringify(this.event.request.intent));
            // Dialog is now complete and all required slots should be filled,
            // so call your normal intent handler.
            return this.event.request.intent;
        }
    },
};