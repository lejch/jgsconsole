package com.jgsconsole.app.repository.account;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.entity.account.RoleMenu;
import com.jgsconsole.app.repository.MyBatisRepository;

/**
 * 
* @ClassName: RoleMybatisDao 
* @Description: TODO 
* @author jsliu
* @date 2013-3-5 下午4:17:29 
*
 */
@MyBatisRepository
public interface RoleDao
{	
	List<Map> getOriginalPermission(String role_id);
	
	List<Map> getRolesAdmin(Map map);
	
	List<Map> checkRoleName(Map map);
	
	List<Map> getMenuRolesAdmin(Map map);
	
	List<Map> selectForDelRoles(String parent_id);
	
	void addRole(Map map);
	
	void setParentRoleState(Map map);
	
	void delSetParentState(Map map);
	
	public void updateAppId(Map map);
	
	void editRole(Map map);
	
	void delRole(String role_id);
	
	void delRolePermission(String role_id);
	
	void delUserRole(String role_id);
	
	List<Map> getPermission(Map map);
	
	List<Map> getPermissionAdmin(Map map);
	
	List<Map> getRolesForUser(Map map);
	
	List<Map> getRolesForUserAdmin(Map map);
	
	List<Map> getRoleIdByUser(Map map);
	
	void addRolemenu(@Param("rmlist") List<Map> rmlist);
	
	void insertUserRole(Map map);
}
