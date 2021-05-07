package com.jgsconsole.app.web.biz;

import com.aspose.cells.License;

public class Test {

    public static boolean getLicense() {
        boolean result = false;
        try {
        	new License().setLicense(Test.class.getClassLoader().getResourceAsStream("pptlicense.xml"));
            result = true;
            System.out.println("验证通过！");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    private static String allowed2Pdf = "doc,docx,xls,xlsx,ppt,pptx,bmp,gif,jpg,png";
    
    public static void main(String[] args) {
    	System.out.println("bmp index = "+allowed2Pdf.indexOf("bmp"));
        // 验证License
//        if (!getLicense()) {
//        	System.out.println("验证不通过！");
//        }
    }
}