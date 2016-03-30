//
//  Created by Bradley Austin Davis on 2015/08/08
//  Copyright 2015 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
#pragma once

#include <assert.h>

#include <QString>
#include <QObject>

#include "Forward.h"

class Plugin : public QObject {
public:
    /// \return human-readable name
    virtual const QString& getName() const = 0;

    typedef enum { STANDARD, ADVANCED, DEVELOPER } grouping;

    /// \return human-readable grouping for the plugin, STANDARD, ADVANCED, or DEVELOPER
    virtual grouping getGrouping() const { return STANDARD; }

    /// \return string ID (not necessarily human-readable)
    virtual const QString& getID() const { assert(false); return UNKNOWN_PLUGIN_ID; }

    virtual bool isSupported() const;
    
    void setContainer(PluginContainer* container);

    /// Called when plugin is initially loaded, typically at application start
    virtual void init();

    /// Called when application is shutting down
    virtual void deinit();

    /// Called when a plugin is being activated for use.  May be called multiple times.
    /// Returns true if plugin was successfully activated.
    virtual bool activate() {
        _active = true;
        return _active;
    }

    /// Called when a plugin is no longer being used.  May be called multiple times.
    virtual void deactivate() {
        _active = false;
    }

    virtual bool isActive() {
        return _active;
    }

    /**
     * Called by the application during it's idle phase.  If the plugin needs to do
     * CPU intensive work, it should launch a thread for that, rather than trying to
     * do long operations in the idle call
     */
    virtual void idle();

    virtual void saveSettings() const {}
    virtual void loadSettings() {}

protected:
    bool _active { false };
    PluginContainer* _container { nullptr };
    static QString UNKNOWN_PLUGIN_ID;

};
