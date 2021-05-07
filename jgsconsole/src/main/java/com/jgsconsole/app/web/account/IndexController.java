package com.jgsconsole.app.web.account;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jgsconsole.app.entity.account.Role;
import com.jgsconsole.app.service.account.ShiroDbRealm.ShiroUser;

@Controller
@RequestMapping(value = "/")
public class IndexController {
	@RequestMapping(value = "/")
	public String init(HttpServletRequest request, HttpServletResponse response){
		ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
		List<Role> rList = user.getRoles();
		String roleType = "";
		if ( rList.size() > 0 ){
			roleType = rList.get(0).getRoleType();
		}
		request.getSession().setAttribute("roleType", roleType);
//		return "index/index";
		return "index";
	}
    @RequestMapping(value = ";JSESSIONID=*")
    public String init1(HttpServletRequest request, HttpServletResponse response){
        ShiroUser user =  (ShiroUser)SecurityUtils.getSubject().getPrincipals().getPrimaryPrincipal();
        List<Role> rList = user.getRoles();
        String roleType = "";
        if ( rList.size() > 0 ){
            roleType = rList.get(0).getRoleType();
        }
        request.getSession().setAttribute("roleType", roleType);
//		return "index/index";
        return "index";
    }
}
