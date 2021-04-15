#Define versión de node
FROM node:14

#Directorio de guardado de app
WORKDIR /usr/scr/app 
#/opt/app

#Copia los package y muevelos a WORKDIR
COPY package*.json ./  

#Instala todas las dependencias del proyecto
RUN npm install 

#Copiar resto de archivos al WORKDIR
COPY . . 

#Habilita el puerto 3000
EXPOSE 3000 

#Ejecuta node server.js
CMD ["node", "server.js"] #Ejecuta node server.js