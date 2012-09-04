package de.bennyn.samples.jersey;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("api")
public class JerseyHandler {

  private static final Logger logger = Logger.getLogger(JerseyHandler.class.getName());

  @Path("getSomething")
  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public String getSomething() {
    return "something";
  }

  @Path("postSomething")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public void postSomething(String message) {
    logger.log(Level.INFO, "Received: {0}", message);
  }
}
