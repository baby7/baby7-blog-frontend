# FROM 指定基础镜像
FROM nginx:1.8.1
# ARG 构建参数
ARG JAR_FILE=dist
# COPY 复制文件
COPY ${JAR_FILE} /usr/share/nginx/html
# 暴露端口
EXPOSE 80
