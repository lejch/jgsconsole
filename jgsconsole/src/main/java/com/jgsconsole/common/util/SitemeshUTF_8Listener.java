package com.jgsconsole.common.util;

import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class SitemeshUTF_8Listener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		Properties prop = System.getProperties();
		prop.put("file.encoding", "utf-8");
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

}
