package com.jgsconsole.app.web.filter;

import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ThreadContext;
import org.apache.shiro.web.filter.authc.UserFilter;
import org.apache.shiro.web.subject.WebSubject;
import org.springframework.beans.factory.annotation.Autowired;

import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.app.service.account.ShiroDbRealm;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UnieapSessionFilter extends UserFilter {
    @Autowired
    public AccountService accountService;

    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        if (isLoginRequest(request, response)) {
            return true;
        } else {
            Subject subject = getSubject(request, response);
            try{
                if(subject.getSession()!=null&&subject.getSession().getAttribute("unieaplogin")!=null){
                    String unieapname = (String)subject.getSession().getAttribute("unieaplogin");
                    if(unieapname!=null&&!unieapname.equals("")){
                        User user = accountService.findUserByLoginName(unieapname);
                        if(user==null){
                            return false;
                        }
                        bindUser(user,(HttpServletRequest)request,(HttpServletResponse)response);
                        return true;
                    }
                }
            }catch(Exception e){

            }
            // If principal is not null, then the user is known and should be allowed access.
            return subject.getPrincipal() != null;
        }
    }
    private void bindUser(User user,HttpServletRequest request, HttpServletResponse response){
        PrincipalCollection principals = new SimplePrincipalCollection(
                new ShiroDbRealm.ShiroUser(user.getUserId(),
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
					  					   user.getCreateDate(),user.getSalt()),"SSORealm");
        WebSubject.Builder builder = new WebSubject.Builder(
                request,
                response);
        builder.principals(principals);
        builder.authenticated(true);
        WebSubject subject = builder.buildWebSubject();
        ThreadContext.bind(subject);
    }
}
