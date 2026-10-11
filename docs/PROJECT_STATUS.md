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


## Ajustement géométrique du guide du chiffre 1 — à tester
- Les coordonnées du chemin pointillé ont été déplacées pour suivre la ligne médiane visible du glyphe : départ bas-gauche, montée diagonale jusqu'au sommet, puis descente verticale centrée.
- Les proportions sont normalisées par rapport à la zone de dessin afin de conserver le positionnement sur différentes tailles d'écran.
- Le rendu doit être recontrôlé après mise à jour du clone local et actualisation forcée du navigateur.


## Correctif après retour visuel — guide du chiffre 1
- Le précédent ajustement était incorrect : le départ était trop à gauche et la descente trop à droite. Le correctif précédent ne doit pas être considéré comme validé.
- Nouveau placement estimé d'après la capture : départ dans la diagonale visible, arrivée au raccord supérieur, petit déplacement vers l'axe de la hampe, puis descente jusqu'au bas du chiffre.
- L'animation réutilise le même chemin que le guide.
- État : commit effectué; vérification visuelle indispensable avant de considérer ce point comme terminé.


## Changement de méthode : géométrie explicite du chiffre 1
- Les corrections précédentes par pourcentages arbitraires ont échoué et ne sont pas considérées comme validées.
- Le chiffre pâle est maintenant une silhouette SVG explicite, et le guide pointillé ainsi que l'animation utilisent des coordonnées dans le même repère SVG (viewBox 450 × 250).
- Cela élimine la désynchronisation entre un chiffre rendu par police et un chemin codé indépendamment.
- État : correctif poussé; vérification visuelle après actualisation toujours requise. Le modèle SVG est une première géométrie dessinée à la main, à contrôler avant extension aux autres caractères.


## Prototype — sélecteur de thèmes
Un premier sélecteur Garçon, Fille et Mixte a été ajouté au prototype. Le thème Mixte est actif par défaut; les thèmes modifient seulement l'apparence. Les symboles emoji sont temporaires et doivent être remplacés progressivement par des illustrations originales. L'affichage responsive et l'absence de régression restent à vérifier dans un navigateur.


## Prototype — premier sélecteur de chiffres 0 à 9
- Le prototype propose maintenant les dix chiffres et une route initiale spécifique à chacun.
- Le changement de chiffre actualise le titre et le glyphe de guide, efface l'ancien tracé et relance la démonstration.
- **Statut : implémentation commitée, validation en attente.** Les routes doivent être vérifiées visuellement contre les chiffres affichés. La validation demeure heuristique et ne doit pas être considérée comme un outil pédagogique fiable avant amélioration et tests.
- À vérifier : ordinateur et téléphone, sélection de tous les chiffres, changement pendant/après un tracé, bouton de remise à zéro, thèmes, mode Sérénité, démonstration et son facultatif.


## Correctif visuel des chiffres — à vérifier
Les routes de démonstration sont maintenant interpolées pour réduire l'aspect polygonal, et le chiffre-guide est plus visible. Ces changements sont commités sur `main`. **Statut : correction implémentée, pas encore validée visuellement.** Tester en particulier 0, 2, 3, 6, 8 et 9, ainsi que les extrémités des tracés et les courbes après actualisation forcée.


## Ajustement des chemins de traçage — à vérifier
Les chemins du 1 et du 3 ont été recentrés à partir des captures; le lissage est désactivé pour les chiffres angulaires 1, 4 et 7. Commit `e163ac8` sur `main`. Le rendu doit être vérifié dans le navigateur avant de considérer ces routes comme acceptées.


## Ajustement du chiffre 5 — en attente de validation
Le lissage automatique a été désactivé pour le 5 et sa route a été ajustée après les captures utilisateur (commit `896518d`). Les captures indiquent encore que les routes ne sont pas suffisamment centrées sur la ligne médiane du modèle. La prochaine correction doit traiter chaque chiffre individuellement et préserver les coins comme les courbes selon le tracé manuscrit attendu. Aucun statut de validation finale n'est accordé.


## Révision des routes de chiffres — validation en cours
Les routes des chiffres 0, 2, 3 et 6 ont été repositionnées; la route du 1 a une fin verticale ajustée (commit `a6ad474`). Il s'agit d'une nouvelle approximation manuelle basée sur les captures. Le rendu doit être vérifié dans le navigateur après `git pull origin main` et `Ctrl+F5`. La conformité des dix routes reste non validée.


## Nouvelle méthode de traçage — validation visuelle requise
Le modèle visible n'utilise plus un glyphe de police séparé : il est dessiné par un trait large translucide à partir du même chemin que le pointillé. Cela garantit leur alignement géométrique. Commits `93f8868` et `3850645`. **Pas encore validé visuellement** : confirmer que les chiffres ressemblent à des modèles d'écriture adaptés aux enfants, puis raffiner les routes qui en ont besoin.


## Chiffres arrondis — révision en attente de validation
Les chiffres arrondis 0, 2, 3, 6, 8 et 9 ont reçu des routes plus compactes; l'épaisseur du modèle a été réduite (commit `19a8e4c`). Les chiffres angulaires n'ont pas été modifiés dans cette passe. Vérifier après `git pull origin main` et `Ctrl+F5`; aucune validation finale n'est déclarée avant le retour visuel.


## Chiffre 1 — modèle à deux traits implémenté
Le chiffre 1 est désormais défini comme deux gestes distincts : diagonale, puis verticale. Le modèle et le pointillé partagent ces chemins, et la démonstration les anime dans l'ordre sans liaison parasite (commits `cde38eb`, `39f8a4e`). **À valider visuellement et fonctionnellement dans le navigateur** avant de déclarer la modification terminée.
