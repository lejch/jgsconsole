package com.jgsconsole.app.repository.account;

import com.jgsconsole.app.repository.MyBatisRepository;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;


/**
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * 
 * @author calvin
 */
@MyBatisRepository
public interface AppDao {

	List<Map> findAppByParam(RowBounds rowbounds, Map map);
	
	List<Map> searchApp(RowBounds rowbounds, Map map);
	
	List<Map> getSYS_MENU(String ID);
	
	List<Map> getSYS_ROLE(String ID);
	
	List<Map> getSYS_USER(String ID);
	
	void delsys_role_menu(@Param("rmlist") List<Map> rmlist);
	void delsys_user_menu(@Param("rmlist") List<Map> rmlist);
	void delsys_user_role(@Param("rmlist") List<Map> rmlist);
	void delsys_role_menu_roleid(@Param("rmlist") List<Map> rmlist);
	void delsys_user_role_userid(@Param("rmlist") List<Map> rmlist);
	void delsys_user_menu_userid(@Param("rmlist") List<Map> rmlist);
	
	Integer getSearchCount(Map map);
	
	Integer getCount(Map map);
	
	Integer addApp(Map map);
	
	Integer addAppToSYS_MENU(Map map);
	
	Integer addAppToSYS_ROLE(Map map);
	
	Integer editApp(Map map);
	
	Integer editAppToMenuRoot(Map map);
	
	Integer editAppToOtherMenus(Map map);
	
	Integer editAppToRoleRoot(Map map);
	
	Integer editAppToOtherRoles(Map map);
	
	Integer editUserCreator(Map map);
	
	Integer delAppCreatedUser(String ID);
	
	Integer delApp(String ID);
	
	Integer enableApp(Map map);
	
	Integer delAppToSYS_MENU(String ID);
	
	Integer delAppToSYS_ROLE(String ID);
	
}