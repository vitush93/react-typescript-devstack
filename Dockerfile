FROM regnexus.comm.equabank.loc:5001/centos7-nginx:20180727
MAINTAINER vit.hlavacek@equabank.cz

RUN mkdir /opt/react
COPY dist /opt/react

RUN rm -rf /etc/nginx/nginx.conf
RUN ln -sf /usr/local/conf/prop/nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /usr/local/conf/prop/conf.js /opt/react/conf.js
								

