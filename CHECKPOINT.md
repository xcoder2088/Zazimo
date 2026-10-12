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


## 2026-10-11 — Nouvelle révision des lignes médianes
Après les captures des chiffres 6, 3, 2 et 1, les routes des chiffres 0, 2, 3 et 6 ont été redessinées avec des points de départ et des courbes plus proches du centre des traits; la verticale du 1 a été raccourcie pour mieux correspondre au modèle. Commit `a6ad474` sur `main`. Les coordonnées sont toujours manuelles et nécessitent une nouvelle vérification dans le navigateur. Ne pas déclarer le traçage validé avant comparaison visuelle des dix chiffres.


## 2026-10-11 — Changement de méthode pour corriger le décalage
Les captures montraient que le glyphe plein provenait d'une police tandis que le pointillé suivait une route manuelle différente. Au lieu de continuer à ajuster deux géométries séparées, le modèle visible est maintenant dessiné comme un trait large translucide et le guide pointillé est superposé exactement sur le même chemin. Modifications `prototype/app.js` et `prototype/styles.css`, commits `93f8868` et `3850645`. Cette méthode garantit l'alignement modèle/pointillé, mais la forme pédagogique de chaque route et son apparence doivent encore être validées dans le navigateur. Faire `git pull origin main`, puis `Ctrl+F5`.


## 2026-10-11 — Raffinement des chiffres arrondis
Les chiffres angulaires ayant été jugés satisfaisants, le travail porte maintenant sur les formes arrondies. Commit `19a8e4c` : épaisseur du modèle réduite de 28–40 px à 24–32 px selon la largeur du canevas; routes 0, 2, 3, 6, 8 et 9 resserrées et ajustées pour des boucles plus régulières. Les changements sont commités sur `main`; la confirmation visuelle dans le navigateur reste à faire.


## 2026-10-11 — Chiffre 1 en deux traits distincts
À partir de la référence fournie, le chiffre 1 doit être appris en deux gestes : d'abord la diagonale, puis la verticale. `prototype/app.js` représente désormais le 1 comme deux routes distinctes; le modèle translucide et le pointillé sont dessinés séparément sur chaque route, et l'animation avance séquentiellement sans tracer de liaison entre les traits. Commits `cde38eb` et `39f8a4e`. À valider dans le navigateur après `git pull origin main` et `Ctrl+F5`; aucun test réel n'a été exécuté ici.


## 2026-10-11 — Régression JavaScript corrigée
L'application était devenue non interactive parce que `prototype/app.js` contenait deux déclarations `const smooth = [];` consécutives dans `tracePaths()`, causant une erreur de syntaxe au chargement du script. Correction poussée dans le commit `6a8c1ba`. Le défaut explique l'écran statique et l'inactivité des boutons. Les interactions doivent être revérifiées dans le navigateur après `git pull origin main` et `Ctrl+F5`; aucune validation navigateur n'a été effectuée ici. Ajouter une vérification de syntaxe avant les prochains changements.


## 2026-10-11 — Deuxième passe esthétique des chiffres arrondis
Après le rétablissement de l'interactivité, la capture confirme que le tracé fonctionne, mais les formes arrondies restent trop basiques. Commit `b3d3455` : nouvelles proportions des routes 0, 2, 3, 6, 8 et 9, et épaisseur du modèle réduite à 22–28 px selon la largeur du canevas. Les chiffres angulaires ne sont pas modifiés. Validation visuelle dans le navigateur encore nécessaire; cette passe n'est pas déclarée finale.


## 2026-10-11 — Première expérimentation de chiffres ludiques
À la demande de l'utilisateur, ajout d'une direction artistique inspirée de chiffres colorés et expressifs : formes remplies, contour foncé et petits yeux, en utilisant des tracés vectoriels internes originaux. La ligne médiane pointillée reste dessinée par-dessus et les routes pédagogiques existantes sont conservées. Commits `ae4e58a` et `f7852d1`. Cette version est expérimentale : le rendu visuel et les interactions doivent être vérifiés dans le navigateur après `git pull origin main` et `Ctrl+F5`.


## 2026-10-11 — Correction des silhouettes décoratives déformées
Le retour visuel a révélé que les formes remplies séparées des routes de traçage déformaient les chiffres 1 et 2. Commit `98046fc` : suppression de ces silhouettes indépendantes; le contour sombre et la couleur sont désormais appliqués directement sur les routes centrales existantes, puis le pointillé est rendu par-dessus. La validation visuelle dans le navigateur reste requise.


