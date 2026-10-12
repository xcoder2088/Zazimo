# Historique des modifications

## 2026-10-11 — Préparation initiale
- Création du dépôt GitHub public.
- Ajout du README initial.
- Ajout de docs/PROJECT_STATUS.md.
- Vérification de la création et de la relecture d'un fichier via GitHub.
- Ajout du cahier des charges, de la feuille de route et du point de reprise.
- Aucun prototype applicatif inclus dans cette étape.


## 2026-10-11 — Première maquette tactile
- Ajout du prototype du chiffre 1 dans `prototype/`.
- Ajout d'une interface responsive et de commandes tactiles/pointeur.
- Ajout d'un retour de réussite expérimental et d'un son facultatif.
- Tests en navigateur et sur appareils encore à réaliser.


## 2026-10-11 — Correction du guide de traçage
- Le chemin pointillé du chiffre 1 suit désormais la diagonale et le trait vertical.
- Suppression de la branche visuelle en forme de flèche et de la flèche séparée sous le chiffre.
- Vérification visuelle après actualisation encore requise.


## 2026-10-11 — Démonstration guidée
- Ajout d'une animation initiale montrant le trajet du chiffre 1.
- Ajout d'un bouton pour rejouer la démonstration.
- Recentrement du guide pointillé sur la ligne médiane du chiffre.
- Ajout de consignes simples avant le premier essai.
- Tests visuels et tactiles encore à réaliser.


## 2026-10-11 — Ajustement du guide du chiffre 1
- Repositionnement des coordonnées du guide pointillé et de son animation pour mieux suivre le centre du glyphe.
- Validation visuelle encore requise dans le navigateur.


## 2026-10-11 — Nouvelle correction du guide du chiffre 1
- Repositionnement du départ et de la descente du chemin pointillé à partir de la capture utilisateur.
- Validation visuelle en attente; la correction précédente avait été rejetée.


## 2026-10-11 — Guide géométrique partagé
- Remplacement du chiffre 1 en police par une silhouette SVG explicite.
- Le guide pointillé et la démonstration partagent le même repère géométrique.
- Validation visuelle à effectuer avant extension aux autres caractères.


## 2026-10-11 — Spécification des thèmes visuels
- Ajout des choix garçon, fille, mixte et neutre dans les paramètres prévus de l'éducateur.
- Précision : le thème ne change pas le contenu pédagogique et ne doit pas imposer de stéréotypes.
- Fonctionnalité documentée, mais pas encore implémentée.


## 2026-10-11 — Premier sélecteur de thèmes
- Ajout des choix Garçon, Fille et Mixte au prototype.
- Ajout d'une palette de couleurs propre à chaque choix.
- Le thème Mixte est sélectionné par défaut.
- Les symboles décoratifs sont temporaires; les illustrations originales restent à créer.
- Tests visuels et fonctionnels encore requis.


## 2026-10-11 — Sélection des chiffres 0 à 9
- Ajout d'un sélecteur interactif de 0 à 9.
- Le titre, le glyphe de guide et la démonstration changent selon le chiffre sélectionné.
- Le tracé et le message de récompense sont réinitialisés lors d'un changement de chiffre.
- Ajout de routes de démonstration distinctes, à contrôler et ajuster visuellement.
- La validation du tracé reste expérimentale; aucun test en navigateur réel n'est déclaré réussi.


## 2026-10-11 — Lissage des chiffres et amélioration du contraste
- Ajout d'une interpolation des routes pour adoucir les chiffres arrondis et la démonstration.
- Renforcement de la visibilité du chiffre-guide.
- Contrôle visuel après actualisation encore requis; aucun test navigateur n'est déclaré réussi.


## 2026-10-11 — Correction du centrage des chiffres
- Repositionnement des routes de démonstration des chiffres 1 et 3 vers le centre des traits.
- Conservation des segments angulaires pour 1, 4 et 7 au lieu de les arrondir automatiquement.
- Contrôle visuel après actualisation encore requis.


## 2026-10-11 — Ajustement du chiffre 5
- Désactivation du lissage automatique pour le 5 afin de préserver ses angles et sa barre supérieure.
- Ajustement de sa route de démonstration; contrôle visuel encore requis.


## 2026-10-11 — Révision des routes 0, 1, 2, 3 et 6
- Ajustement des lignes médianes et des points de départ/fin pour mieux suivre les modèles.
- Aucun test navigateur réel n'est déclaré réussi; validation visuelle utilisateur requise.


