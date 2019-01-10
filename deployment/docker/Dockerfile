FROM codekoalas/nginx-node:8
LABEL maintainer=zhengkui
LABEL version=0.1
LABEL name=m.veryeast.cn

# 安装pm2的插件webshell，方便在容器外直接管理node和pm2
RUN npm update && \
    npm install -g pm2@latest && \
    npm install git -y

COPY node_modlues.tar.gz /
COPY ssh /root/.ssh
COPY start.sh /start.sh
COPY nginx.conf /etc/nginx/sites-enabled/default
RUN chmod 600 /root/.ssh/id_rsa &&\
    chmod a+x /start.sh

EXPOSE 443 80

CMD ["/start.sh"]
