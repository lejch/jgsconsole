package com.jgsconsole.common.util;

public class Page {
	
	private String countkey;
	private String datakey;
	private String pageNum;
	private String pageSize;
	
	
	public Page(String countkey, String datakey, String pageNum, String pageSize) {
		super();
		this.countkey = countkey;
		this.datakey = datakey;
		this.pageNum = pageNum;
		this.pageSize = pageSize;
	}
	
	public String getCountkey() {
		return countkey;
	}
	public void setCountkey(String countkey) {
		this.countkey = countkey;
	}
	public String getDatakey() {
		return datakey;
	}
	public void setDatakey(String datakey) {
		this.datakey = datakey;
	}
	public String getPageNum() {
		return pageNum;
	}
	public void setPageNum(String pageNum) {
		this.pageNum = pageNum;
	}
	public String getPageSize() {
		return pageSize;
	}
	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}
	
	
	

}
