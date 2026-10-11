# Zazimo — Point de reprise

**Version :** 0.3  
**État :** conception initiale; pas de prototype applicatif vérifié.

## Références
- Dépôt : https://github.com/xcoder2088/Zazimo
- Branche par défaut : main
- État du projet : docs/PROJECT_STATUS.md
- Cahier des charges : SPECIFICATION.md
- Feuille de route : ROADMAP.md

## Décisions confirmées
- Nom de travail : Zazimo; disponibilité de marque et de domaine non vérifiée.
- Public : jeunes enfants en général, avec adaptations possibles.
- Priorité : téléphone et tablette tactiles, puis souris et stylet.
- Plateformes visées : Web, Android, iOS, Windows et Linux.
- Fonctionnement en ligne ET hors ligne.
- Français au lancement, avec structure préparée pour d'autres langues.
- Chiffres de 0 à 5 000, lettres majuscules et minuscules A–Z.
- Tracé guidé et libre, validation tolérante, démonstration et aide.
- Récompenses et défis configurables.
- Modes sensoriels Énergie et Sérénité, personnalisables.
- Fiches individuelles et cahiers imprimables, formats Letter et A4, export PDF.
- Stockage local par défaut; synchronisation éventuelle à définir.
- Distribution gratuite et dons facultatifs envisagés.
- Licence AGPL-3.0 envisagée et présente dans le fichier LICENSE actuel; vérifier la configuration du dépôt avant publication.

## État vérifié dans GitHub
- Le dépôt public est accessible.
- README.md existe.
- docs/PROJECT_STATUS.md a été créé puis relu depuis la branche main.
- Le connecteur permet désormais de créer un fichier et de relire le résultat.
- Ce test confirme un commit par l'API GitHub, mais pas un push depuis un terminal local.
- Aucun prototype applicatif n'est encore déclaré développé ou testé.

## Prochaine action
Créer la première maquette tactile : écran d'accueil, choix « Chiffres », chiffre 1, démonstration, zone de tracé, validation tolérante et récompense. Définir les critères d'acceptation et tester au moins une taille de téléphone et une taille de tablette.

## Règles de travail
- Modifier une fonctionnalité à la fois.
- Définir les critères avant de coder.
- Tester après chaque modification et rechercher les régressions.
- Mettre à jour ROADMAP.md, PROJECT_STATUS.md et ce checkpoint lorsque l'état change.
- Ne pas annoncer une fonctionnalité comme terminée sans preuve de test.
- N'ajouter aucune référence de fournisseur ou d'assistant dans le code, la documentation publique ou les messages de commit.


