/*
 * Licensed to the Apache Software Foundation (ASF) under one

 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.jgsconsole.app.service.account;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.credential.AllowAllCredentialsMatcher;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.utils.Encodes;

import com.google.common.base.Objects;
import com.jgsconsole.app.entity.account.Menu;
import com.jgsconsole.app.entity.account.Role;
import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.web.token.UserToken;

public class ShiroDbRealm extends AuthorizingRealm
{
    private AccountService accountService;

    public ShiroDbRealm() {
        super();
        setAuthenticationTokenClass(UserToken.class);
    }

    /**
     * 认证回调函数,登录时调用.
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken authcToken) throws AuthenticationException
    {
        UserToken token = (UserToken) authcToken;
        User user = null;
        byte[] salt = null;
        user = accountService.findUserByLoginName(token.getUsername());
        salt = Encodes.decodeHex(user.getSalt());
        
        //将List<Menu>变成Map<Menu,List<Menu>>
        if (user != null)
        {
            //如果不设值，系统内部出现空指针
            if (user.getRoles().size()<=0)
            {
                user.setRoles(new ArrayList<Role>());
            }
            return new SimpleAuthenticationInfo(
            		new ShiroUser(user.getUserId(),
            					  user.getUsername(), 
            					  user.getUseralias(),
            					  user.getPassword(),
            					  user.getIdcard(),
            					  user.getBirthday(),
            					  user.getGender(),
            					  user.getLocation(),
            					  user.getWork_unit(),
            					  user.getPhone(),
            					  user.getEmail(),
            					  user.getRoles(),
            					  user.getMenus(),
            					  user.getUnitcode(),
            					  user.getCreateDate(),
            					  user.getSalt())
                    ,user.getPassword(),
                    ByteSource.Util.bytes(salt)
                    ,getName()
            );
        } else {return null;}
    }

    @Override
    protected void assertCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) throws AuthenticationException {
        UserToken ehrToken = (UserToken)token;
        if("0".equals(  ehrToken.getLogintype())){
            CredentialsMatcher cm = getCredentialsMatcher();
            if (cm != null) {
                if (!cm.doCredentialsMatch(token, info)) {
                    //not successful - throw an exception to indicate this:
                    String msg = "Submitted credentials for token [" + token + "] did not match the expected credentials.";
                    throw new IncorrectCredentialsException(msg);
                }
            } else {
                throw new AuthenticationException("A CredentialsMatcher must be configured in order to verify " +
                        "credentials during authentication.  If you do not wish for credentials to be examined, you " +
                        "can configure an " + AllowAllCredentialsMatcher.class.getName() + " instance.");
            }
        }
		/*else{
			//普通用户密码校验
		}*/
    }

    /**
     * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals)
    {
        ShiroUser shiroUser = (ShiroUser) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

        // 将用户添加到授权中
        Collection<String> roleList = new ArrayList<String>();

        for (Role role : shiroUser.getRoles())
        {
            roleList.add(role.getRoleName());
        }

        info.addRoles(roleList);

        //设置url访问权限
        List<Menu> menu = shiroUser.getMenus();
        for(Menu m:menu)
        {
            if(StringUtils.isNotBlank(m.getLocation()))
            {
                info.addStringPermission(m.getLocation());
            }
        }
        return info;
    }

    /**
     * 设定Password校验的Hash算法与迭代次数.
     */
    @PostConstruct
    public void initCredentialsMatcher()
    {
    	//之前的加密算法
//    	CustomCredentialsMatcher mathcer = new CustomCredentialsMatcher();
//    	setCredentialsMatcher(mathcer);
    	
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(AccountService.HASH_ALGORITHM);
        matcher.setHashIterations(AccountService.HASH_INTERATIONS);
        setCredentialsMatcher(matcher);
    }

    @Autowired
    public void setAccountService(AccountService accountService)
    {
        this.accountService = accountService;
    }
    
    public static class ShiroUser implements Serializable
    {
        private static final long serialVersionUID = -1373760761780840081L;
        public String userId;
        public String useralias;
        public String username;
        public String salt;
        private String password;
        private String idcard;
        private String birthday;
        private String gender;
        private String location;
        private String work_unit;
        private String phone;
        private String email;
        private String unitCode;
        private String createDate;
        public List<Role> roles;
        public  List<Menu> menus;

        public ShiroUser(String userId, 
        				 String username, 
        				 String useralias,
        				 String password,
        				 String idcard, 
        				 String birthday, 
        				 String gender,
        				 String location, 
        				 String work_unit, 
        				 String phone,
        				 String email,
        				 List<Role> roles, 
        				 List<Menu> menus,
        				 String unitCode,
        				 String createDate,
        				 String salt)
		{
		   super();
		   this.userId = userId;
		   this.useralias = useralias;
		   this.username = username;
		   this.roles = roles;
		   this.menus = menus;
		   this.password = password;
		   this.idcard = idcard;
		   this.birthday = birthday;
		   this.gender = gender;
		   this.location = location;
		   this.work_unit = work_unit;
		   this.phone = phone;
		   this.email = email;
		   this.unitCode = unitCode;
		   this.createDate = createDate;
		   this.salt = salt;
		}

        public String getUseralias()
        {
            return useralias;
        }

        public void setUseralias(String useralias)
        {
            this.useralias = useralias;
        }

        public String getUsername()
        {
            return username;
        }

        public void setUsername(String username)
        {
            this.username = username;
        }

        public List<Menu> getMenus() {
            return menus;
        }

        public void setMenus(List<Menu> menus) {
            this.menus = menus;
        }

        public String getIdcard() {
            return idcard;
        }

        public void setIdcard(String idcard) {
            this.idcard = idcard;
        }

        public String getBirthday() {
            return birthday;
        }

        public void setBirthday(String birthday) {
            this.birthday = birthday;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getWork_unit() {
            return work_unit;
        }

        public void setWork_unit(String work_unit) {
            this.work_unit = work_unit;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public List<Role> getRoles()
        {
            return roles;
        }

        public void setRoles(List<Role> roles)
        {
            this.roles = roles;
        }

        public String getUserId()
        {
            return userId;
        }

        public void setUserId(String userId)
        {
            this.userId = userId;
        }

        public String getUnitCode() {
            return unitCode;
        }

        public void setUnitCode(String unitCode) {
            this.unitCode = unitCode;
        }

        @Override
        public String toString()
        {
            return username;
        }

        @Override
        public int hashCode()
        {
            return Objects.hashCode(username);
        }

        @Override
        public boolean equals(Object obj)
        {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            ShiroUser other = (ShiroUser) obj;
            if (username == null)
            {
                if (other.username != null)
                    return false;
            } else if (!username.equals(other.username))
                return false;
            return true;
        }

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getCreateDate() {
			return createDate;
		}

		public void setCreateDate(String createDate) {
			this.createDate = createDate;
		}

		public String getSalt() {
			return salt;
		}

		public void setSalt(String salt) {
			this.salt = salt;
		}
    }
}
