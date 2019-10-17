package com.charplanner.swtor;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class StartClass implements ServletContextListener //TODO:what do we actually call this?
{
    static Properties properties; //TODO: is this the appropriate place for this info?
    private ConnectionManager cm;

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent)
    {
        //TODO
    }

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent)
    {
        System.out.println("ServletContextListener initializing."); //TODO:DEBUG
        properties = new Properties();
        InputStream input = null;

        try
        {
            input = new FileInputStream("D:/web/swtor/config.properties"); //TODO
            properties.load(input);
            cm = new ConnectionManager();
        }
        catch(IOException e)
        {
            System.out.println("ERROR: Failed to read properties file!");
            System.exit(1);
        }
    }

    public static String getProperty(String propName)
    {
        return properties.getProperty(propName);
    }
}
