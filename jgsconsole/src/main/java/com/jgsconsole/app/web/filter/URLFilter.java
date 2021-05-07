package com.jgsconsole.app.web.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.StringUtils;
import org.apache.shiro.web.filter.authc.AuthenticationFilter;

/**
 * 
* @ClassName: URLFilter 
* @Description: 过滤url请求
* @author jsliu
* @date 2013-3-26 下午2:58:19 
*
 */
public class URLFilter extends AuthenticationFilter
{
	//需要排除过滤URL的请求参数名
	private static String[] EXCLUDSTRING;

	private static char SPLIT = ';';
	
	public URLFilter(String excludString)
	{
		EXCLUDSTRING = StringUtils.split(excludString, SPLIT);
	}
	
	public String[] getEXCLUDSTRING()
	{
		return EXCLUDSTRING;
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request,
			ServletResponse response) throws Exception
	{
		HttpServletResponse rsp = (HttpServletResponse)response;
		rsp.sendError(403);
		return false;
	}

	@Override
	public void doFilterInternal(ServletRequest request,
			ServletResponse response, FilterChain chain)
			throws ServletException, IOException
	{
		Exception exception = null;
		try
		{
			HttpServletRequest req = (HttpServletRequest)request;
//			String queryString = req.getQueryString();
			String queryString = req.getRequestURI();
			boolean exclude = excludeString(queryString);
			if(exclude)
			{
				//授权成功
				executeChain(request, response, chain);
				postHandle(request, response);
			}
			else
			{
				String permission = req.getServletPath();
				Subject subject =  SecurityUtils.getSubject();
				boolean continueChain = subject.isPermitted(permission.substring(1, permission.length()));

				if(continueChain)
				{
					//授权成功
					executeChain(request, response, chain);
					postHandle(request, response);
				}
				else
				{
					//授权失败
					onAccessDenied(request,response);
				}
			}



		} catch (Exception e)
		{
			 exception = e;
		}
		finally {
            cleanup(request, response, exception);
        }
	}
	
	/**
	 * 
	* @Title: excludeString 
	* @Description: 查询参数是否是排除参数
	* @param queryString
	* @return   
	* @return boolean    返回类型 
	* @throws
	 */
	private boolean excludeString(String queryString)
	{
		if(org.apache.commons.lang.StringUtils.isEmpty(queryString))
		{
			return false;
		}
		for(String str : EXCLUDSTRING)
		{
			if(queryString.contains(str))
			{
				return true;
			}
		}
		return false;
	}
	
}
