'use strict';

module.exports = {
    'buildICAO': function (codeword1, codeword2, codeword3, codeword4) {
        return (codeword1.charAt(0) + codeword2.charAt(0) + codeword3.charAt(0) + codeword4.charAt(0))
            .toUpperCase();
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
            if (this.attributes.icao !== '_') {
                const icao = this.attributes.icao;
                updatedIntent.slots.firstLetter.value = getNatoAlphabetCodewordFor(icao.charAt(0));
                updatedIntent.slots.secondLetter.value = getNatoAlphabetCodewordFor(icao.charAt(1));
                updatedIntent.slots.thirdLetter.value = getNatoAlphabetCodewordFor(icao.charAt(2));
                updatedIntent.slots.fourthLetter.value = getNatoAlphabetCodewordFor(icao.charAt(3));
            }
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

const getNatoAlphabetCodewordFor = (literal) => {
    literal = literal.toUpperCase();
    switch (literal) {
        case 'A':
            return 'Alpha';
        case 'B':
            return 'Bravo';
        case 'C':
            return 'Charlie';
        case 'D':
            return 'Delta';
        case 'E':
            return 'Echo';
        case 'F':
            return 'Foxtrot';
        case 'G':
            return 'Golf';
        case 'H':
            return 'Hotel';
        case 'I':
            return 'India';
        case 'J':
            return 'Juliet';
        case 'K':
            return 'Kilo';
        case 'L':
            return 'Lima';
        case 'M':
            return 'Mike';
        case 'N':
            return 'November';
        case 'O':
            return 'Oscar';
        case 'P':
            return 'Papa';
        case 'Q':
            return 'Quebec';
        case 'R':
            return 'Romeo';
        case 'S':
            return 'Sierra';
        case 'T':
            return 'Tango';
        case 'U':
            return 'Uniform';
        case 'V':
            return 'Victor';
        case 'W':
            return 'Whiskey';
        case 'X':
            return 'X-ray';
        case 'Y':
            return 'Yankee';
        case 'Z':
            return 'Zulu';
    }
    return undefined;
};