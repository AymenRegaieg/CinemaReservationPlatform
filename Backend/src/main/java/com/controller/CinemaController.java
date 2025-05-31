	package com.controller;
	
	import com.service.Cinema;
	import com.service.Utilisateur;
	import com.service.UtilisateurBean;
	import com.entities.Compte;
	import com.entities.Film;
	import com.entities.Salle;
	import com.entities.Seance;
	import com.entities.SalleProg;
	
	import jakarta.ejb.EJB;
	import jakarta.transaction.Transactional;
	import jakarta.ws.rs.*;
	import jakarta.ws.rs.core.MediaType;
	import jakarta.ws.rs.core.Response;
	
	import java.sql.Date;
	import java.time.Instant;
	import java.time.LocalDateTime;
	import java.util.List;
	
	@Path("/cinema")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public class CinemaController {
	
	    @EJB
	    private Cinema cinemaBean;
	
	    // GET: Retrieve all films
	    @GET
	    @Path("/films")
	    public Response getAllFilms() {
	        List<Film> films = cinemaBean.list();
	        return Response.ok(films).build();
	    }
	
	    // GET: Find films by pattern
	    @GET
	    @Path("/films/search")
	    public Response findFilmsByPattern(@QueryParam("pattern") String pattern) {
	        List<Film> films = cinemaBean.findByPattern(pattern);
	        return Response.ok(films).build();
	    }
	
	    // GET: Find film by ID
	    @GET
	    @Path("/films/{id}")
	    public Response findFilmById(@PathParam("id") int id) {
	        Film film = cinemaBean.findFilm(id);
	        return Response.ok(film).build();
	    }
	
	    // POST: Create a new film
	    @POST
	    @Path("/createFilm")
	    public Response createFilm(@QueryParam("name") String name ,@QueryParam("description") String description) {
	    	 Film createdFilm = cinemaBean.createFilm(name,description);
	        return Response.ok(createdFilm).build();
	    }
	
	    // PUT: Update an existing film
	    @PUT
	    @Path("/films/{id}")
	    public Response updateFilm(@PathParam("id") int id,@PathParam("filmName") String filmName,@PathParam("filmDescription") String filmDescription) {
	    	cinemaBean.update(id,filmName,filmDescription);
	        return Response.ok().build();
	    }
	    @DELETE
	    @Path("/film/{id}")
	    public Response deleteFilm(@PathParam("id") int filmId) {
	        cinemaBean.deleteFilm(filmId);
	        return Response.ok("Film deleted successfully!").build();
	    }
	    // DELETE: Reserve Seats in seance
	    @POST
	    @Path("/seances/reserve")
	    public Response reserveSeat(@QueryParam("seance_id") int seance_id, @QueryParam("user_id") int user_id) {
	    		cinemaBean.reserve(seance_id, user_id);
	        return Response.ok("Reservation successful!").build();
	    }
	
	    // GET: Retrieve all SalleProg
	    @GET
	    @Path("/salleprog")
	    @Transactional
	    public Response getAllSalleProg() {
	        List<SalleProg> salleProgList = cinemaBean.getAllSalleProg();
	        return Response.ok(salleProgList).build();
	    }
	
	    // GET: Get the tarif of a Seance
	    @GET
	    @Path("/seances/tarif")
	    public Response getSeanceTarif(@QueryParam("seanceId") int seanceId) {
	        Seance seance = new Seance();
	        seance.setId_seance(seanceId);
	        float tarif = cinemaBean.getTarif(seance);
	        return Response.ok(tarif).build();
	    }
	    @POST
	    @Path("/salle/add")
	    public Response addSalle(@QueryParam("address") String address, 
	                             @QueryParam("name") String name, 
	                             @QueryParam("capacite") int capacite) {
	        cinemaBean.addSalle(address, name, capacite);
	        return Response.ok("Salle added successfully!").build();
	    }
	    @GET
	    @Path("/salle/{id}")
	    public Response getSalle(@QueryParam("id") int salleId) {
	    	Salle salle = cinemaBean.findSalle(salleId);
	        return Response.ok(salle).build();
	    }
	    @GET
	    @Path("/salles")
	    public Response getAllSalle() {
	    	List<Salle> salles = cinemaBean.getAllSalle();
	        return Response.ok(salles).build();
	    }
	    
	    @POST
	    @Path("/salle/program")
	    public Response programmSalle(@QueryParam("salleId") int salleId, 
	                                  @QueryParam("filmId") int filmId) {
	        Salle salle = cinemaBean.findSalle(salleId);
	        Film film = cinemaBean.findFilm(filmId);
	        cinemaBean.programmSalle(salle, film);
	        return Response.ok("Salle programmed successfully!").build();
	    }
	    @POST
	    @Path("/seances/create")
	    public Response createSeance(@QueryParam("horaire") String horaireStr, 
	                                  @QueryParam("tarif") float tarif, 
	                                  @QueryParam("places") int places, 
	                                  @QueryParam("salleProgId") int salleProgId) {
	        LocalDateTime horaire;
	        try {
	            horaire = LocalDateTime.parse(horaireStr); // Parses ISO-8601 format
	        } catch (Exception e) {
	            return Response.status(Response.Status.BAD_REQUEST)
	                           .entity("Invalid 'horaire' format. Expected ISO-8601: YYYY-MM-DDTHH:MM:SS.")
	                           .build();
	        }
	
	        SalleProg salleprog = new SalleProg();
	        salleprog.setId_salleprog(salleProgId);
	
	        try {
	            cinemaBean.createSeance(horaire, tarif, salleprog);
	            return Response.ok("Seance created successfully!").build();
	        } catch (Exception e) {
	            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
	                           .entity("An error occurred while creating the seance.")
	                           .build();
	        }
	    }
	
	    @DELETE
	    @Path("/seances/{id}")
	    public Response deleteSeance(@PathParam("id") int seanceId) {
	        cinemaBean.deleteSeance(seanceId);
	        return Response.ok("Seance deleted successfully!").build();
	    }
	    @GET
	    @Path("/seances/{id}")
	    public Response getSeance(@PathParam("id") int seanceId) {
	        Seance seance = cinemaBean.findSeance(seanceId);
	        return Response.ok(seance).build();
	    }
	    @GET
	    @Path("/seances")
	    public Response getAllSeance() {
	    	 List<Seance> allSeance = cinemaBean.getAllSeance();
	         return Response.ok(allSeance).build();
	    }
	    @PUT
	    @Path("/seances/{id}")
	    public Response updateSeance(@PathParam("id") int seanceId,
	                                  @QueryParam("horaire") String horaireStr,
	                                  @QueryParam("tarif") float tarif,
	                                  @QueryParam("places") int places,
	                                  @QueryParam("salleProgId") int salleProgId) {
	    	LocalDateTime horaire;
	        try {
	            horaire = LocalDateTime.parse(horaireStr); // Parses ISO-8601 format
	        } catch (Exception e) {
	            return Response.status(Response.Status.BAD_REQUEST)
	                           .entity("Invalid 'horaire' format. Expected ISO-8601: YYYY-MM-DDTHH:MM:SS.")
	                           .build();
	        }
	        SalleProg salleprog = cinemaBean.getSalleProg(salleProgId);
	        cinemaBean.updateSeance(seanceId, horaire, tarif, places, salleprog);
	        return Response.ok("Seance updated successfully!").build();
	    }
	
	
	}