## Prototype tactile — état actuel
Fichiers présents sur la branche `main` :
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`

Le prototype présente un exercice de tracé du chiffre 1, une interface adaptative, un basculement Énergie/Sérénité simplifié, une action de remise à zéro et un retour de réussite avec son facultatif. Les fichiers ont été créés et relus via GitHub. Ils n'ont pas encore été exécutés dans un navigateur réel. La validation actuelle est expérimentale et doit être améliorée avant toute utilisation pédagogique réelle.

### Prochaine action précise
Tester le prototype en navigateur sur téléphone et tablette, corriger les bogues observés, puis améliorer le moteur de validation et ajouter une aide accessible. Ensuite seulement, valider le parcours et avancer vers les lettres et les défis.


## Dernière modification — guide de traçage
Le guide pointillé a été corrigé dans `prototype/app.js` pour suivre le chiffre 1 : diagonale vers le sommet, puis trait vertical vers le bas. La branche de droite et la petite flèche séparée ont été retirées de `prototype/index.html` et `prototype/styles.css`. Commits enregistrés sur `main`; la validation visuelle locale reste à effectuer après actualisation.


## Dernière modification — démonstration animée
La maquette lance désormais une démonstration du chiffre 1 à l'ouverture : un point monte en diagonale puis descend, en suivant le guide pointillé. Un bouton « Revoir la démonstration » permet de rejouer le geste. Le guide a été recentré sur la ligne médiane du chiffre. Commits sur `main` dans `prototype/index.html`, `prototype/styles.css` et `prototype/app.js`.

**À vérifier ensuite :** actualiser le clone local avec `git pull origin main`, puis contrôler le centrage visuel du pointillé, la démonstration automatique, le bouton de répétition, le tracé tactile et la remise à zéro. Les tests en navigateur et sur appareils ne sont pas encore déclarés réussis.


## Dernier correctif — position du guide
Le chemin du guide et la démonstration partagent la fonction `tracePath()`. Ses coordonnées normalisées ont été ajustées pour faire partir le tracé du bas-gauche de la diagonale, monter jusqu'au sommet, puis descendre au centre de la hampe verticale. Commit sur `main` : `prototype/app.js`. Le résultat doit être vérifié après `git pull origin main` et `Ctrl+F5`.


## Retour utilisateur : le guide est encore mal aligné
Le placement précédent était clairement incorrect (départ trop à gauche, verticale trop à droite). Un nouveau chemin a été poussé dans `prototype/app.js` : départ dans la diagonale visible, montée vers le raccord supérieur, petit raccord vers le centre de la hampe, puis descente. Ne pas considérer la correction comme validée avant nouvelle capture du navigateur.


## Correctif structurel après plusieurs échecs d'alignement
Les coordonnées approximatives indépendantes ont été abandonnées. Le chiffre 1 est maintenant dessiné par une silhouette SVG explicite dans `prototype/index.html`; `prototype/app.js` convertit les points d'un même repère SVG (450 × 250) en coordonnées canvas pour le guide et l'animation. La méthode évite que la police et le chemin de tracé dérivent l'un par rapport à l'autre. Correctif poussé sur `main`; vérification visuelle encore nécessaire. Ne pas annoncer ce point comme validé avant retour utilisateur.


## Nouvelle idée intégrée — thèmes visuels
Le cahier des charges prévoit désormais trois thèmes sélectionnables par l'éducateur : garçon, fille et mixte. Ils doivent différer par l'ambiance, la palette et les illustrations originales, sans modifier les exercices, la difficulté ou les récompenses. Les choix doivent éviter les stéréotypes et rester modifiables à tout moment. La conception et l'implémentation sont encore à faire.


## Étape suivante — premier sélecteur de thèmes
Le prototype inclut maintenant trois boutons de thème : Garçon, Fille et Mixte. Le thème Mixte est sélectionné par défaut. Le choix modifie uniquement la palette visuelle; les exercices ne changent pas. Les emojis sont des repères temporaires, pas les illustrations originales finales.

**À faire avant de déclarer l'étape validée :**
1. Mettre à jour le clone local avec `git pull origin main`.
2. Actualiser le prototype dans le navigateur avec `Ctrl+F5`.
3. Vérifier l'affichage des trois boutons sur ordinateur, téléphone et tablette.
4. Cliquer sur chaque thème et confirmer que la sélection visuelle suit le choix.
5. Vérifier que le mode Sérénité, la démonstration et le tracé fonctionnent encore.

Aucun test navigateur/appareil n'est déclaré réussi à ce stade.


## 2026-10-11 — Sélecteur des chiffres 0 à 9 ajouté
Les fichiers `prototype/index.html`, `prototype/styles.css` et `prototype/app.js` proposent maintenant un sélecteur de 0 à 9. Le chiffre sélectionné met à jour le titre et le guide, relance la démonstration et efface le tracé précédent. Des routes initiales distinctes sont définies pour les dix chiffres. Il s'agit d'une première implémentation, pas d'une validation finale : les routes sont approximatives et doivent être comparées au glyphe dans le navigateur. La logique de vérification reste heuristique et ne doit pas être considérée comme pédagogiquement validée.

**Prochaines vérifications obligatoires :** actualiser le clone avec `git pull origin main`, ouvrir le prototype et tester 0 à 9, la démonstration, le changement de chiffre pendant un tracé, la remise à zéro, les thèmes et le mode Sérénité. Vérifier au moins ordinateur et téléphone. Aucun test navigateur réel n'a été effectué dans cette modification.


## Correctif après captures — chiffres trop anguleux et trop pâles
À partir des captures fournies, les routes segmentées rendaient les chiffres arrondis saccadés et le glyphe pâle était trop peu visible. `prototype/app.js` interpole maintenant les points des routes avec une courbe Catmull–Rom échantillonnée, utilisée par le guide et la démonstration. `prototype/styles.css` augmente le contraste du guide et du glyphe. Commits sur `main`; la vérification dans le navigateur reste obligatoire. Les formes et le contraste doivent être confirmés sur plusieurs chiffres et tailles d'écran.


## 2026-10-11 — Ajustement du centrage et des angles
Les captures montrent que le chemin pointillé du 3 suivait trop le contour externe, et que le 1 formait une boucle au sommet. Les routes du 1 et du 3 ont été déplacées vers la ligne médiane; le lissage automatique est maintenant désactivé pour 1, 4 et 7 afin de garder leurs segments droits et leurs angles. Commit `e163ac8` sur `main`. Le rendu doit être revérifié après `git pull origin main` et `Ctrl+F5`; aucun test navigateur n'est déclaré réussi.


## 2026-10-11 — Retour visuel sur les chiffres 3, 1 et 5
Les dernières captures confirment que le problème est plus profond que le simple lissage : le pointillé ne suit pas toujours la ligne médiane du modèle, et le 5 a des angles qui étaient arrondis par l'interpolation. Commit `896518d` sur `main` : lissage désactivé pour 5 et route du 5 ajustée. La route du 3 reste à valider/corriger; le recentrage du 1 n'est pas encore considéré comme confirmé. Prochaine étape : routes conçues chiffre par chiffre avec segments droits et courbes uniquement là où la forme l'exige. Aucun test navigateur réel n'est déclaré réussi.
