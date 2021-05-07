package com.jgsconsole.app.service.account;


import com.jgsconsole.app.entity.account.Menu;
import com.jgsconsole.app.entity.account.RoleMenu;
import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.repository.account.RoleDao;
import com.jgsconsole.app.repository.account.UserDao;
import com.jgsconsole.app.service.BaseLogUtil;
import com.jgsconsole.common.util.UUIDGenerator;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.security.utils.Digests;
import org.springside.modules.utils.DateProvider;
import org.springside.modules.utils.Encodes;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


/**
 * 用户管理类.
 * 
 * @author calvin
 */
@Service(value = "accountService")
public class AccountService extends BaseLogUtil{

	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	public static final int SALT_SIZE = 8;

	private static Logger logger = LoggerFactory.getLogger(AccountService.class);

	private DateProvider dateProvider = DateProvider.DEFAULT;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	public List<Map> getLstLoginfo(String user_id){
		return userDao.getLstLoginfo(user_id);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void changeLayout(Map map) throws Exception
	{
		userDao.changeLayout(map);
//		String Flag = (String) map.get("FLAG");
//		if(Flag.equals("RESETPWD")){
//			String describe = DEFALUT_STRING_RESET+" "+map.get("USER_ALIAS")+"(账号："+map.get("USER_NAME")+") "+DEFALUT_STRING_PWD;
//			super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
//		}else{
//			super.insertLogs(DEFALUT_OPEATE_TYPE, DEFALUT_STRING_CHANGEPWD);
//		}
	}
	
	public Map getAppLayout(String appId) {
		return userDao.getAppLayout(appId);
	}
	
	public List<Map> getUsers(RowBounds rowbounds,Map map) {
		return userDao.getUsers(rowbounds,map);
	}
	
	public List<Map> checkUserExist(String username) {
		return userDao.checkUserExist(username);
	}
	
	public List<Map> checkRoleName(Map map) {
		return roleDao.checkRoleName(map);
	}
	
	public List<Map> getUserLockListByUserName(String user_name){
		return userDao.getUserLockListByUserName(user_name);
	}
	
	public void insertFailLogin(String user_name){
		Map map = new HashMap();
		map.put("ID",UUID.randomUUID().toString());
		map.put("USER_NAME", user_name);
		userDao.insertFailLogin(map);
	}
	
	public void delUserLocksByUserName(String user_name){
		userDao.delUserLocksByUserName(user_name);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public List<Map> getHighestRole(String user_id) {
		return userDao.getHighestRole(user_id);
	}
	
	public Integer getUsersCount(Map map)
	{
		return userDao.getUsersCount(map);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public Integer setRoleToUser(Map map) throws Exception
	{
		Integer result = userDao.setRoleToUser(map);
		List<Map> app_name = userDao.getAppName((String)map.get("ROLE_ID"));
		Map appInfo = app_name.get(0);
		String describe = DEFALUT_USER_ROLE+DEFALUT_STRING_USER+" "+(String) map.get("USER_NAME")+" "
				+DEFALUT_STRING_ALLOT+DEFALUT_STRING_ROLE+" "+(String) map.get("ROLE_NAME")
				+"(所属系统："+appInfo.get("APP_NAME")+")";
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
		return result;
	}
	
	public List<Map> searchUser(RowBounds rowbounds,Map map) throws SQLException
	{
		return userDao.searchUser(rowbounds,map);
	}
	
	public List<Map> checkUserName(String username) throws SQLException
	{
		return userDao.checkUserExist(username);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public Integer delRoleToUser(Map map) throws Exception
	{
		Integer result = userDao.delRoleToUser(map);
		List<Map> app_name = userDao.getAppName((String)map.get("ROLE_ID"));
		Map appInfo = app_name.get(0);
		String describe = DEFALUT_USER_ROLE+DEFALUT_STRING_USER+" "+(String) map.get("USER_NAME")+" "
				+DEFALUT_STRING_DISBIND+DEFALUT_STRING_ROLE+" "+(String) map.get("ROLE_NAME")
				+"(所属系统："+appInfo.get("APP_NAME")+")";
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
		return result;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void changePassword(Map map,String surePassword) throws Exception
	{
		entryptPassword(map, surePassword);
		userDao.changePassword(map);
		String Flag = (String) map.get("FLAG");
		if(Flag.equals("RESETPWD")){
			String describe = DEFALUT_STRING_RESET+" "+map.get("USER_ALIAS")+"(账号："+map.get("USER_NAME")+") "+DEFALUT_STRING_PWD;
			super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
		}else{
			super.insertLogs(DEFALUT_OPEATE_TYPE, DEFALUT_STRING_CHANGEPWD);
		}
	}
	
	public List<Map> getRoles(Map map) {
		String TYPE = (String) map.get("TYPE");
		List<Map> data = null;
			
		if(TYPE.equals("MENU")){
			data = roleDao.getMenuRolesAdmin(map);
		}else{
			data = roleDao.getRolesAdmin(map);
		}
		return data;
	}

	public List<Map> selectForDelRoles(String ROLE_ID) {
		return roleDao.selectForDelRoles(ROLE_ID);
	}
	
	public List<Map> getRolesForUser(Map queryParam) {
		List<Map> data = null;
		
		Map map = new HashMap();
		map.put("EDIT_USER_ID", queryParam.get("EDIT_USER_ID"));
		data = roleDao.getRolesForUserAdmin(map);
		
		return data;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void addRole(Map map) throws Exception {
		roleDao.addRole(map);
		roleDao.setParentRoleState(map);
		List<Map> app_name = userDao.getAppName((String)map.get("ROLE_ID"));
		Map app = app_name.get(0);
		String describe = DEFALUT_STRING_INSERT+DEFALUT_STRING_ROLE+" "+(String) map.get("ROLE_NAME")+"(所属系统："+(String)app.get("APP_NAME")+")";
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void editRole(Map map) throws Exception {
		 roleDao.editRole(map);
		 String originalParentId = (String)map.get("OriginalParentId");
		 String currentParentId = (String)map.get("PARENT_ID");
		 List<Map> children = roleDao.selectForDelRoles(originalParentId);
		 List<Map> curChildren = roleDao.selectForDelRoles(currentParentId);
		 if(children.size()==1){
			 Map sqlmap = new HashMap();
			 sqlmap.put("PARENT_ID", originalParentId);
			 roleDao.delSetParentState(sqlmap);
		 }
		 Integer curChildrenLength = curChildren.size();
		 String appId = (String) map.get("APP_ID");
		 if(curChildrenLength>0){
			 for(int i=0;i<curChildrenLength;i++){
				 Map child = curChildren.get(i);
				 Map updateMap = new HashMap();
				 updateMap.put("ROLE_ID", child.get("ROLE_ID"));
				 updateMap.put("APP_ID", appId);
				 roleDao.updateAppId(updateMap);
			 }
			 if(curChildrenLength>1){
				 roleDao.setParentRoleState(map);
			 }
		 }
		 List<Map> app_name = userDao.getAppName((String)map.get("ROLE_ID"));
		 Map app = app_name.get(0);
		 String describe = DEFALUT_STRING_UPDATE+DEFALUT_STRING_ROLE+" "+(String) map.get("ROLE_NAME")+"(所属系统："+(String)app.get("APP_NAME")+")";
		 super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void delRole(Map map) throws Exception {
		String ROLE_ID = (String) map.get("ROLE_ID");
		String PARENT_ID = (String) map.get("PARENT_ID");
		
		List<Map> roleList = roleDao.selectForDelRoles(ROLE_ID);
		
		for(int i=0;i<roleList.size();i++){
			Map role = roleList.get(i);
			String role_id = (String) role.get("ROLE_ID");
			List<Map> app_name = userDao.getAppName(role_id);
			Map app = app_name.get(0);
			roleDao.delRole(role_id);
			roleDao.delRolePermission(role_id);
			roleDao.delUserRole(role_id);
			String describe = DEFALUT_STRING_DELETE+DEFALUT_STRING_ROLE+" "+(String) role.get("ROLE_NAME")+"(所属系统："+(String)app.get("APP_NAME")+")";
			super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
		}
		List<Map> dealParentState = roleDao.selectForDelRoles(PARENT_ID);
		if(dealParentState.size()==1){
			roleDao.delSetParentState(map);
		}
	}
	
	public List<Map> getRoleIdByUser(Map queryParam) {
		return roleDao.getRoleIdByUser(queryParam);
	}
	
	public List<Map> getPermission(Map map) {
		List<Map> roleInfo = getRoleIdByUser(map);
		List<Map> data = null;
		if(roleInfo.size()>0){
			Map role = roleInfo.get(0);
			String role_type = (String) role.get("ROLE_TYPE");
			String app_id = (String) role.get("APP_ID");
			if(role_type.equals("0")){
				data = roleDao.getPermissionAdmin(map);
			}else{
				map.put("app_id", app_id);
				data = roleDao.getPermission(map);
			}
		}
		return data;
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void changePermissions(String menuIds,String role_id,String role_name) throws Exception {
		List<Map> orginalPermissions = roleDao.getOriginalPermission(role_id);
		System.out.println(orginalPermissions);
		roleDao.delRolePermission(role_id);
		
		if(menuIds.length()>0){
			String menu_id[] = menuIds.split(",");
			String menus[] = menuIds.split(",");
			List<Map> rmlist = new ArrayList();
			for(int i=0;i<menu_id.length;i++){
				Map rm = new HashMap();
				rm.put("MENU_ID",menu_id[i]);
				rm.put("ROLE_ID",role_id);
				rmlist.add(rm);
			}
			roleDao.addRolemenu(rmlist);
			
			String result = "";
			if(orginalPermissions.size()>0){
				String addResult = "";
				for(int x=0;x<menu_id.length;x++){
					for(int y=0;y<orginalPermissions.size();y++){
						Map menu = orginalPermissions.get(y);
						String menuId = (String) menu.get("MENU_ID");
						if(menu_id[x].equals(menuId)){
							menu_id[x]="remove";
						}
					}
				}
				for(int w=0;w<menu_id.length;w++){
					if(!menu_id[w].equals("remove")){
						addResult += (menu_id[w]+",");
					}
				}
				String cancelResult = "";
				for(int i=0;i<orginalPermissions.size();i++){
					Map menu = orginalPermissions.get(i);
					String menuId = (String) menu.get("MENU_ID");
					for(int j=0;j<menus.length;j++){
						if(menuId.equals(menus[j])){
							menu.put("MENU_ID", "remove");
						}
					}
				}
				for(int v=0;v<orginalPermissions.size();v++){
					Map menu = orginalPermissions.get(v);
					String menuId = (String) menu.get("MENU_ID");
					if(!menuId.equals("remove")){
						cancelResult += (menuId+",");
					}
				}
				int addResultLength = addResult.length();
				int cancelResultLength = cancelResult.length();
				if(!(addResultLength==0 && cancelResultLength==0)){
					if(addResultLength==0){
						result = "[{'cancelResult':'"+cancelResult.substring(0, cancelResult.length()-1)+"'},{'addResult':''}]";
					}else if(cancelResultLength==0){
						result = "[{'cancelResult':''},{'addResult':'"+addResult.substring(0, addResult.length()-1)+"'}]";
					}else{
						result = "[{'cancelResult':'"+cancelResult.substring(0, cancelResult.length()-1)+"'},"
								   + "{'addResult':'"+addResult.substring(0, addResult.length()-1)+"'}]";
					}
				}
			}else{
				result = "[{'cancelResult':''},{'addResult':'"+menuIds+"'}]";
			}
			if(result!=""){
				List<Map> app_name = userDao.getAppName(role_id);
				Map app = app_name.get(0);
				String describe = DEFALUT_STRING_UPDATE+DEFALUT_STRING_ROLE+" "+role_name+"(所属系统："+(String)app.get("APP_NAME")+") "+DEFALUT_STRING_PERMISSION;
				super.insertLogs(DEFALUT_OPEATE_TYPE,describe,result);
			}
		}else{
			String result = "";
			for(int i=0;i<orginalPermissions.size();i++){
				Map menu = orginalPermissions.get(i);
				result += ((String)menu.get("MENU_ID")+",");
			}
			result = "[{'cancelResult':'"+result.substring(0, result.length()-1)+"'},{'addResult':''}]";
			List<Map> app_name = userDao.getAppName(role_id);
			Map app = app_name.get(0);
			String describe = DEFALUT_STRING_UPDATE+DEFALUT_STRING_ROLE+" "+role_name+"(所属系统："+(String)app.get("APP_NAME")+") "+DEFALUT_STRING_PERMISSION;
			super.insertLogs(DEFALUT_OPEATE_TYPE,describe,result);
		}
	}
	
	public User getUser(String id) {
		return userDao.get(id);
	}

	public User findUserByLoginName(String loginName) {
		long startTime = System.currentTimeMillis();
		logger.info("---userDao:findUserByLoginName:start---");
		Map map = new HashMap();
		map.put("loginName", loginName);
		System.out.println("login=="+loginName);
		
		User user = userDao.getByName(map);
		System.out.println(user.toString());
		logger.info("---userDao:findUserByLoginName:end---");
		long endTime = System.currentTimeMillis();
		logger.info("---共使用了: "+String.valueOf(endTime-startTime)+"ms");
		return user;
	}
	
	public User checkLoginNameForUpdate(Map map) {
		logger.info("---userDao:checkLoginNameForUpdate:start---");
		return userDao.getByNameForUpdate(map);
	}
	
	@Transactional
	public void registerUser(User user) throws Exception {
		entryptPassword(user);
		user.setUserId(UUIDGenerator.getUUID());
		userDao.save(user);
		
		String describe = DEFALUT_STRING_INSERT+DEFALUT_STRING_USER+" "+user.getUseralias();
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional
	public void addUser(User user) throws Exception {
		registerUser(user);
	}
	
	public void insertUserRole(Map map) {
		roleDao.insertUserRole(map);
	}
	
	@Transactional
	public void updateUser(User user) throws Exception {
		entryptPassword(user);
		userDao.update(user);
		String describe = DEFALUT_STRING_UPDATE+DEFALUT_STRING_USER+" "+user.getUseralias();
		super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional(rollbackFor=Exception.class)
	public void delete(Map map) throws Exception
	{
		String userId = (String) map.get("USER_ID");
		 userDao.deleteUser(userId);
		 userDao.deleteUserRole(userId);
		 userDao.deleteUserMenu(userId);
		 String describe = DEFALUT_STRING_DELETE+DEFALUT_STRING_USER+" "+(String) map.get("USER_ALIAS");
		 super.insertLogs(DEFALUT_OPEATE_TYPE, describe);
	}
	
	@Transactional
	public List<Map> findUserByParam(RowBounds rowbounds,Map map)
	{
		return userDao.findUserByParam(rowbounds, map);
	}
	
	@Transactional
	public List<User> findAllUser()
	{
		return userDao.findAllUser();
	}
	
	public Integer getCount(Map map)
	{
		return userDao.getCount(map);
	}
	
	public List<Menu> findMeun(Map map)
	{
		return userDao.findMeun(map);
	}
	
	/**
	 * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
	 */
	private void entryptPassword(User user) {
		if(user.getPlainPassword() != null && !user.getPlainPassword().equals(""))
		{
			byte[] salt = Digests.generateSalt(SALT_SIZE);
			user.setSalt(Encodes.encodeHex(salt));
			byte[] hashPassword = Digests.sha1(user.getPlainPassword().getBytes(), salt, HASH_INTERATIONS);
			user.setPassword(Encodes.encodeHex(hashPassword));
		}
	}
	
	private void entryptPassword(Map map,String pwd) {
		if(pwd!= null && !pwd.equals(""))
		{
			byte[] salt = Digests.generateSalt(SALT_SIZE);
			map.put("salt", Encodes.encodeHex(salt));
			byte[] hashPassword = Digests.sha1(pwd.getBytes(), salt, HASH_INTERATIONS);
			map.put("surePassword",Encodes.encodeHex(hashPassword));
		}
	}
	
	public String entryptPassword(String pwd,String salt){
		byte[] hashPassword = Digests.sha1(pwd.getBytes(), Encodes.decodeHex(salt), HASH_INTERATIONS);
		return Encodes.encodeHex(hashPassword).toString();
	}
	
	
	public List<Map> exportUsers(){
		return userDao.exportUsers();
	}

}
