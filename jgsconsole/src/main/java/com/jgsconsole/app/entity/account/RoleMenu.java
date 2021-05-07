package com.jgsconsole.app.entity.account;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class RoleMenu implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String roleId;
	private String menuId;
	private String iswelcome;
	
	public String getIswelcome() {
		return iswelcome;
	}
	public void setIswelcome(String iswelcome) {
		this.iswelcome = iswelcome;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	
}
