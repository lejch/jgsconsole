package com.jgsconsole.common.util;

import java.util.UUID;

/** 
 * <b>Application name:</b><br>
 * <b>Application describing:</b> <br>
 * <b>Copyright:</b>Copyright &copy; 2011 政府事业部--卫生政务开发部 版权所有。<br>
 * <b>Company:</b>Neusoft<br>
 * <b>Date:</b>2011-4-8<br>
 * @author 伍德鹏 wudp@neusoft.com
 * @version $Revision$
 */ 
public class UUIDGenerator
{
    public static String getUUID(){
        UUID id = UUID.randomUUID();
        return id.toString();
    }
}