## 2026-10-11 — Modèle et pointillé unifiés
- Le modèle translucide et le guide pointillé sont désormais rendus à partir du même chemin, éliminant le décalage entre la police et les routes manuelles.
- Contrôle de forme, d'épaisseur et de lisibilité des dix chiffres encore requis.


## 2026-10-11 — Raffinement des chiffres arrondis
- Modèle de traçage légèrement aminci.
- Routes 0, 2, 3, 6, 8 et 9 resserrées et régularisées.
- Validation visuelle après actualisation requise.


## 2026-10-11 — Démonstration du chiffre 1 en deux traits
- Séparation du chiffre 1 en un trait diagonal puis un trait vertical.
- Guide pointillé, modèle et démonstration utilisent les deux traits indépendants dans l'ordre.
- Validation dans le navigateur encore requise.


## 2026-10-11 — Correctif d'urgence : prototype non interactif
- Suppression d'une déclaration `const smooth` en double qui bloquait l'exécution de `app.js`.
- Vérification des interactions dans le navigateur encore requise après mise à jour locale.


## 2026-10-11 — Raffinement esthétique des chiffres arrondis
- Proportions retravaillées pour 0, 2, 3, 6, 8 et 9.
- Épaisseur du modèle réduite pour un rendu moins massif.
- Validation visuelle requise avant acceptation.


## 2026-10-11 — Chiffres ludiques (expérimental)
- Ajout de formes vectorielles colorées avec contour et yeux expressifs.
- Suppression du large trait translucide qui masquait les nouvelles couleurs; le pointillé précis reste visible au-dessus.
- Vérification visuelle et fonctionnelle encore requise.


## 2026-10-11 — Alignement du style ludique avec le tracé
- Suppression des silhouettes décoratives indépendantes qui ne correspondaient pas au chemin de traçage.
- Couleur et contour appliqués aux routes centrales afin de préserver leur alignement.
- Test visuel navigateur encore requis.


