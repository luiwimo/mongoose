#Define versión de node
FROM node:14-slim

#Directorio de guardado de app
WORKDIR /usr/scr/app 
#/opt/app

#Copia los package y muevelos a WORKDIR
COPY package.json package-lock.json ./  

#Instala todas las dependencias del proyecto
RUN npm ci --production && npm cache clean --force 

#Copiar resto de archivos al WORKDIR
COPY . . 

#ARG PORT 

#ENV PORT=$PORT

ENV NODE_ENV production

#Ejecuta node server.js
CMD ["node", "server.js"]