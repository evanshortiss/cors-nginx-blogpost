package org.acme;

import org.jboss.logging.Logger;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.Provider;

@Provider
@ApplicationScoped
class HeaderLogger implements ContainerRequestFilter {
    @Inject Logger logger;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        UriInfo uriInfo = requestContext.getUriInfo();
        String path = uriInfo.getPath();
        String queryString = uriInfo.getRequestUri().getRawQuery();
        String fullPath = path + (queryString != null ? "?" + queryString : "");

        requestContext.getHeaders().forEach((k, v) -> {
            logger.infof("[%s] %s: %s", fullPath, k.toLowerCase(), v);
        });
    }
}