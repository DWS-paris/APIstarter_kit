# API starter kit

Repo de départ pour la mise en place d'une API NodeJS.

Définition de l'API : <https://documenter.getpostman.com/view/1383513/S1EWQFhf>

Installer les dépendances :

```
npm i
```

Créer à la racine du dossier un fichier `.env` contenant les informations suivantes :

```
# Basic
PORT=2789
MONGO_URL = 'mongodb://127.0.0.1:27017/crud-api'
```

Lancer le serveur de base de données MongoDB :

```
sudo mongod
```

Lancer le serveur NodeJS :

```
npm start
```