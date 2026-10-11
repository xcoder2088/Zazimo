# Zazimo — État du projet

**Version documentaire :** 0.3  
**Statut :** conception initiale; développement non commencé.

## Vision

Zazimo est une application éducative destinée aux jeunes enfants, avec des adaptations possibles pour différents besoins d'apprentissage. L'enfant apprend à tracer des lettres et des nombres avec le doigt, un stylet ou une souris, et reçoit des encouragements et récompenses personnalisables.

## Décisions retenues

- **Nom de travail :** Zazimo (disponibilité de marque et de domaine non vérifiée).
- **Public :** jeunes enfants en général, avec options d'adaptation.
- **Plateformes visées :** Web, Android, iOS, Windows et Linux.
- **Priorité d'interface :** téléphones et tablettes tactiles; souris et stylet également.
- **Connectivité :** fonctionnement en ligne ET hors ligne. Les exercices essentiels doivent rester utilisables hors ligne.
- **Langue initiale :** français; architecture à préparer pour d'autres langues à l'avenir.
- **Contenu :** chiffres de 0 à 5 000, lettres majuscules et minuscules A–Z, tracé guidé puis libre, défis et récompenses configurables.
- **Personnalisation sensorielle :** modes « Énergie » et « Sérénité », tous deux personnalisables.
- **Impression :** fiches à la demande et cahiers complets, Letter et A4, plusieurs niveaux de guidage, export PDF.
- **Données :** stockage local par défaut. Synchronisation en ligne entre appareils éventuelle, à définir et à valider avec des règles de confidentialité.
- **Distribution :** gratuite, dons facultatifs envisagés.
- **Licence :** AGPL-3.0 envisagée; vérifier que le dépôt utilise bien cette licence avant publication.
- **Univers visuel :** logo et personnages originaux, inspirés de l'ambiance générale des émissions éducatives, sans copier des personnages, logos, musiques ou sons protégés.

## Modules prévus

1. Apprentissage des chiffres, séquentiel ou aléatoire, plage personnalisée.
2. Apprentissage des lettres majuscules/minuscules et prononciation française.
3. Validation tolérante des tracés, démonstrations et aide progressive.
4. Récompenses immédiates et défis de 3, 5 ou davantage de réussites.
5. Modes sensoriels et réglages de volume, animations, contraste et taille.
6. Espace éducateur protégé, paramètres de séance et suivi facultatif.
7. Générateur de fiches individuelles et cahiers imprimables.
8. Progression locale et tests en ligne/hors ligne.

## Architecture technique envisagée (non figée)

- Interface adaptative : HTML, CSS et JavaScript.
- Traçage : Canvas et événements Pointer.
- Go et Wails : pistes à étudier pour l'application de bureau.
- SQLite : stockage local structuré, si nécessaire.
- Service worker et ressources intégrées : piste pour le mode hors ligne Web.
- Android/iOS : stratégie de packaging à confirmer.
- Modèles HTML/PDF : piste pour l'impression.

Ne pas figer cette architecture avant d'avoir vérifié compatibilité, capacités tactiles, distribution et maintenance sur chaque plateforme.

## Feuille de route

- [ ] Consolider le cahier des charges et les critères d'acceptation.
- [ ] Concevoir la maquette tactile de l'accueil et du premier exercice (chiffre 1).
- [ ] Implémenter le tracé au doigt, au stylet et à la souris.
- [ ] Ajouter une validation tolérante et une aide progressive.
- [ ] Ajouter récompenses et défis.
- [ ] Construire l'espace éducateur.
- [ ] Créer le générateur de fiches et cahiers PDF.
- [ ] Créer l'identité visuelle et les deux modes sensoriels.
- [ ] Ajouter la progression locale.
- [ ] Tester démarrage hors ligne, perte de connexion et reprise sans perte de données.
- [ ] Valider la stratégie de déploiement sur chaque plateforme.
- [ ] Publier documentation, licence et instructions d'installation.

## Règles de travail

- Développer une fonctionnalité délimitée à la fois.
- Énoncer les critères de validation avant de coder.
- Tester après chaque changement et vérifier les fonctions déjà réalisées.
- Mettre à jour la feuille de route après chaque modification acceptée.
- Distinguer clairement les éléments proposés, développés et testés.
- Ne jamais prétendre qu'une fonctionnalité est terminée sans preuve de test.

## État vérifié

- Dépôt GitHub public : https://github.com/xcoder2088/Zazimo
- Branche par défaut : `main`.
- Le connecteur GitHub a confirmé la lecture du dépôt, mais les premières opérations d'écriture ont renvoyé une erreur 403.
- Ce document est proposé comme première écriture utile; confirmer le commit en relisant le fichier après l'appel.
- Aucun prototype applicatif n'est encore déclaré développé ou testé.


## Prototype initial — créé, validation en attente

- `prototype/index.html` : écran d'exercice tactile pour le chiffre 1.
- `prototype/styles.css` : interface responsive et préréglage Sérénité.
- `prototype/app.js` : événements tactiles/pointeur, tracé, remise à zéro, feedback et son de réussite facultatif.
- **État :** les fichiers sont commités et relus depuis GitHub. Le prototype n'a pas encore été exécuté et testé dans un navigateur réel; la logique de validation est une heuristique expérimentale, pas un moteur pédagogique final.
- **Limites connues à traiter avant de déclarer la maquette validée :** tester sur téléphone et tablette; vérifier redimensionnement, accessibilité et audio; renforcer la validation du tracé; ajouter un vrai mode d'aide; vérifier l'expérience hors ligne.


## Ajustement du guide de tracé

- Le guide pointillé du chiffre 1 suit maintenant le trajet attendu : diagonale vers le sommet, puis descente verticale.
- La branche pointillée à droite et la petite flèche indépendante ont été retirées pour éviter une consigne visuelle ambiguë.
- Fichiers modifiés : `prototype/app.js`, `prototype/index.html` et `prototype/styles.css`.
- À valider visuellement dans le navigateur après actualisation; les autres tests du prototype restent en attente.


## Démonstration guidée et recentrage du tracé — à tester

- Le guide pointillé est défini comme une ligne centrale du chiffre 1 : diagonale vers le sommet, puis descente verticale. Le centre du trait vertical a été rapproché du centre visuel du chiffre.
- Une démonstration animée se lance à l'ouverture : un point suit le chemin et une ligne colorée montre le mouvement.
- Le message explique le geste (« monte en diagonale, puis descend tout droit »), puis invite l'enfant à essayer.
- Un bouton permet de revoir la démonstration.
- Le réglage système de réduction des animations est respecté en désactivant l'animation longue.
- Fichiers modifiés : `prototype/index.html`, `prototype/styles.css`, `prototype/app.js`.
- État : commits enregistrés et fichiers à relire. Le rendu doit encore être vérifié dans le navigateur sur écran large et tactile; la validation pédagogique du tracé reste expérimentale.
