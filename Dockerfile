
FROM node:16.15.1
#FROM node:latest

RUN mkdir -p /home/www/nodeRule
WORKDIR /home/www/nodeRule

RUN apt-get update

RUN apt-get install -y \
    vim \
    wget

COPY . /home/www/nodeRule

RUN npm install

# 设置时区
RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]



# docker  build  -t 172.19.202.31:5000/node-rule .
# docker push 172.19.202.31:5000/node-rule

