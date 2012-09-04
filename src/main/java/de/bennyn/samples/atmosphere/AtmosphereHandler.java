package de.bennyn.samples.atmosphere;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.ConcurrencyManagement;
import javax.ejb.ConcurrencyManagementType;
import javax.ejb.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.atmosphere.annotation.Broadcast;
import org.atmosphere.annotation.Suspend;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.jersey.Broadcastable;

/**
 * Based on:
 * https://github.com/Atmosphere/atmosphere/tree/master/samples/jquery-pubsub
 *
 * @author Benny Neugebauer (www.bennyn.de)
 */
@Path("/socket/{socketId}")
public class AtmosphereHandler {

  private static final Logger logger = Logger.getLogger(AtmosphereHandler.class.getName());
  private @PathParam("topic")
  Broadcaster topic;

  @GET
  @Suspend
  public String subscribe(@Context AtmosphereResource resource, @HeaderParam("X-Something-Useful") String headerParam) {
    logger.log(Level.INFO, headerParam);
    try {
      resource.getResponse().getWriter().write("You have been successfully subscribed.");
    } catch (IOException ex) {
      logger.log(Level.SEVERE, ex.getLocalizedMessage());
    }
    return "";
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Broadcast
  @Produces(MediaType.TEXT_HTML)
  public Broadcastable pushSomething(@Context AtmosphereResource resource, String text) {
    return new Broadcastable(text, "Your message has been sent.", topic);
  }
}
