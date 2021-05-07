package com.jgsconsole.app.web.account;

import com.jgsconsole.app.entity.account.User;
import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;
import com.jgsconsole.app.web.token.UserToken;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ThreadContext;
import org.apache.shiro.web.subject.WebSubject;
import org.apache.shiro.web.subject.WebSubject.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springside.modules.utils.Encodes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 单点登录SSO
 */
@Controller
@RequestMapping(value = "/sso")
public class SSOController {

    @Autowired
    protected AccountService accountService;

    @RequestMapping(value = "",method = RequestMethod.GET)
    public String sso(HttpServletRequest request, HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin","*");
        String ssoname = request.getParameter("ssoname");
        String url = request.getParameter("url");
        Subject currentUser = SecurityUtils.getSubject();
        ShiroUser shiroUser = (ShiroUser)currentUser.getPrincipal();
        if(shiroUser!=null&&shiroUser.getUsername()!=null){
             if(ssoname.equals(shiroUser.getUsername())){
                 return "redirect:"+url;
             }else{
                 User user = accountService.findUserByLoginName(ssoname);
                 if(user==null){
                     return "redirect:/login";
                 }
                 bindUser(user,request,response);
                 return "redirect:"+url;
             }
        }else{
            User user = accountService.findUserByLoginName(ssoname);
            if(user==null){
                return "redirect:/login";
            }
            bindUser(user,request,response);
            return "redirect:"+url;
        }
    }

    private void bindUser(User user,HttpServletRequest request, HttpServletResponse response){
        PrincipalCollection principals = new SimplePrincipalCollection(
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
  					  user.getCreateDate(),user.getSalt()), "SSORealm");
        Builder builder = new Builder(
                request,
                response);
        builder.principals(principals);
        builder.authenticated(true);
        WebSubject subject = builder.buildWebSubject();
        ThreadContext.bind(subject);
    }

}