## 2026-10-11 — Chiffres épais neutres et récompense aléatoire
Choix utilisateur : chiffres de style épais, sans yeux ni couleur vive avant réussite; après réussite, couleur et animation choisie aléatoirement (clignement, clin d'œil ou petit saut). Commit `e3655cf` ajoute cet état de rendu et l'animation; commit `e6b9621` arrête la célébration au début d'un nouvel essai. Les routes centrales existantes et la validation n'ont pas été volontairement remplacées. Contrôles statiques : pas de déclaration `smooth` en double, accolades équilibrées, gestionnaires pointer et click présents. **Pas de test navigateur ni de vérification réelle de syntaxe par moteur JS effectués ici**; valider après `git pull origin main` et `Ctrl+F5`.


## 2026-10-11 — Validation automatique et effacement du tracé réussi
Commit `d8d4f3f` : extraction de la validation dans `validateTrace()`, déclenchée automatiquement à la fin d'un geste lorsque suffisamment de points ont été tracés. En cas de réussite, les points et traits temporaires sont effacés avant l'animation du chiffre; le bouton de vérification reste disponible en secours. Contrôles statiques : fonction de validation présente, liaison automatique présente, bouton de secours présent, accolades équilibrées, aucune déclaration `smooth` en double. Test navigateur non effectué. Les silhouettes ne correspondent toujours pas exactement à la référence visuelle et restent à concevoir proprement.


## Correctif de suivi — nettoyage du gestionnaire de validation
Après refactorisation pour la validation automatique, un fragment de l'ancien gestionnaire est resté par erreur dans le fichier. Il a été supprimé dans le commit `c701b07`. Le fichier a été relu autour de `validateTrace()` et à sa fin; un contrôle syntaxique par moteur JavaScript et un test navigateur restent nécessaires.


## 2026-10-11 — Restauration des commandes après écran vide
Le défaut était localisé dans `prototype/app.js` : la fonction `validateTrace()` avait été accidentellement imbriquée dans le gestionnaire de clic des chiffres, ce qui cassait la syntaxe du fichier. Commit `7376c24` : fonctions de validation et de sélection des chiffres séparées, gestionnaire de clic rétabli. Commit `0d7db61` : validation de proximité étendue à toutes les routes actives. Contrôle effectué après récupération depuis GitHub avec `new Function(appJs)` : **syntaxe JavaScript valide**; gestionnaire de sélection, validation manuelle et validation automatique présents; accolades équilibrées. Le test visuel dans le navigateur de l'utilisateur reste à faire.


## 2026-10-11 — Ajustement visuel Zazimo Épais et réussite persistante
Commit `f8e7c3c` : largeur du trait de silhouette augmentée, yeux et pupilles agrandis. Ajout de `successState` pour que la silhouette colorée et les yeux restent affichés après la fin de l'animation; réinitialisation au changement de chiffre et au bouton Recommencer, conformément à la demande. Contrôle de syntaxe JavaScript après récupération du fichier et vérification des conditions de persistance effectués; contrôle navigateur visuel encore nécessaire.


## 2026-10-11 — Visage mieux ancré et démonstration ralentie
Commit `ce249a6` : les yeux se placent maintenant à partir du point le plus haut des routes du chiffre, sont plus grands, et une bouche aléatoire (sourire ou langue tirée) apparaît après réussite. Démonstration ralentie à 3,2 secondes, en conservant le respect du réglage système de mouvement réduit. Syntaxe JavaScript vérifiée; validation visuelle navigateur encore requise.


## 2026-10-11 — Visage mieux aligné et animé
Commit `3ebea8c` : yeux davantage espacés; yeux et bouche sont positionnés depuis un ancrage commun pour former un visage cohérent. Sourire et langue tirée ont maintenant une ouverture animée; clignements et léger mouvement continuent tant que la réussite est affichée. L'animation s'arrête quand l'état de réussite est réinitialisé. Syntaxe JavaScript vérifiée; rendu visuel à confirmer dans le navigateur.


## 2026-10-11 — Bouche cartoon revue
Commit `b80d3f5` : la bouche est maintenant plus large et construite comme une vraie forme remplie. Le sourire montre des dents; l'expression langue tirée a une cavité sombre, des dents et une langue rose animée. Syntaxe JavaScript vérifiée; validation visuelle navigateur encore nécessaire.


## 2026-10-11 — Ancrage facial par chiffre et couleurs aléatoires
Commit `6cda271` : le visage utilise maintenant des ancrages spécifiques pour chaque chiffre de 0 à 9, pour éviter les bouches qui semblent flotter ou tomber hors de la forme. Les yeux sont un peu plus écartés. Chaque chiffre reçoit une couleur vive aléatoire, conservée tant qu'il reste sélectionné. Syntaxe JavaScript vérifiée; validation visuelle navigateur encore nécessaire.


## 2026-10-11 — Correctif urgent de célébration
Commit `5b3c1c0` : la célébration utilisait une variable `characterColor` non définie. Cela déclenchait une erreur au moment de dessiner le chiffre coloré et son visage. La ligne utilise maintenant `characterColorFor(selectedDigit)`. Syntaxe JavaScript vérifiée; contrôle visuel navigateur encore nécessaire.


## 2026-10-11 — Couleurs et animations aléatoires
Commit `f2b678b` : la couleur du personnage est maintenant choisie à chaque réussite et ne répète pas immédiatement la précédente. Les animations tirent au hasard un clignement, un clin d’œil, un saut ou une combinaison; le choix de bouche souriante/langue reste aléatoire. Syntaxe JavaScript vérifiée; validation visuelle navigateur en attente.


## 2026-10-11 — Position de la bouche
Commit `7d3d887` : la bouche utilise maintenant des décalages spécifiques selon le chiffre, au lieu d'une position identique pour tous. Sa largeur est légèrement réduite. Syntaxe vérifiée; validation visuelle navigateur encore nécessaire.


## 2026-10-11 — Bouche ancrée par chiffre
Commit `c9ad5d6` : les coordonnées de bouche sont maintenant définies individuellement pour les chiffres 0 à 9 et transformées depuis le repère commun 450×250, plutôt que calculées uniquement sous les yeux. Syntaxe vérifiée; contrôle visuel des dix chiffres toujours requis.


## 2026-10-11 — Correction de position des bouches
Commit `87aeadb` : les bouches utilisent désormais des points situés sur la ligne centrale de chaque chiffre (repère 450×250 partagé avec le tracé), au lieu de positions approximatives sous les yeux. Taille de bouche réduite. Syntaxe JavaScript vérifiée; aucune validation visuelle navigateur n'est revendiquée.


## 2026-10-11 — Repositionnement du visage
Commit `f7ab154` : yeux repositionnés sur le haut de chaque chiffre et bouche placée immédiatement dessous, en utilisant des coordonnées propres à chaque chiffre. Syntaxe JavaScript vérifiée. Validation visuelle navigateur non effectuée.


## 2026-10-11 — Ajustement précis de la bouche
Commit `f484350` : coordonnées de bouche rapprochées du trait supérieur et bouche réduite pour éviter qu'elle tombe dans les espaces intérieurs. Syntaxe vérifiée; test visuel navigateur non effectué.


## 2026-10-11 — Espacement du visage
Commit `2e1fdcc` : bouche déplacée plus bas et légèrement élargie pour éviter le chevauchement avec les yeux. Coordonnées individualisées par chiffre. Syntaxe vérifiée; contrôle visuel navigateur non effectué.


## 2026-10-11 — Recalibrage manuel des visages
Commit `6d45527` : les coordonnées des yeux et des bouches sont définies séparément et individuellement pour chaque chiffre; les yeux sont remontés vers le contour supérieur et les bouches sont replacées plus bas dans le corps coloré. Syntaxe vérifiée. Validation visuelle navigateur toujours requise.


## 2026-10-11 — Visages en SVG
Commit `55b6244` : les yeux et la bouche sont désormais dessinés dans une couche SVG indépendante du Canvas de traçage. Les positions restent manuelles par chiffre. Syntaxe JavaScript validée; test visuel navigateur non effectué.


## Correctif d’affichage — 2026-10-11
Commit CSS `e46d203` : masquage du SVG décoratif `.guide`, qui recouvrait le Canvas et pouvait cacher le chemin pointillé. Le Canvas reste responsable du chiffre et du chemin; la couche SVG du visage reste au-dessus pour l’état de réussite. Syntaxe JavaScript revérifiée; test navigateur non effectué.


## Synchronisation de l’animation du visage — 2026-10-11
Commit `ee7e36c` : le groupe SVG contenant les yeux et la bouche reçoit maintenant le même décalage vertical que le chiffre pendant le rebond de célébration. Vérification de syntaxe JavaScript réussie; test visuel navigateur encore nécessaire.

## Animations synchronisées — 2026-10-11
Commits `2b6fb20` et `8842e2f` : trois animations de réussite sont choisies aléatoirement (rebond, balancement, pulsation). La transformation géométrique est appliquée au chiffre Canvas et au visage SVG pour qu’ils bougent ensemble. L’animation CSS indépendante du visage a été retirée pour éviter les conflits. Syntaxe JavaScript vérifiée; test navigateur non effectué. Le tracé, la validation et le masquage du pointillé après réussite ont été conservés.


## Correctif de synchronisation robuste — 2026-10-11
Commit `0f71423` : le visage n’est plus rendu dans une couche SVG séparée. Les yeux, les pupilles et la bouche sont dessinés dans le même Canvas que le chiffre, à l’intérieur de la transformation déjà appliquée au chiffre. Cela supprime la cause structurelle des décalages entre couches. Syntaxe JavaScript vérifiée; les fonctions de tracé et de validation sont conservées. Il reste à vérifier visuellement les ancres de chaque chiffre dans le navigateur.


## Correction du visage décalé — 2026-10-11
Commit `9f35fe7` : cause identifiée dans la capture/vidéo : les routes du chiffre étaient adaptées à la taille réelle du canevas, mais les ancres des yeux et de la bouche restaient dans le repère fixe 450×250. Conversion responsive ajoutée pour dessiner le visage dans le même repère que le chiffre, et centre des animations calculé à partir des dimensions réelles du canevas. Syntaxe JavaScript vérifiée. Le test visuel dans le navigateur reste à faire; ne pas déclarer le défaut visuellement résolu avant cette vérification.
