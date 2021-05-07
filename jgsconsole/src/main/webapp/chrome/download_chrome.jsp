
<%
  String filename = "Chrome_49.0.2623.112_installer.exe";
  String filepath = "/static/chrome/";
  response.setContentType("APPLICATION/OCTET-STREAM");
  response.setHeader("Content-Disposition",
  "attachment; filename=\"" + filename + "\"");
  
  int i = 0;  
  byte[] b = new byte[1024]; 
  java.io.FileInputStream fileInputStream = null;
  java.io.OutputStream out1 = null;
  try {  
	  fileInputStream = new java.io.FileInputStream(application.getRealPath(filepath+ filename));
      out1 = response.getOutputStream();  
      while ((i = fileInputStream.read(b)) > 0) {  
          out1.write(b, 0, i);  
      }  
  } catch (Exception e) {  
       //e.printStackTrace();
  } finally {
      try {
    	  fileInputStream.close();
          out1.flush();
          out1.close();
          response.flushBuffer();
          /* out.clear();
          out = pageContext.pushBody(); */
      } catch (Exception e) {
          //e.printStackTrace();
      }
  }
  %>