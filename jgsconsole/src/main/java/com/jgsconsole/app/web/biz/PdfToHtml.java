package com.jgsconsole.app.web.biz;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;

public class PdfToHtml {
    
    public static StringBuffer PdfToImage(String pdfurl,String savepath,String resultpath){
        StringBuffer buffer = new StringBuffer();
        FileOutputStream fos;
        PDDocument document;
        File pdfFile;
        int size;
        BufferedImage image;
        FileOutputStream out;
        Long randStr = 0l;
        try{
        	buffer.append("<p>");
            //遍历处理pdf附件
            randStr = System.currentTimeMillis();
            document = new PDDocument();
            //pdf附件
            pdfFile = new File(pdfurl);
            document = PDDocument.load(pdfFile, (String) null);
            size = document.getNumberOfPages();
            Long start = System.currentTimeMillis(), end = null;
            System.out.println("===>pdf : " + pdfFile.getName() +" , size : " + size);
            PDFRenderer reader = new PDFRenderer(document);
            for(int i=0 ; i < size; i++){
                //image = new PDFRenderer(document).renderImageWithDPI(i,130,ImageType.RGB);
                image = reader.renderImage(i, 1.5f);
                //生成图片,保存位置
                out = new FileOutputStream(savepath + "image" + "_" + i + ".jpg");
                ImageIO.write(image, "png", out); //使用png的清晰度
                //将图片路径追加到网页文件里
                buffer.append("<img src=\"" + "/jgsconsole"+resultpath + "image" + "_" + i + ".jpg\" _src=\"" + "/jgsconsole"+resultpath + "image" + "_" + i + ".jpg\"/>\r\n");
                image = null; out.flush(); out.close();
            }
            buffer.append("</p>");
            reader = null;
            document.close();
            
//            System.out.println(buffer.toString());
            
            end = System.currentTimeMillis() - start;
            System.out.println("===> Reading pdf times: " + (end/1000)+"s");
            start = end = null;
//            //生成网页文件
//            fos = new FileOutputStream(savepath+randStr+".html");
//            System.out.println(savepath+randStr+".html");
//            fos.write(buffer.toString().getBytes());
//            fos.flush(); fos.close();
//            buffer.setLength(0);
        }catch(Exception e){
            System.out.println("===>Reader parse pdf to jpg error : " + e.getMessage());
            e.printStackTrace();
        }
        return buffer;
    }
}