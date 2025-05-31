package com.controller;

import com.service.Utilisateur;
import com.entities.Compte;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/utilisateur")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UtilisateurController {

    @EJB
    private Utilisateur utilisateurBean;
    
    private int userId;
    // POST: Initialize a user session
    @POST
    @Path("/init")
    public Response initUser(@QueryParam("username") String username, @QueryParam("password") String password) {
        try {
            userId = utilisateurBean.init(username, password);
            return Response.ok().entity("{\"userId\": " + userId + "}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid credentials").build();
        }
    }

    // GET: Retrieve user balance (solde)
    @GET
    @Path("/solde")
    public Response getBalance() {
        try {
            float balance = utilisateurBean.solde();
            return Response.ok(balance).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Unable to retrieve balance").build();
        }
    }
    @PUT
    @Path("/solde")
    public Response increaseSolde(@QueryParam("amount") float amount) {
        try {
            utilisateurBean.increaseSolde(amount);
            return Response.ok("Amount added successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Unable to retrieve balance").build();
        }
    }
    // PUT: Debit user's account
    @PUT
    @Path("/debite")
    public Response debitAccount(@QueryParam("amount") float amount) {
        try {
            utilisateurBean.debite(amount);
            return Response.ok("Amount debited successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Unable to debit account").build();
        }
    }

    // GET: Retrieve user name
    @GET
    @Path("/name")
    public Response getUserName() {
        try {
            String name = utilisateurBean.getName();
            return Response.ok(name).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Unable to retrieve user name").build();
        }
    }

    // GET: Retrieve full user account details
    @GET
    @Path("/compte")
    public Response getUserAccount() {
        try {
            Compte account = utilisateurBean.getCompte();
            return Response.ok(account).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Unable to retrieve account details").build();
        }
    }

    // POST: Create a new user account
    @POST
    @Path("/create")
    public Response createUser(@QueryParam("username") String username, @QueryParam("password") String password) {
        try {
            utilisateurBean.createAccount(username, password);
            return Response.status(Response.Status.CREATED).entity("User account created successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build(); 
        }
    }

    // PUT: Update an existing user account
    @PUT
    @Path("/update")
    public Response updateUser(@QueryParam("newUsername") String newUsername, @QueryParam("newPassword") String newPassword) {
        try {
            utilisateurBean.updateAccount(newUsername, newPassword);
            return Response.ok("User account updated successfully").build();
        } catch (Exception e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build(); 
        }
    }
}