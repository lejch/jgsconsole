package com.jgsconsole.app.service.account;
import com.danga.MemCached.MemCachedClient;
import org.apache.log4j.Logger;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

public class AppSessionDAO extends AbstractSessionDAO {

//    private final static Logger log = LoggerFactory.getLogger(AppSessionDAO.class);
    private Logger log = Logger.getLogger(AppSessionDAO.class);

    private MemCachedClient client;

    public AppSessionDAO(MemCachedClient client) {
        if (client == null) {
            throw new RuntimeException("必须存在memcached客户端实例");
        }
        this.client = client;

    }

    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = generateSessionId(session);
        assignSessionId(session, sessionId);
        try {
            log.debug("存入session:" + session);
            client.set(sessionId.toString(),session,(int) session.getTimeout() / 1000);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return sessionId;
    }

    @Override
    protected Session doReadSession(Serializable sessionId) {
        Session session = null;
        try {
            session = (Session)client.get(sessionId.toString());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
//        log.debug("读取session:" + session);
//        if(session == null){
//
//        }
        return session;
    }

    @Override
    public void delete(Session session) {
        try {
            client.delete(session.getId().toString());
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        log.debug("删除session:" + session);
    }

    @Override
    public Collection<Session> getActiveSessions() {
        return Collections.emptySet();
    }

    @Override
    public void update(Session session) throws UnknownSessionException {
        try {
            client.replace(session.getId().toString(),session, (int) session.getTimeout() / 1000);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
//        log.debug("更新session:" + session);
    }

}