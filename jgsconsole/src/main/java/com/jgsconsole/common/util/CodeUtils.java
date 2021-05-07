package com.jgsconsole.common.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.log4j.Logger;
import sun.misc.BASE64Encoder;

/*
 * base64(md5(password)) 加密 
 * */

public class CodeUtils {
    private static MessageDigest MD5 = null;
        
    static {
        try {
            MD5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException ex) {
        }
    }
        
    public static String encode(String value) {
        String result = "";
        if (value == null) {
            return result;
        }
        BASE64Encoder baseEncoder = new BASE64Encoder();
        try {
            result = baseEncoder.encode(MD5.digest(value.getBytes("utf-8")));
        } catch (Exception ex) {
        }
        return result;
    }
}
