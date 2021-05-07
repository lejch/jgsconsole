package com.neusoft.app;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.print.DocFlavor.STRING;

import com.neusoft.common.util.DocumentStringUtil;
import com.neusoft.app.entity.document.Code;

import net.sf.json.JSONObject;

public class TestJson {
	public static void main(String[] args) {
		//String s="{'b':null}";
		String s="{'a':\"\"}";
		JSONObject json=JSONObject.fromObject(s);
		Iterator it=json.keys();
		while(it.hasNext()){
			String value=it.next().toString();
			System.out.println(value);
			if (json.get(value).equals("")) {
				System.out.println("ff");
			}
			System.out.println("d:"+json.get(value));
		}
		
		
	}
	public static JSONObject init(){
		Map map=new HashMap();
		for (int i = 0; i < 5; i++) {
			JSONObject json=new JSONObject();
			json.put("id".toUpperCase(), 1+i);
			json.put("coluname".toUpperCase(), "ID"+i);
			json.put("label_name".toUpperCase(), "userid"+i);
			map.put("id"+""+i+"", json);
		}
		 return JSONObject.fromObject(map);
	}
	public static  JSONObject filter(){
		String[]s=DocumentStringUtil.getCoumnName("SELECT id2,id4 FROM A WHERE ID=1");
		Map map=new HashMap();
		JSONObject njson=init();
		Iterator it=njson.keys();
		while(it.hasNext()){
			String value=it.next().toString();
			System.out.println(value+":"+njson.get(value));
			for(String ss:s){
				if (value.equals(ss)) {
					 JSONObject json=JSONObject.fromObject(njson.get(ss));
					 map.put(ss, json);
				}
			}
		}
		return JSONObject.fromObject(map);
	}
}
