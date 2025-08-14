# FROM 指定基础镜像
FROM nginx:1.18.0
# ARG 构建参数
ARG DIST_FILE=dist
# COPY 复制文件
COPY ${DIST_FILE} /usr/share/nginx/html
# ARG 构建参数
ARG CONF_FILE=nginx.conf
# COPY 复制文件
COPY ${CONF_FILE} /etc/nginx
# 暴露端口
EXPOSE 80
