package com.jgsconsole.common.util.excel;

/**
 * Created by qping on 16/3/31.
 */
public interface RowMapper<T> {
    public T createRowObject(String[] data,String[] title);
}
