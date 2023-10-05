 
# Blog-express-sql-nuevo
=======

1- iniciamos el repositorio npm

npm init --yes

2 instalamos express

npm install express


3 instalamos typescript y los types de express

npm i -D typescript @types/express @types/node


4 Creamos el archivo tsconfig.conf

npx tsc --init

5 Creamos el archivo .gitignore

node_modules
dist


6 Agregamos dos scripts en el archivo package.json

	"scripts": {
	"build": "npx tsc",
	"start": "node dist/index.js",
	"dev": "nodemon server.ts"
    }


8 Modificar archivo tsconfig.json descomentado la linea "outDir": "./" y agregando la carpeta dist "outDir": "./dist"

Ejecutar APP

Clonar repositorio y correr el comando

npm install
npm build
npm start


instalar

npm i typeorm sqlite3


## AGREGAR TYPE REQUEST PERSONALIZADO DE EXPRESS
1. crear estructura para @types
   1. crear carpeta dentro de modules "@types/express/index.d.ts"
   2. modificar tsconfig.json
    ``` "typeRoots": [
      "./modules/@types",
      "./node_modules/@types"
    ]
    ```
2. editar auth service agregando antes de Next() ```req.usuario = decode.usuario```
3. dentro del servicio crear noticia leer req.usuario por ejemplo imprimir en el log ```req.usuario.nombre```