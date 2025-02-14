# 🚀 Application Mobile Sécurisée d’Aide à la Prise de Notes Médicales avec IA 🏥

🔹 **Un Proof-of-Concept (PoC) innovant** visant à simplifier la prise de notes médicales grâce à une application mobile connectée à un back-end sécurisé et intégrant une intelligence artificielle (simulée pour l’instant).  
💡 **Objectif** : Permettre à un professionnel de santé d’enregistrer une consultation, d’envoyer l’audio pour traitement, et d’afficher une transcription ainsi qu’un résumé structuré.

---

## 📖 Table des Matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies Utilisées](#️-technologies-utilisées)
- [📌 Prérequis](#-prérequis)
- [⚙️ Installation](#️-installation)
  - [🔧 Back-end](#-back-end)
  - [📱 Application Mobile](#-application-mobile)
- [📂 Structure du Projet](#-structure-du-projet)
- [🚀 CI/CD](#-cicd)
- [📈 Améliorations Futures](#-améliorations-futures)
- [🤝 Contribuer](#-contribuer)
- [📜 Licence](#-licence)
- [📧 Contact](#-contact)

---

## ✨ Fonctionnalités

### 🖥️ Back-end

✔️ **Endpoint RESTful `/upload`** (POST) acceptant un fichier audio via `multipart/form-data`.  
🔒 **Gestion des fichiers audio** :
  - 📥 Sauvegarde temporaire sur le serveur.
  - 🔐 Chiffrement basique (AES-256) simulant la protection des données.
  - ❌ Suppression du fichier en clair après chiffrement.

📝 **Traitement de l’audio** :
  - 🔊 **Transcription simulée** : Génération d’un texte fictif.  
  - 🤖 **Résumé structuré via IA (simulée)** : Catégorisation en **anamnèse, diagnostic, traitement**.

📤 **Réponse JSON** :
```json
{
  "transcription": "Ceci est une transcription simulée.",
  "summary": "Résumé structuré ici.",
  "encrypted_file_path": "/secured/audio.enc"
}
```

### 📱 Application Mobile

🎙️ **Enregistrement audio** : Interface utilisateur simple via **Expo & React Native**.  
📤 **Envoi du fichier audio** : Transmission vers `/upload`.  
📑 **Affichage des résultats** : Récupération et affichage du **résumé et transcription**.

---

## 🛠️ Technologies Utilisées

📌 **Front-end** : Expo, React Native, Restyle, Redux Toolkit  
📌 **Back-end** : Express.js, MySQL  
📌 **CI/CD** : GitHub Actions  

---

## 📌 Prérequis

✅ **Node.js** (v14+ recommandé)  
✅ **npm** ou **yarn**  
✅ **MySQL Server**  
✅ **Expo CLI** (pour le développement mobile)  
✅ **Git**  

---

## ⚙️ Installation

### 🔧 Back-end

1. **Cloner le dépôt** :  
   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```
2. **Installer les dépendances** :  
   ```bash
   npm install
   ```
3. **Configurer les variables d’environnement** :  
   Créez un fichier `.env` et ajoutez :  
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=notes_db
   ENCRYPTION_KEY=your_secret_encryption_key_here
   ```
4. **Démarrer le serveur** :  
   ```bash
   npm start
   ```

### 📱 Application Mobile

1. **Aller dans le répertoire du front-end** :  
   ```bash
   cd ../frontend
   ```
2. **Installer les dépendances** :  
   ```bash
   npm install
   ```
3. **Démarrer Expo** :  
   ```bash
   npm start
   ```

---

## 📂 Structure du Projet

```
📁 project-root
├── 📂 backend
│   ├── 📁 controllers    # Logique des requêtes
│   ├── 📁 routes         # Définition des endpoints REST
│   ├── 📁 utils          # Fonctions utilitaires (ex: chiffrement)
│   ├── 📄 app.js         # Point d’entrée du serveur
│   ├── 📄 package.json   # Dépendances backend
│   └── 📄 .env           # Variables d’environnement
├── 📂 frontend
│   ├── 📁 app
│   │   ├── 📁 features # fonctionnalités principales (écrans)
│   │   ├── 📁 shared    # dossiers contenant des composants, services, styles, ... reutilisables
│   │   ├── 📁 navigations      # navigations dans l'application
│   │   ├── 📁 theme      # theme de l'application
│   │   ├── 📁 store      # contenant les configurations de base redux-toolkit
│   │   ├── 📁 config      # config de l'application
│   │   └── 📄 App.js     # Point d’entrée de l’app mobile
│   ├── 📄 package.json   # Dépendances frontend
│   └── 📄 app.json       # Configuration Expo
└── 📄 README.md          # Ce fichier
```

---

## 🚀 CI/CD

✅ **GitHub Actions** est utilisé pour :  
- **Linting & tests** avant chaque push.  
- **Déploiement automatique** du back-end en cas de build réussi.  

Le fichier de workflow est dans `.github/workflows/ci.yml`.

---

## 📈 Améliorations Futures

✨ **Renforcement du chiffrement et de la sécurité des fichiers**.  
✨ **Tests unitaires et intégration pour le back-end & front-end**.  
✨ **Déploiement en production**.  

---

## 🤝 Contribuer

🎯 **Vous souhaitez contribuer ?** Voici comment :  
1. **Fork** ce dépôt.  
2. **Créez une branche** (`feature/nom-de-la-fonctionnalité`).  
3. **Faites une Pull Request** avec une description détaillée.  

Merci pour votre aide ! 🚀

---

## 📧 Contact

Pour toute question ou suggestion, ouvrez une issue sur **GitHub** ou contactez :  

📩 **Email** : [diamondrap20.aps1b@gmail.com](mailto:diamondrap20.aps1b@gmail.com)  

---

💙 **Merci d’utiliser et de contribuer à ce projet !**  
