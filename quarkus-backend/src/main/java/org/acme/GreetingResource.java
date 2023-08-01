package org.acme;

import java.net.URI;
import java.net.URISyntaxException;

import org.jboss.logging.Logger;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/hello")
public class GreetingResource {

    @Inject Logger logger;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getHello(@Context HttpHeaders headers, @QueryParam("name") @NotNull String name) {
        return "Hello, " + name + "!";
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String postHello(@Context HttpHeaders headers, @Valid Hello hello) {
        return "Hello, " + hello.getName() + "!";
    }

    @GET
    @Path("/echo/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response legacyHello(@Context HttpHeaders headers, @PathParam("name") String name) throws URISyntaxException {
        return Response.temporaryRedirect(new URI("/hello?name=" + name)).build();
    }
}
