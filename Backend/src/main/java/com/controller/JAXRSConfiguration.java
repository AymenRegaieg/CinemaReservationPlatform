package com.controller;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.ext.Provider;

@ApplicationPath("/api")
@Provider
public class JAXRSConfiguration extends Application {
    // JAX-RS Configuration
}
