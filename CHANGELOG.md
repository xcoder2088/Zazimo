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
