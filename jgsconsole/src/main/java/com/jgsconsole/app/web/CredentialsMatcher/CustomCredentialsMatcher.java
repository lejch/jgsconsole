package com.jgsconsole.app.web.CredentialsMatcher;

import org.apache.shiro.authc.AuthenticationInfo;  
import org.apache.shiro.authc.AuthenticationToken;  
import org.apache.shiro.authc.UsernamePasswordToken;  
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;  

import com.jgsconsole.app.web.token.UserToken;
import com.jgsconsole.common.util.CodeUtils;
  
/** 
 * 自定义 密码验证类 
 * 
 */  
public class CustomCredentialsMatcher extends SimpleCredentialsMatcher {  
     	@Override  
        public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {  
     		UserToken token = (UserToken) authcToken;  
            
            Object tokenCredentials = encrypt(String.valueOf(token.getPassword()));  
            
            
            Object accountCredentials = getCredentials(info);  
            //将密码加密与系统加密后的密码校验，内容一致就返回true,不一致就返回false  
            return equals(tokenCredentials, accountCredentials);  
        }  
  
        //将传进来密码加密方法  
        private String encrypt(String data) {  
        	CodeUtils cu = new CodeUtils();
            String base64md5 = cu.encode(data);
            return base64md5;  
        }  
}  