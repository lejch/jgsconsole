package com.jgsconsole.app.repository.account;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;

import com.jgsconsole.app.entity.account.Menu;
import com.jgsconsole.app.entity.account.Role;
import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.repository.MyBatisRepository;

@MyBatisRepository
public interface UserDao {
	
	public List<Map> getLstLoginfo(String user_id);

	User get(String id);
	
	List<Map> getUsers(RowBounds rowbounds,Map map);
	
	List<Map> checkUserExist(String username);
	
	void changeLayout(Map map);
	
	Map getAppLayout(String appId);
	
	List<Map> searchUser(RowBounds rowbounds,Map map);
	
	public void insertFailLogin(Map map);
	
	public void delUserLocksByUserName(String user_name);
	
	public List<Map> getUserLockListByUserName(String user_name);
	
	List<Map> getHighestRole(String user_id);
	
	public User getByName(Map map);
	
	/**
	 * 
	* @Title: getByNameForUpdate 
	* @Description: TODO
	* @param map
	* @return   
	* @return User    返回类型 
	* @throws
	 */
	User getByNameForUpdate(Map map);
	
	Menu selectMenu(String user_id);
	
	Role selectRole(String id);

	Integer setRoleToUser(Map map);
	
	List<Map> getAppName(String role_id);
	
	Integer delRoleToUser(Map map);
	
	Integer changePassword(Map map);
	
	Integer save(User user);

	Integer deleteUser(String user_id);
	
	Integer deleteUserRole(String user_id);
	
	Integer deleteUserMenu(String user_id);

	void update(User user);
	
	/**
	 * 
	* @Title: findMeun 
	* @Description: 分页查找菜单
	* @param @param pagesize
	* @param @return    设定文件 
	* @return List<Menu>    返回类型 
	* @throws
	 */
	List<Menu> findMeun(Map map);
	
	
	/**
	 * 
	* @Title: findAllUser 
	* @Description: TODO
	* @param 
	* @return List<User>    
	* @throws
	 */
	List<User> findAllUser();
	
	/**
	 * 
	* @Title: findUserByParam 
	* @Description: TODO
	* @param map
	* @return   
	* @return List<User>    返回类型 
	* @throws
	 */
	List<Map> findUserByParam(RowBounds rowbounds, Map map);
	
	Integer getCount(Map map);
	
	Integer getUsersCount(Map map);
	
	List<Map> exportUsers();
}
