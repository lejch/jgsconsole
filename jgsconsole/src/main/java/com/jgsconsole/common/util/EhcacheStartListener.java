package com.jgsconsole.common.util;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.InputStream;

public class EhcacheStartListener
  implements ServletContextListener
{
  public void contextDestroyed(ServletContextEvent arg0)
  {
  }

  public void contextInitialized(ServletContextEvent event)
  {
    ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());

    String arg = event.getServletContext().getInitParameter("ehcache-decode");

    InputStream is = EhcacheStartListener.class.getResourceAsStream(arg);

//    TypeService typeService = (TypeService)applicationContext.getBean("typeService");
//
//    CacheManager manager = new CacheManager(is);
//    Cache ehrCache = manager.getCache("appCache");
//    List list = new ArrayList();
//    List typelist = typeService.loadDecode();
//    for (int i = 0; i < typelist.size(); i++) {
//      list.add(new Element(Integer.valueOf(i), typelist.get(i)));
//    }
//    ehrCache.putAll(list);
  }
}