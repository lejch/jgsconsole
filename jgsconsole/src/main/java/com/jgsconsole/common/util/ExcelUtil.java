package com.jgsconsole.common.util;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;

public class ExcelUtil
{

	public static final short DEFAULT_SIZE = 12;
	/**
	 * @throws IOException 
	 * 
	 * @Title: exportExcel
	 * @Description: 导出Excel
	 * @param array
	 *            存放数据信息
	 *            JSONArray{[{title:XXX,header:[XXX,XXX,XXX],dataset:[[XXX
	 *            ,XXX,XXX],[...]]}]}
	 * @param out
	 * @return void 返回类型
	 * @throws
	 */
	public static void exportExcel(JSONArray array, OutputStream out) throws IOException
	{
		// 声明一个工作薄
		HSSFWorkbook workbook = new HSSFWorkbook();

		HSSFCellStyle heanderStyle = getHeaderCellStyle(workbook,DEFAULT_SIZE);

		HSSFCellStyle datasetStyle = getDataSetCellStyle(workbook);

		for (int i = 0; i < array.size(); i++)
		{
			// 获取sheet数据
			JSONObject object = (JSONObject) array.get(i);
			// 获取标题
			String title = object.getString("title");
			// 获取列头
			Object[] headers = object.getJSONArray("header").toArray();
			// 获取数据
			List<JSONArray> dataset = object.getJSONArray("dataset");

			// 生成一个表格
			HSSFSheet sheet = workbook.createSheet(title);

			// 设置表格默认列宽度为15个字节
			sheet.setDefaultColumnWidth((short) 15);

			/*// 声明一个画图的顶级管理器
			HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
			// 定义注释的大小和位置,详见文档
			HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(
					0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
			// 设置注释内容
			comment.setString(new HSSFRichTextString("可以在POI中添加注释！"));
			// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
			comment.setAuthor("liu");*/
			
			//设置sheet的标题
			HSSFRow row = sheet.createRow(0);
			HSSFCell cellTitle = row.createCell((short)0);
			
			HSSFCellStyle style = workbook.createCellStyle();
			// 设置这些样式
			style.setFillForegroundColor(HSSFColor.WHITE.index);
//			style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			// 生成一个字体
			HSSFFont font = workbook.createFont();
			font.setColor(HSSFColor.VIOLET.index);
			font.setFontHeightInPoints((short)16);
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			// 把字体应用到当前的样式
			style.setFont(font);
			
			cellTitle.setCellStyle(style);
//			cellTitle.setCellStyle()
			cellTitle.setCellValue(new HSSFRichTextString(title));
			
			sheet.addMergedRegion(new Region(0, (short)0, 0, (short)(headers.length-1)));
			
			// 产生表格里列头
			row = sheet.createRow(1);
			for (short j = 0; j < headers.length; j++)
			{
				HSSFCell cell = row.createCell(j);
				cell.setCellStyle(heanderStyle);
				HSSFRichTextString text = new HSSFRichTextString(
						headers[j].toString());
				cell.setCellValue(text);
			}

			JSONArray tempObj = null;
			for (short k = 0; k < dataset.size(); k++)
			{
				// 创建一行
				row = sheet.createRow(k + 2);
				tempObj = dataset.get(k);
				Object textValue;
				for (short m = 0; m < tempObj.size(); m++)
				{
					HSSFCell cell = row.createCell(m);
					cell.setCellStyle(datasetStyle);

					/*if (tempObj.get(m) instanceof Integer)
					{
						cell.setCellValue(Double.parseDouble(String.valueOf(tempObj.get(m))));
					}
					if (tempObj.get(m) instanceof String)
					{*/
						textValue =  tempObj.get(m);
						HSSFRichTextString richString = new HSSFRichTextString(
								textValue.toString());
						cell.setCellValue(richString);
//					}
				}
			}
		}

		try
		{
			workbook.write(out);
			out.flush();
		} catch (IOException e)
		{
			e.printStackTrace();
		}
		finally
		{
			out.close();
		}
	}

	/**
	 * 
	* @Title: getHeaderCellStyle 
	* @Description: 获取列头样式
	* @param workbook
	* @return   
	* @return HSSFCellStyle    返回类型 
	* @throws
	 */
	private static HSSFCellStyle getHeaderCellStyle(HSSFWorkbook workbook,short fontSize)
	{
		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		style.setFillForegroundColor(HSSFColor.WHITE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 生成一个字体
		HSSFFont font = workbook.createFont();
//		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints(fontSize);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);
		return style;
	}

	/**
	 * 
	* @Title: getDataSetCellStyle 
	* @Description: 获取数据集cell样式
	* @param workbook
	* @return   
	* @return HSSFCellStyle    返回类型 
	* @throws
	 */
	private static HSSFCellStyle getDataSetCellStyle(HSSFWorkbook workbook)
	{
		// 生成并设置另一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		style.setFillForegroundColor(HSSFColor.WHITE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		// 生成另一个字体
		HSSFFont font = workbook.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style.setFont(font);
		return style;
	}
}