## 2026-10-11 — Chiffres épais et célébration après réussite
- Modèle neutre épaissi avant réussite, sans yeux ni couleur vive.
- Après validation réussie, le chiffre prend sa couleur et les yeux apparaissent avec une animation aléatoire (clignement, clin d'œil ou petit saut).
- La célébration s'arrête au changement de chiffre ou au début d'un nouvel essai.
- Vérification visuelle dans le navigateur requise.


## 2026-10-11 — Validation automatique du tracé
- La validation se déclenche automatiquement à la fin du geste de traçage.
- Le tracé temporaire est effacé après réussite avant la célébration.
- Le bouton de vérification reste disponible comme secours.
- La forme finale des chiffres reste à harmoniser avec la référence Zazimo Épais.


## Correctif — gestionnaire de validation
- Suppression d'un fragment résiduel de l'ancien gestionnaire après extraction de `validateTrace()` (commit `c701b07`).
- Test moteur JavaScript et test navigateur encore requis.


## 2026-10-11 — Restauration des interactions
- Réparation de la structure JavaScript qui empêchait le démarrage correct des interactions.
- Rétablissement des clics de sélection des chiffres et des deux voies de validation.
- Vérification de syntaxe JavaScript réussie après récupération du fichier depuis GitHub.


## 2026-10-11 — Silhouettes plus épaisses et état final persistant
- Augmentation de l'épaisseur du chiffre neutre et agrandissement des yeux/pupilles après réussite.
- L'état de réussite reste visible jusqu'au changement de chiffre ou à Recommencer.


## 2026-10-11 — Expressions des chiffres et animation plus lente
- Visage plus grand et ancré au chiffre, avec sourire ou langue tirée choisi aléatoirement après réussite.
- Démonstration du tracé ralentie à 3,2 secondes, sauf si le système demande de réduire les animations.


## 2026-10-11 — Visage animé
- Espacement accru entre les yeux et alignement de la bouche sous ceux-ci.
- Animation continue et discrète des clignements, du sourire ou de la langue tirée pendant l'état de réussite.


## 2026-10-11 — Amélioration des expressions
- Bouche cartoon plus lisible, sourire avec dents et variante langue tirée animée.


## 2026-10-11 — Visage et couleurs
- Position du visage adaptée à chaque chiffre, yeux un peu plus espacés.
- Couleur vive aléatoire conservée par chiffre pendant la sélection.


## 2026-10-11 — Correctif
- Correction d'une référence de couleur non définie qui empêchait le rendu de la célébration après réussite.


## 2026-10-11 — Récompenses variées
- Couleur aléatoire à chaque réussite, avec prévention de répétition immédiate.
- Combinaisons d’animations choisies aléatoirement.


## 2026-10-11 — Visage des chiffres
- Ajustement de la position et de la largeur de la bouche selon la forme du chiffre.


## 2026-10-11 — Alignement des bouches
- Coordonnées de bouche personnalisées pour chaque chiffre afin de mieux suivre la forme du tracé.


## 2026-10-11 — Bouche attachée au chiffre
- Repositionnement individuel des bouches sur la ligne centrale des chiffres 0 à 9; bouche réduite pour limiter les débordements.


## 2026-10-11 — Visage aligné sur le haut du chiffre
- Repositionnement des yeux et des bouches pour former un visage cohérent sur le trait supérieur des chiffres 0 à 9.


## 2026-10-11 — Bouche sur le trait
- Ajustement des coordonnées de bouche et réduction de sa hauteur pour mieux la garder dans la silhouette des chiffres.


## 2026-10-11 — Espacement du visage
- Séparation verticale accrue entre les yeux et la bouche des chiffres animés.


## 2026-10-11 — Visages des chiffres
- Repositionnement manuel, chiffre par chiffre, des yeux sur le haut du contour et des bouches sur la surface colorée.


## 2026-10-11 — Visages vectoriels
- Déplacement du rendu des visages dans une couche SVG séparée afin de faciliter le positionnement indépendant des yeux et de la bouche.

- Correctif : le SVG décoratif ne recouvre plus le Canvas de traçage; le chemin pointillé est visible à travers le rendu Canvas.

## 2026-10-11 — Animations synchronisées
- Ajout de trois animations de réussite aléatoires : rebond, balancement et pulsation.
- Synchronisation de la transformation des yeux et de la bouche avec celle du chiffre.
- Suppression de l’animation CSS indépendante du visage pour éviter les mouvements désynchronisés.
- Syntaxe vérifiée; test visuel navigateur à effectuer.


## 2026-10-11 — Visage lié au chiffre dans le Canvas
- Déplacement du dessin des yeux, pupilles, reflets et bouche dans le même Canvas que le chiffre.
- Le visage reçoit exactement la même transformation Canvas que le chiffre pendant les animations de rebond, balancement et pulsation.
- Suppression de la dépendance à une couche SVG distincte pour l’animation du visage.
- Syntaxe JavaScript vérifiée; validation visuelle navigateur encore requise.


## 2026-10-11 — Alignement responsive du visage
- Correction de la conversion des ancres manuelles des yeux et de la bouche depuis le viewBox 450×250 vers les dimensions réelles du canevas.
- Correction du centre de rotation/pulsation pour utiliser le centre réel du canevas plutôt que des coordonnées fixes.
- Le visage reste dessiné dans le même Canvas et reçoit la même transformation que le chiffre.
- Vérification syntaxique JavaScript réussie; test visuel navigateur encore requis.


## 2026-10-12 — nombres personnalisés et courbe du 5
- Ajout d'un champ de saisie pour choisir un nombre de 1 à 4 chiffres.
- Les routes de chaque chiffre sont composées dans la zone de traçage et réduites selon la longueur du nombre.
- Interpolation plus fine pour le chiffre 5.
- Vérification visuelle et tests de régression encore requis.


## Prototype — nombres jusqu’à 100 et caractères indépendants
- Ajout des choix 0 à 100 dans le sélecteur.
- Animation de chaque chiffre séparément pour les nombres composés, avec couleurs aléatoires stables par caractère après réussite.
- Correction du repérage du visage pour le calculer dans les coordonnées du chiffre correspondant.
- Cette évolution est poussée sur la branche principale; la validation visuelle dans le navigateur reste à effectuer.


## Sélecteur de nombres — correction de présentation
- Remplacement de la liste de 101 boutons par un carrousel compact avec flèches gauche/droite.
- Affichage du nombre courant et désactivation des flèches aux limites 0 et 100.
- Le champ de saisie personnalisée est conservé.

## Glyphe visible avant réussite
- Les chiffres restent visibles en gris neutre avant la validation au lieu de laisser uniquement le chemin pointillé.
- Le visage est masqué tant que la réussite n'a pas été validée.
- La validation et l'animation par caractère pour les nombres composés restent à compléter.
