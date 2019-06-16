package com.charplanner.swtor;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//TODO: class doesn't currently do anything, just here for later use
@WebServlet("/request/*")
public class ServletController extends HttpServlet
{
    public ServletController() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
    {
        Utilities.log("Received request: " + request.getRequestURI());

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