#!/bin/bash
echo "" > /root/.ssh/config
#echo -e "Host *\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config
echo -e "StrictHostKeyChecking no" >> /etc/ssh/ssh_config
# Dont pull code down if the .git folder exists
   GIT_COMMAND='git clone --depth 1 '
   if [ "$GIT_BRANCH" -a "$GIT_REPO" ]; then
     GIT_COMMAND=${GIT_COMMAND}" -b ${GIT_BRANCH} ${GIT_REPO}"
     ${GIT_COMMAND} /var/www/site || exit 1
   fi
 echo ${GIT_COMMAND}

# 安装依赖文件
#yarn add react react-dom whatwg-fetch cookie-parser body-parser express morgan react-loadable 
#yarn install
tar zxvf /node_modules.tar.gz -C /var/www/site
rm -rf /node_modules.tar.gz
echo '---build----'
yarn build:clientPre
echo '---build-ok---'
# 使用pm2启动node服务
pm2 start ./server/index.js -i 2
echo 'pm2 start ok'
nginx
pm2 log

#-e 'GIT_REPO=git@gitee.com:veryeast/ve_m_ssr.git' -e 'GIT_BRANCH=dev'
#tar -czvf node_modules.tar.gz node_modules 
#cp node_modules.tar.gz  deployment/docker/
#rm -rf node_modules.tar.gz