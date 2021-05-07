package com.jgsconsole.app.entity.account;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity(name = "SYS_MENU")
public class Menu implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	private String menuId;
	private String title;
	private String location;
	private String parentId;
	private String description;
	private String oderSort;
	private String icon;
	private String createTime;
	private String updateTime;
	private String opertype;
	private String flag;
	private String app_id;
	private String state;
	private String need_msg;
	private String need_msgtable;
	
    private Set<User> roles = new HashSet<User>();
	
	public String getMenuId()
	{
		return menuId;
	}
	public void setMenuId(String menuId)
	{
		this.menuId = menuId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getOderSort() {
		return oderSort;
	}
	public void setOderSort(String oderSort) {
		this.oderSort = oderSort;
	}
	public Set<User> getRoles() {
		return roles;
	}
	public void setRoles(Set<User> roles) {
		this.roles = roles;
	}
	public String getIcon()
	{
		return icon;
	}
	public void setIcon(String icon)
	{
		this.icon = icon;
	}
	public String getCreateTime()
	{
		return createTime;
	}
	public void setCreateTime(String createTime)
	{
		this.createTime = createTime;
	}
	public String getUpdateTime()
	{
		return updateTime;
	}
	public void setUpdateTime(String updateTime)
	{
		this.updateTime = updateTime;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	public String getOpertype() {
		return opertype;
	}
	public void setOpertype(String opertype) {
		this.opertype = opertype;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getApp_id() {
		return app_id;
	}
	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getNeed_msg() {
		return need_msg;
	}
	public void setNeed_msg(String need_msg) {
		this.need_msg = need_msg;
	}
	public String getNeed_msgtable() {
		return need_msgtable;
	}
	public void setNeed_msgtable(String need_msgtable) {
		this.need_msgtable = need_msgtable;
	}
}
