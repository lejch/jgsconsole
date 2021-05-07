package com.jgsconsole.app.web.biz;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 裁剪、缩放图片工具类
 * @author CSDN 没有梦想-何必远方 
 */
public class ImgUtils {
    /**
     * 缩放图片方法
     * @param srcImageFile 要缩放的图片路径
     * @param result 缩放后的图片路径
     * @param height 目标高度像素
     * @param width  目标宽度像素  
     * @param bb     是否补白
     */
     public final static void scale(String srcImageFile, String result, int height, int width, boolean bb,int dpiX,int dpiY) throws Exception {
    	 System.out.println(width);
    	 System.out.println(height);
    	 
    	 BufferedImage imgresult = null;  
    	  
         File srcfile = new File(srcImageFile); 
    	 BufferedImage im = ImageIO.read(srcfile);  
    	 
    	 imgresult = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);  

    	 imgresult.getGraphics().drawImage(  
                 im.getScaledInstance(width, height,  
                         java.awt.Image.SCALE_SMOOTH), 0, 0, null);
    	 
    	 /*输出到文件流*/  
         FileOutputStream newimage = new FileOutputStream(result);  
         JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(newimage);  
         JPEGEncodeParam jep = JPEGCodec.getDefaultJPEGEncodeParam(imgresult);  
        
         jep.setQuality(1f, false); //
	      /* 压缩质量 */  
	      
         
         encoder.encode(imgresult, jep);  
        /*近JPEG编码*/  
         newimage.flush();
         newimage.close();  
     }

     /**
      * 裁剪图片方法
      * @param bufferedImage 图像源
      * @param startX 裁剪开始x坐标
      * @param startY 裁剪开始y坐标
      * @param endX 裁剪结束x坐标
      * @param endY 裁剪结束y坐标
      * @return
      */
     public static BufferedImage cropImage(BufferedImage bufferedImage, int startX, int startY, int endX, int endY) {
            int width = bufferedImage.getWidth();
            int height = bufferedImage.getHeight();
            if (startX == -1) {
                startX = 0;
            }
            if (startY == -1) {
                startY = 0;
            }
            if (endX == -1) {
                endX = width - 1;
            }
            if (endY == -1) {
                endY = height - 1;
            }
            
            System.out.println("startX="+startX+",endX="+endX+",startY="+startY+",endY="+endY);
            
            BufferedImage result = new BufferedImage(endX - startX, endY - startY, 4);
            for (int x = startX; x < endX; ++x) {
                for (int y = startY; y < endY; ++y) {
                    int rgb = bufferedImage.getRGB(x, y);
                    result.setRGB(x - startX, y - startY, rgb);
                }
            }
            return result;
        }
     
     public static BufferedImage newcropImage(String srcImageFile, int height, int width, int startX, int startY, int endX, int endY,int dpiX,int dpiY) throws Exception {
         if (startX == -1) {
             startX = 0;
         }
         if (startY == -1) {
             startY = 0;
         }
         if (endX == -1) {
             endX = width - 1;
         }
         if (endY == -1) {
             endY = height - 1;
         }
         Double d_startX = Double.valueOf(startX);
         Double d_endX = Double.valueOf(endX);
         Double d_startY = Double.valueOf(startY);
         Double d_endY = Double.valueOf(endY);
         System.out.println("width="+width+",height="+height);
         File srcfile = new File(srcImageFile); 
    	 BufferedImage bufferedImage = ImageIO.read(srcfile); 
         System.out.println("startX="+startX+",endX="+endX+",startY="+startY+",endY="+endY);
         
         Double d_dpiX = Double.valueOf(dpiX);
         Double d_width = Double.valueOf(width);
         Double d_dpiY = Double.valueOf(dpiY);
         Double d_height = Double.valueOf(height);
         
         Double d_dpiX_width = d_dpiX/d_width;
         Double d_dpiY_height = d_dpiY/d_height;
         
         Double a_startX = d_startX * d_dpiX_width;
         Double a_endX = d_endX * d_dpiX_width;
         Double a_startY = d_startY * d_dpiY_height;
         Double a_endY = d_endY * d_dpiY_height;
         startX = (new Double(a_startX)).intValue();
         endX = (new Double(a_endX)).intValue();
         startY = (new Double(a_startY)).intValue();
         endY = (new Double(a_endY)).intValue();
         System.out.println("startX="+startX+",endX="+endX+",startY="+startY+",endY="+endY);
         
         BufferedImage result = new BufferedImage(endX - startX, endY - startY, 4);
         for (int x = startX; x < endX; ++x) {
             for (int y = startY; y < endY; ++y) {
                 int rgb = bufferedImage.getRGB(x, y);
                 result.setRGB(x - startX, y - startY, rgb);
             }
         }
         return result;
     }
}