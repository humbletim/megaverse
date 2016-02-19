//
//  markerTipEntityScript.js
//  examples/homeContent/markerTipEntityScript
//
//  Created by Eric Levin on 2/17/15.
//  Copyright 2016 High Fidelity, Inc.
//

//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html



(function() {
    Script.include("../../libraries/utils.js");

    MarkerTip = function() {
        _this = this;
    };

    MarkerTip.prototype = {

        continueNearGrab: function() {

            _this.continueHolding();
        },

        continueEquip: function() {
            _this.continueHolding();
        },

        continueHolding: function() {
            // cast a ray from marker and see if it hits anything

            var props = Entities.getEntityProperties(_this.entityID, ["position", "rotation"]);

            var pickRay = {
                origin: props.position,
                direction: Quat.getFront(props.rotation)
            }

            var intersection = Entities.findRayIntersection(pickRay, true);

            if (intersection.intersects) {
                var name = Entities.getEntityProperties(intersection.entityID);
            }
        },

        preload: function(entityID) {
            this.entityID = entityID;
            print("EBL PRELOAD");
        }
    };

    // entity scripts always need to return a newly constructed object of our type
    return new MarkerTip();
});