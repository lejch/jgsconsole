package com.jgsconsole.common.util;

public class StringToHex {
	public String convertStringToHex(String str){

		  char[] chars = str.toCharArray();

		  StringBuffer hex = new StringBuffer();
		  for(int i = 0; i < chars.length; i++){
		    hex.append(Integer.toHexString((int)chars[i]));
		  }

		  return hex.toString();
		  }

		  public String convertHexToString(String hex){

		  StringBuilder sb = new StringBuilder();
		  StringBuilder temp = new StringBuilder();

		  //49204c6f7665204a617661 split into two characters 49, 20, 4c...
		  for( int i=0; i<hex.length()-1; i+=2 ){

		      //grab the hex in pairs
		      String output = hex.substring(i, (i + 2));
		      //convert hex to decimal
		      int decimal = Integer.parseInt(output, 16);
		      //convert the decimal to character
		      sb.append((char)decimal);

		      temp.append(decimal);
		  }

		  return sb.toString();
		  }

		  public static String stringToHexString(String strPart) {
		        String hexString = "";
		        for (int i = 0; i < strPart.length(); i++) {
		            int ch = (int) strPart.charAt(i);
		            String strHex = Integer.toHexString(ch); 
		            hexString = hexString + strHex;
		        }
		        return hexString;
		    }

		  
		  public static int byte2Int(byte[] b) {
		        int intValue = 0;
		        for (int i = 0; i < b.length; i++) {
		            intValue += (b[i] & 0xFF) << (8 * (3 - i));
		        }
		        return intValue;
		    }
		private static String hexString="0123456789ABCDEF";
		  
		  //504F533838383834  POS88884
		  public static void main(String[] args) {

		  StringToHex strToHex = new StringToHex();
//		  System.out.println("\n-----ASCII码转换为16进制 -----");
//		  String str = "POS88884"; 
//		  System.out.println("字符串: " + str);
//		  String hex = strToHex.convertStringToHex(str);
//		  System.out.println("转换为16进制 : " + hex);
		  
//		  String hex = "0050F57B";

//		  System.out.println("\n***** 16进制转换为ASCII *****");
//		  System.out.println("Hex : " + hex);
//		  System.out.println("ASCII : " + strToHex.convertHexToString(hex));
//		  String str = stringToHexString("cfb48fa4-d761-4d6f-8eca-1993727f66c0");
//		  System.out.println(str.toUpperCase());
		  
//		  byte aa[]={(byte)0x00,(byte)0x50,(byte)0xF5,(byte) 0x7B};
//		  int a = byte2Int(aa);
//		  System.out.println(a);
		  
		  }
}
