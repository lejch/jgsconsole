package com.jgsconsole.common.util.excel.impl;

import com.jgsconsole.common.util.excel.ExcelReader;
import com.jgsconsole.common.util.excel.RowMapper;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.record.BoolErrRecord;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.formula.eval.ErrorEval;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by qping on 16/3/28.
 */
public class POIExcelReader implements ExcelReader {
    private POIFSFileSystem fs;
    private Workbook workbook;
    private Sheet sheet;
    private int sheetNum;
    private String sheetName;
    private Row row;
    private InputStream inputstream;


    private int currentRow = -1;

    private void clearSheet(){
        sheet = null;
        row = null;
        currentRow = -1;
    }

    @Override
    public void loadFile(String filename) throws Exception {
        this.loadFile(new File(filename));
    }

    @Override
    public void loadFile(InputStream is) throws Exception  {
        inputstream = is;
        workbook = WorkbookFactory.create(is);
//        workbook = new XSSFWorkbook(inputStream);
        sheetNum = workbook.getNumberOfSheets();
        loadSheet(0);
    }

    @Override
    public void loadFile(File file) throws Exception {
        this.loadFile(new FileInputStream(file));
    }

    public void releaseFile() {
        try{
            if(inputstream != null){
                inputstream.close();
                inputstream = null;
            }
        }catch (Exception ex){}
    }

    @Override
    public void loadSheet(int sheetNo) {
        clearSheet();
        sheet = workbook.getSheetAt(sheetNo);
    }

    @Override
    public void loadSheet(String sheetName) {
        clearSheet();
        sheet = workbook.getSheet(sheetName);
    }


    // ???????????????????????????
    @Override
    // ???????????????????????????
    public String[][] blockData(int rowStart, int colStart, int width, int height) throws Exception {

        // ????????????????????????????????????
        if(height == NO_LIMIT){
            height = sheet.getLastRowNum() + 1;
            // ?????????????????????????????????
            if(rowStart > height){
                throw new Exception("??????Excel???????????????????????? rowStart ?????? height");
            }
            height = height - rowStart;
        }

        if(width == NO_LIMIT){
            Row row0 = sheet.getRow(0);
            width = row0.getLastCellNum();
            // ?????????????????????????????????
            if(colStart > width){
                throw new Exception("??????Excel???????????????????????? colStart ?????? width");
            }
            width = width - colStart;
        }

        if(height == 0 || width == 0){
            return null;
        }

        String[][] blockData = new String[height][width];

        for(int y = 0; y < height; y++){
            int rowNumber = rowStart + y;
            blockData[y] = blockData(rowNumber, colStart, width);
        }

        return blockData;
    }

    // ?????????????????????
    private String[] blockData(int rowNumber, int colStart, int width){
        String [] row = new String[width];
        boolean  rowDataAllBlank = true;
        for(int x = 0; x < width; x++){
            String value = getValue(rowNumber, colStart + x);

            if(!StringUtils.isBlank(value)){
                rowDataAllBlank = false;
            }

            row[x] = value;
        }

        if(rowDataAllBlank){
            return null;
        }

        return row;
    }

    @Override
    public <T> List<T> listData(int width, int height, boolean firstRowIsTitle, RowMapper<T> mapper) throws Exception {

        if(mapper == null){
            throw new Exception("POIExcelReader???listData??????????????????mapper?????????");
        }

        // ????????????????????????????????????
        if(height == NO_LIMIT){
            height = sheet.getLastRowNum() + 1;
        }

        if(width == NO_LIMIT){
            Row row0 = sheet.getRow(0);
            width = row0.getLastCellNum();
        }

        // ????????????????????????????????????
        String[] titles = null;
        if(firstRowIsTitle){
            titles = blockData(FIRST_ROW, FIRST_COL, width);
        }

        // ?????????????????????????????????????????????????????????????????????mapper.createRowObject
        int beginIndex = firstRowIsTitle ? 1 : 0;
        List<T> list = new ArrayList<T>();
        for(int i = beginIndex; i < height; i++){
            String[] data = blockData(i, FIRST_COL, width);
            T row = mapper.createRowObject(data, titles);
            if(row == null) continue;
            list.add(row);
        }


        return list;
    }

    @Override
    public String getValue(int rowNumber, int colNumber) {

        if(sheet == null){
            return null;
        }

        if(currentRow != rowNumber){
            row = sheet.getRow(rowNumber);
            currentRow = rowNumber;
        }

        if(row == null){
            return null;
        }

        Cell cell = row.getCell(colNumber);

        if(cell == null){
            return null;
        }
        // ??????cell.toString()??????????????????????????????????????????
        switch(cell.getCellType()) {
            case Cell.CELL_TYPE_NUMERIC:
                if(HSSFDateUtil.isCellDateFormatted(cell)) {
                    SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
                    return sdf.format(cell.getDateCellValue());
                }
                DecimalFormat df = new DecimalFormat("0");
                String value = df.format(cell.getNumericCellValue());

                return value != null && value.endsWith(".0") ? value.substring(0, value.length() - 2) : value;
            case Cell.CELL_TYPE_STRING:
                return cell.getStringCellValue();
            case Cell.CELL_TYPE_FORMULA:
                return cell.getCellFormula();
            case Cell.CELL_TYPE_BLANK:
                return "";
            case Cell.CELL_TYPE_BOOLEAN:
                return cell.getBooleanCellValue()?"TRUE":"FALSE";
            case Cell.CELL_TYPE_ERROR:
                return ErrorEval.getText(cell.getErrorCellValue());
            default:
                return "Unknown Cell Type: " + cell.getCellType();

        }

    }

}
