"use strict";

//  disableOtherModule.js
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html


/* global Script, MyAvatar, RIGHT_HAND, LEFT_HAND, enableDispatcherModule, disableDispatcherModule,
   makeDispatcherModuleParameters, makeRunningValues, getEnabledModuleByName, Messages
*/

Script.include("/~/system/libraries/controllerDispatcherUtils.js");

(function() {
    function DisableModules(hand) {
        this.hand = hand;
        this.disableModules = false;
        this.parameters = makeDispatcherModuleParameters(
            82,
            this.hand === RIGHT_HAND ?
                ["rightHand", "rightHandEquip", "rightHandTrigger"] :
                ["leftHand", "leftHandEquip", "leftHandTrigger"],
            [],
            100);

        this.isReady = function(controllerData) {
            if (this.disableModules) {
                return makeRunningValues(true, [], []);
            }
            return false;
        };

        this.run = function(controllerData) {
            var teleportModuleName = this.hand === RIGHT_HAND ? "RightTeleporter" : "LeftTeleporter";
            var teleportModule = getEnabledModuleByName(teleportModuleName);

            if (teleportModule) {
                var ready = teleportModule.isReady(controllerData);
                if (ready.active) {
                    return makeRunningValues(false, [], []);
                }
            }
            if (!this.disableModules) {
                return makeRunningValues(false, [], []);
            }
            return makeRunningValues(true, [], []);
        };
    }

    var leftDisableModules = new DisableModules(LEFT_HAND);
    var rightDisableModules = new DisableModules(RIGHT_HAND);

    enableDispatcherModule("LeftDisableModules", leftDisableModules);
    enableDispatcherModule("RightDisableModules", rightDisableModules);
    function handleMessage(channel, message, sender) {
        if (sender === MyAvatar.sessionUUID) {
            if (channel === 'Hifi-Hand-Disabler') {
                if (message === 'left') {
                    leftDisableModules.disableModules = true;
                } else if (message === 'right') {
                    rightDisableModules.disableModules = true;
                } else if (message === 'both') {
                    leftDisableModules.disableModules = true;
                    rightDisableModules.disableModules = true;
                } else if (message === 'none') {
                    leftDisableModules.disableModules = false;
                    rightDisableModules.disableModules = false;
                } else {
                    print("disableOtherModule -- unknown command: " + message);
                }
            }
        }
    }

    Messages.subscribe('Hifi-Hand-Disabler');
    function cleanup() {
        disableDispatcherModule("LeftDisableModules");
        disableDispatcherModule("RightDisableModules");
    }
    Messages.messageReceived.connect(handleMessage);
    Script.scriptEnding.connect(cleanup);
}());
