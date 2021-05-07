package com.jgsconsole.app.entity.account;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class UserRole implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String userId;
	private String roleId;

	
	
	public UserRole(String userId, String roleId)
	{
		super();
		this.userId = userId;
		this.roleId = roleId;
	}
	public String getUserId()
	{
		return userId;
	}
	public void setUserId(String userId)
	{
		this.userId = userId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	
}
