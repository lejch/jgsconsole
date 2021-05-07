package com.jgsconsole.common.util.excel;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

/**
 * Created by qping on 16/3/28.
 */
public interface ExcelReader {
    public static final int NO_LIMIT = -1;
    public static final int FIRST_ROW = 0;
    public static final int FIRST_COL = 0;

    // 装载excel
    public void loadFile(String filename) throws Exception;
    public void loadFile(InputStream inputStream) throws Exception;
    public void loadFile(File file) throws Exception;

    public void releaseFile();

    public void loadSheet(int sheetNo);
    public void loadSheet(String sheetName);

    /**
     * 批量读取内容的方法
     * @param rowStart 从哪一行开始读，第一行序号为 FIRST_ROW
     * @param colStart 从哪一列开始读，第一列序号为 FIRST_COL
     * @param width  读取几列，读取全部则为 NO_LIMIT
     * @param height 读取几行，读取全部则为 NO_LIMIT
     * @return
     */
    public String[][] blockData(int rowStart, int colStart, int width, int height) throws Exception;

    /**
     * 批量读取每行内容，并生成对象的方法
     * @param width             读取几列，读取全部则为 NO_LIMIT
     * @param height            读取几行，读取全部则为 NO_LIMIT
     * @param firstRowIsTitle   第一行是否标题栏
     * @param mapper            转换对象的方法，需要实现
     * @param <T>
     * @return
     */
    public <T> List<T> listData(int width, int height, boolean firstRowIsTitle, RowMapper<T> mapper) throws Exception;

    /**
     * 获取某一个格子的值
     * @param row
     * @param col
     * @return
     */
    public String getValue(int row, int col);

}
