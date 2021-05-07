package com.jgsconsole.app.web.filter;

import com.jgsconsole.app.service.BaseLogUtil;
import com.jgsconsole.app.service.account.AccountService;
import com.jgsconsole.app.web.token.UserToken;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.AuthenticatingFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class UserFormAuthenticationFilter extends AuthenticatingFilter {

    public static final String DEFAULT_ERROR_KEY_ATTRIBUTE_NAME = "shiroLoginFailure";

    public static final String DEFAULT_USERNAME_PARAM = "username";
    public static final String DEFAULT_PASSWORD_PARAM = "password";
    public static final String DEFAULT_LOGINTYPE_PARAM = "loginType";
    public static final String DEFAULT_REMEMBER_ME_PARAM = "rememberMe";


    private static final Logger log = LoggerFactory.getLogger(UserFormAuthenticationFilter.class);

    private String usernameParam = DEFAULT_USERNAME_PARAM;
    private String passwordParam = DEFAULT_PASSWORD_PARAM;
    private String loginTypeParam = DEFAULT_LOGINTYPE_PARAM;
    private String rememberMeParam = DEFAULT_REMEMBER_ME_PARAM;

    private String failureKeyAttribute = DEFAULT_ERROR_KEY_ATTRIBUTE_NAME;
    
    @Autowired
	protected AccountService accountService;

    public UserFormAuthenticationFilter() {
        setLoginUrl(DEFAULT_LOGIN_URL);
    }

    @Override
    public void setLoginUrl(String loginUrl) {
        String previous = getLoginUrl();
        if (previous != null) {
            this.appliedPaths.remove(previous);
        }
        super.setLoginUrl(loginUrl);
        if (log.isTraceEnabled()) {
            log.trace("Adding login url to applied paths.");
        }
        this.appliedPaths.put(getLoginUrl(), null);
    }

    public String getUsernameParam() {
        return usernameParam;
    }

    public void setUsernameParam(String usernameParam) {
        this.usernameParam = usernameParam;
    }

    public String getPasswordParam() {
        return passwordParam;
    }

    public void setPasswordParam(String passwordParam) {
        this.passwordParam = passwordParam;
    }

    public String getLoginTypeParam() {
        return loginTypeParam;
    }

    public String getRememberMeParam() {
        return rememberMeParam;
    }

    public void setRememberMeParam(String rememberMeParam) {
        this.rememberMeParam = rememberMeParam;
    }

    public String getFailureKeyAttribute() {
        return failureKeyAttribute;
    }

    public void setFailureKeyAttribute(String failureKeyAttribute) {
        this.failureKeyAttribute = failureKeyAttribute;
    }
    
    public List<Map> getUserLockListByUserName(String user_name){
    	return accountService.getUserLockListByUserName(user_name);
    }
    
    public void insertFailLogin(String user_name){
    	accountService.insertFailLogin(user_name);
    }
    
    public void delUserLocksByUserName(String user_name){
    	accountService.delUserLocksByUserName(user_name);
    }

    public int unlocktime = 1;
    
    public Boolean CheckIsLock(String locktime){
    	Boolean result = true;
    	DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss"); 
    	try{
          Date lockTime = df.parse(locktime);  
          Date now = new Date(); 
          long diff = now.getTime() - lockTime.getTime();
          long hours = diff / (1000 * 60 * 60);
          System.out.println("LockTime小时："+hours);  
          if(hours>=unlocktime){result = false;}
    	}catch(Exception e){}
    	return result;
    }
    
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        if (isLoginRequest(request, response)) {
            if (isLoginSubmission(request, response)) {
            	AuthenticationToken usertoken =	createToken(request, response);
                UserToken Mytoken = (UserToken) usertoken;
                String user_name = Mytoken.getUsername();
                
                List<Map> locklist = getUserLockListByUserName(user_name);
                if(locklist.size()>4){
                	Map newestLock = locklist.get(0);
                	if(CheckIsLock(String.valueOf(newestLock.get("TRY_TIME")))){
                		request.setAttribute(getFailureKeyAttribute(), "您已尝试超过5次,账号已被锁定,请"+unlocktime+"小时后再次尝试！");
                		return true;
                	}else{
                		delUserLocksByUserName(user_name);
                		return executeLogin(request, response);
                	}
                	
                }else{
                	return executeLogin(request, response);
                }
            } else {
                return true;
            }
        } else {
//        	if(AjaxUtils.isAjaxRequest(WebUtils.toHttp(request))){  
//                HttpServletResponse res = WebUtils.toHttp(response);  
//                res.sendError(HttpServletResponse.SC_UNAUTHORIZED);  
//                  
//            }else{  
//                redirectToLogin(request, response);  
//            }  

        	System.out.println("is this here ?????");
        	
            saveRequestAndRedirectToLogin(request, response);
            return false;
        }
    }
    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        AuthenticationToken token = createToken(request, response);
        if (token == null) {
            String msg = "createToken method implementation returned null. A valid non-null AuthenticationToken " +
                    "must be created in order to execute a login attempt.";
            throw new IllegalStateException(msg);
        }
        boolean loginflag = false;
        try {
            Subject subject = getSubject(request, response);
            subject.login(token);
            loginflag = true;
            return onLoginSuccess(token, subject, request, response);
        } catch (AuthenticationException e) {
            return onLoginFailure(token, e, request, response);
        }
    }

    /**
     * This default implementation merely returns <code>true</code> if the request is an HTTP <code>POST</code>,
     * <code>false</code> otherwise. Can be overridden by subclasses for custom login submission detection behavior.
     *
     * @param request  the incoming ServletRequest
     * @param response the outgoing ServletResponse.
     * @return <code>true</code> if the request is an HTTP <code>POST</code>, <code>false</code> otherwise.
     */
    @SuppressWarnings({"UnusedDeclaration"})
    protected boolean isLoginSubmission(ServletRequest request, ServletResponse response) {
        return (request instanceof HttpServletRequest) && WebUtils.toHttp(request).getMethod().equalsIgnoreCase(POST_METHOD);
    }

    protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
    	String username = getUsername(request);
        String password = getPassword(request);
        String logintype = "0";
        String host = getHost(request);
        return new UserToken(username, password,logintype,false,host);
    }

    protected boolean isRememberMe(ServletRequest request) {
        return WebUtils.isTrue(request, getRememberMeParam());
    }

    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject,
                                     ServletRequest request, ServletResponse response) throws Exception {
        issueSuccessRedirect(request, response);
        
        UserToken mytoken = (UserToken) token;
        delUserLocksByUserName(mytoken.getUsername());
        
        BaseLogUtil blu = new BaseLogUtil();
        String ip = blu.getIpAddr((HttpServletRequest)request);
        blu.insertLoginLog(blu.DEFALUT_LOGIN_TYPE, blu.DEFALUT_STRING_LOGIN,ip);
        return false;
    }

    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e,
                                     ServletRequest request, ServletResponse response) {
        setFailureAttribute(request, e);
    	AuthenticationToken usertoken =	createToken(request, response);
        UserToken Mytoken = (UserToken) usertoken;
        insertFailLogin(Mytoken.getUsername());
        //login failed, let request continue back to the login page:
        return true;
    }

    protected void setFailureAttribute(ServletRequest request, AuthenticationException ae) {
        String className = ae.getClass().getName();
        request.setAttribute(getFailureKeyAttribute(), className);
    }

    protected String getUsername(ServletRequest request) {
        return WebUtils.getCleanParam(request, getUsernameParam());
    }

    protected String getPassword(ServletRequest request) {
        return WebUtils.getCleanParam(request, getPasswordParam());
    }

    protected String getLoginType(ServletRequest request) {
        return WebUtils.getCleanParam(request, getLoginTypeParam());
    }

	public AccountService getAccountService() {
		return accountService;
	}

	public void setAccountService(AccountService accountService) {
		this.accountService = accountService;
	}
}
