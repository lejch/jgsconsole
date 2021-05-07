package com.neusoft.app.cache;

import java.util.ArrayList;
import java.util.List;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import net.sf.ehcache.search.Attribute;
import net.sf.ehcache.search.Query;
import net.sf.ehcache.search.Result;
import net.sf.ehcache.search.Results;
import net.sf.ehcache.search.expression.Or;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.neusoft.app.entity.document.Decode;
import com.neusoft.app.service.document.TypeService;


public class DecodeCacheTest {
	
	private TypeService typeService;
	private Cache cache;
	
	@Before
	public void setUp(){
		System.setProperty("spring.profiles.active", "development");
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"applicationContext.xml"});  
	     //获取bean  
		typeService = (TypeService) context.getBean("typeService");
	}
	
	public void bulkLoad(){
		String path = this.getClass().getClassLoader().getResource("ehcache/ehcache.xml").getPath();
		CacheManager manager = new CacheManager(path);
		
		cache = manager.getCache("appCache");
		
		List<Element> list = new ArrayList<Element>();
		List<Decode> typelist = typeService.loadDecode();
		for ( int i = 0; i < typelist.size(); i++ ){
			list.add(new Element(i, typelist.get(i)));
		}
		cache.putAll(list);
		
		System.out.println(cache.getSize());
		System.out.println(cache.get(0));
	}
	
	@Test
	public void queryTest(){
		bulkLoad();
		Attribute<String> typename = cache.getSearchAttribute("typename");
		Attribute<String> typecode = cache.getSearchAttribute("typecode");
		Query query = cache.createQuery().includeValues()
				.addCriteria(new Or(typename.ilike("*新生儿*"),
						typecode.ilike("*新生儿*"))).end();
		Results results = query.execute();
		System.out.println(results);
		List<Result> list = results.all();
		
		Decode decode = (Decode)list.get(0).getValue();
		System.out.println(decode.getTypeNamePy());
	}

}
