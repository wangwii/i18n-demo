package com.github.wangwii.i18ndemo;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class AppContextListener implements ServletContextListener {

    private Logger logger = LoggerFactory.getLogger(AppContextListener.class);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        logger.info("Initializing application context....");
        //ServletContext ctx = sce.getServletContext();
        //filter.setInitParameter("javax.ws.rs.Application", ApplicationConfig.class.getName());
        //filter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), true, "/*");
        logger.info("Context Initialized....");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        logger.info("Context Destroyed....");
    }
}
