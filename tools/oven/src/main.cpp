//
//  main.cpp
//  tools/oven/src
//
//  Created by Stephen Birarda on 3/28/2017.
//  Copyright 2017 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html

#include "Oven.h"

#include <BuildInfo.h>
#include <SettingInterface.h>
#include <SharedUtil.h>

int main (int argc, char** argv) {
    setupHifiApplication("Oven");

    // init the settings interface so we can save and load settings
    Setting::init();

    Oven app(argc, argv);
    return app.exec();
}
