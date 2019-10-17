package com.charplanner.swtor;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/request/*")
public class ServletController extends HttpServlet
{
    private int failures = 0;
    private int attempts = 0;

    public ServletController() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
    {
        Utilities.log("Received GET request: " + request.getRequestURI());

        PrintWriter writer = response.getWriter();
        try
        {
            String action = request.getRequestURI().toLowerCase().split("/request/")[1];
            switch (action)
            {
                case "ping":
                    response.setContentType("text/html");
                    writer.println("pong!");
                    break;
                case "getallitems":
                    response.setContentType("application/JSON");
                    writer.println(ItemManager.getAllAsJson());
                    break;
                default:
                    response.setContentType("text/html");
                    writer.println("ERROR: Unable to process request: " + action);
                    break;
            }
        }
        catch(ArrayIndexOutOfBoundsException e)
        {
            response.setContentType("text/html");
            writer.println("ERROR: Unable to process request; no action specified.");
        }
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
    {
        Utilities.log("Received POST request: " + request.getRequestURI());

        PrintWriter writer = response.getWriter();
        try
        {
            String action = request.getRequestURI().toLowerCase().split("/request/")[1];
            switch (action)
            {
                case "updatedata":
                    attempts++;
                    response.setContentType("application/JSON");
                    try
                    {
                        String password = request.getReader().readLine(); //not normally how we'd do this, but it's nice to keep this particular feature user-unfriendly
                        if(password == null || !password.equals(StartClass.properties.getProperty("updateCallPw")))
                        {
                            failures++;
                            System.out.println("Failed to update ItemManager from DB: Invalid Password");
                            writer.println("{");
                            writer.println("\"success\":false,");
                            writer.println("\"error\":\"Invalid password\"");
                            writer.println("}");
                            return;
                        }
                        else if(failures > Integer.parseInt(StartClass.properties.getProperty("maxFailures"))
                                || attempts > Integer.parseInt(StartClass.properties.getProperty("maxAttempts")))
                        {
                            System.out.println("Rate limit exceeded for updatedata!");
                            writer.println("{");
                            writer.println("\"success\":false,");
                            writer.println("\"error\":\"Exceeded rate limit\"");
                            writer.println("}");
                            return;
                        }
                        else
                        {
                            ItemManager.updateData();
                            System.out.println("Updated ItemManager from DB.");
                            writer.println("{");
                            writer.println("\"success\":true,");
                            String message = null;
                            if(attempts > Integer.parseInt(StartClass.properties.getProperty("maxAttempts")) - 3)
                            {
                                message = "\"Rate limiter nearing maximum attempts!\"";
                            }
                            writer.println("\"message\":" + message);
                            writer.println("}");
                        }
                    }
                    catch(Exception e)
                    {
                        e.printStackTrace();
                        System.out.println("Failed to update ItemManager from DB: " + e.getMessage());
                        writer.println("{");
                        writer.println("\"success\":false,");
                        writer.println("\"error:\" An unexpected error occurred.\"");
                        writer.println("}");
                    }
                    break;
                case "resetlimiter":
                    response.setContentType("application/JSON");
                    try
                    {
                        String password = request.getReader().readLine(); //not normally how we'd do this, but it's nice to keep this particular feature user-unfriendly
                        if(password == null || !password.equals(StartClass.properties.getProperty("resetCallPw")))
                        {
                            System.out.println("Failed to reset limiter: Invalid Password");
                            writer.println("{");
                            writer.println("\"success\":false,");
                            writer.println("\"error\":\"Invalid password\"");
                            writer.println("}");
                            return;
                        }
                        else
                        {
                            attempts = 0;
                            failures = 0;
                            System.out.println("Reset limiter.");
                            writer.println("{");
                            writer.println("\"success\":true,");
                            writer.println("\"message\":\"Limiter reset successfully.\"");
                            writer.println("}");
                        }
                    }
                    catch(Exception e)
                    {
                        e.printStackTrace();
                        System.out.println("Failed to update ItemManager from DB: " + e.getMessage());
                        writer.println("{");
                        writer.println("\"success\":false,");
                        writer.println("\"error:\" An unexpected error occurred.\"");
                        writer.println("}");
                    }
                    break;
                default:
                    response.setContentType("text/html");
                    writer.println("ERROR: Unable to process request: " + action);
                    break;
            }
        }
        catch(ArrayIndexOutOfBoundsException e)
        {
            response.setContentType("text/html");
            writer.println("ERROR: Unable to process request; no action specified.");
        }
    }
}