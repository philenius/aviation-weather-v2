'use strict';

module.exports = {
    'buildICAO': function (slotValues) {
        return (
            slotValues.firstLetter.resolved.charAt(0) +
            slotValues.secondLetter.resolved.charAt(0) +
            slotValues.thirdLetter.resolved.charAt(0) +
            slotValues.fourthLetter.resolved.charAt(0)
        ).toUpperCase();
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
    'getSlotValues': function (filledSlots) {
        // given event.request.intent.slots, a slots values object so you have
        // what synonym the person said - .synonym
        // what that resolved to - .resolved
        // and if it's a word that is in your slot values - .isValidated
        let slotValues = {};

        Object.keys(filledSlots).forEach((item) => {

            const name = filledSlots[item].name;

            if (filledSlots[item] &&
                filledSlots[item].resolutions &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {

                switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                    case "ER_SUCCESS_MATCH":
                        slotValues[name] = {
                            "synonym": filledSlots[item].value,
                            "resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                            "isValidated": true
                        };
                        break;
                    case "ER_SUCCESS_NO_MATCH":
                        slotValues[name] = {
                            "synonym": filledSlots[item].value,
                            "resolved": filledSlots[item].value,
                            "isValidated": false
                        };
                        break;
                }
            } else {
                slotValues[name] = {
                    "synonym": filledSlots[item].value,
                    "resolved": filledSlots[item].value,
                    "isValidated": false
                };
            }
        }, this);
        return slotValues;
    },
    'delegateSlotCollection': function (func) {
        console.log("in delegateSlotCollection");
        console.log(JSON.stringify(this.event));
        console.log("current dialogState: " + this.event.request.dialogState);

        if (func) {
            if (func(this.event)) {
                this.event.request.dialogState = "COMPLETED";
                return this.event.request.intent.slots;
            }
        }

        if (this.event.request.dialogState === "STARTED") {
            console.log("in STARTED");
            console.log(JSON.stringify(this.event));
            var updatedIntent = this.event.request.intent;
            // optionally pre-fill slots: update the intent object with slot values
            // for which you have defaults, then return Dialog.Delegate with this
            // updated intent in the updatedIntent property

            this.emit(":delegate", updatedIntent);
        } else if (this.event.request.dialogState !== "COMPLETED") {
            console.log("in not completed");
            //console.log(JSON.stringify(this.event));
            this.emit(":delegate", updatedIntent);
        } else {
            console.log("in completed");
            //console.log("returning: "+ JSON.stringify(this.event.request.intent));
            // Dialog is now complete and all required slots should be filled,
            // so call your normal intent handler.
            return this.event.request.intent.slots;
        }
        return null;
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