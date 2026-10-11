# Zazimo — Feuille de route

**Statut global :** conception initiale. Aucun prototype applicatif n'est encore déclaré terminé.

## Étape 0 — Préparer le projet
- [x] Créer le dépôt public.
- [x] Ajouter le README initial.
- [x] Ajouter le document d'état du projet.
- [x] Vérifier qu'un fichier peut être créé directement dans le dépôt et relu.
- [ ] Vérifier la configuration réelle de la licence et du dépôt.
- [ ] Consolider les critères d'acceptation de la première maquette.

## Étape 1 — Maquette tactile
- [ ] Écran d'accueil adaptatif.
- [ ] Navigation enfant simple.
- [ ] Premier exercice : chiffre 1.
- [ ] Démonstration du mouvement.
- [ ] Zone de tracé compatible doigt, stylet et souris.
- [ ] Bouton d'aide et action de recommencer.
- [ ] Première récompense visuelle et sonore facultative.

**Critères d'acceptation :**
- L'interface s'adapte aux petits écrans.
- Le tracé ne fait pas défiler la page pendant le dessin.
- Le son peut être coupé.
- L'exercice est compréhensible sans lire un long texte.
- Les interactions essentielles fonctionnent sans réseau, si le prototype est lancé dans son environnement hors ligne prévu.

## Étape 2 — Moteur de tracé
- [ ] Représentation des parcours de lettres et de nombres.
- [ ] Validation guidée avec tolérance configurable.
- [ ] Gestion des pauses et des gestes hésitants.
- [ ] Aide progressive.
- [ ] Tests tactiles, souris et stylet.

## Étape 3 — Contenu éducatif
- [ ] Chiffres de 0 à 10 pour le premier lot.
- [ ] Alphabet majuscule.
- [ ] Alphabet minuscule.
- [ ] Prononciation française.
- [ ] Étendre progressivement les plages numériques jusqu'à 5 000.

## Étape 4 — Récompenses et défis
- [ ] Récompenses après réussite.
- [ ] Défis de 3, 5 et nombre personnalisé de réussites.
- [ ] Règles de progression après erreur.
- [ ] Paramètres audio et animation.

## Étape 5 — Espace éducateur
- [ ] Accès protégé contre les modifications accidentelles.
- [ ] Configuration des exercices.
- [ ] Configuration des modes sensoriels.
- [ ] Profils locaux et suivi facultatif.

## Étape 6 — Impression
- [ ] Fiche individuelle.
- [ ] Niveaux Découverte, Entraînement et Autonomie.
- [ ] Formats Letter et A4.
- [ ] Export PDF.
- [ ] Cahiers de plusieurs pages.
- [ ] Vérification de l'impression noir et blanc et couleur.

## Étape 7 — Modes sensoriels et identité
- [ ] Mode Énergie.
- [ ] Mode Sérénité.
- [ ] Réglages de contraste, volume, animations et taille.
- [ ] Logo et personnages originaux.

## Étape 8 — Connectivité
- [ ] Valider le lancement hors ligne.
- [ ] Tester une coupure réseau pendant un exercice.
- [ ] Vérifier la persistance locale.
- [ ] Définir les fonctions en ligne facultatives.
- [ ] Étudier séparément toute synchronisation.

## Étape 9 — Distribution
- [ ] Confirmer l'architecture multiplateforme.
- [ ] Tester Web, Android, iOS, Windows et Linux.
- [ ] Préparer instructions d'installation et de mise à jour.
- [ ] Vérifier la licence, les dépendances et les notices.

## Règles de progression
- Ne pas marquer une fonction terminée avant un test réussi.
- Définir les critères d'acceptation avant le développement.
- Tester les fonctionnalités existantes après chaque changement.
- Mettre à jour cette feuille de route après chaque étape acceptée.


## État de l'étape 1 — Maquette tactile
- [x] Créer les premiers fichiers HTML, CSS et JavaScript du prototype.
- [ ] Exécuter le prototype dans un navigateur et vérifier l'absence d'erreurs.
- [ ] Tester sur une taille de téléphone et une taille de tablette.
- [ ] Vérifier les interactions tactiles, souris et stylet.
- [ ] Améliorer la validation du tracé à partir des tests.
- [ ] Valider le mode hors ligne.

Les fichiers existent dans `prototype/`, mais l'étape n'est pas terminée tant que les tests d'exécution et d'appareils n'ont pas réussi.


## Ajustement du guide — en attente de validation visuelle
- [x] Retirer la branche pointillée qui formait une flèche au sommet du chiffre 1.
- [x] Faire suivre le pointillé de la diagonale au segment vertical du chiffre 1.
- [x] Supprimer la petite flèche indépendante sous le chiffre.
- [ ] Actualiser le prototype local et confirmer que le trajet est clair.
- [ ] Vérifier que le tracé et la remise à zéro fonctionnent toujours.


## Mise à jour — démonstration du tracé
- [x] Ajouter une démonstration animée au chargement de l'exercice.
- [x] Ajouter un bouton pour rejouer la démonstration.
- [x] Centrer le guide pointillé sur la ligne médiane du chiffre 1.
- [x] Expliquer le mouvement en mots simples avant de laisser l'enfant essayer.
- [ ] Vérifier visuellement le centrage du pointillé sur le chiffre dans le navigateur.
- [ ] Tester la démonstration sur téléphone/tablette et avec réduction des animations activée.
- [ ] Confirmer que l'interaction tactile et la remise à zéro fonctionnent après la démonstration.


## Ajustement du pointillé — en attente de confirmation visuelle
- [x] Déplacer les coordonnées normalisées du guide pour mieux correspondre au centre du trait visible du chiffre 1.
- [ ] Actualiser le clone local et vérifier l'alignement sur ordinateur.
- [ ] Vérifier le même alignement sur téléphone/tablette et confirmer que la démonstration suit exactement le guide.


## Correction du guide du chiffre 1 — validation en attente
- [x] Revoir le départ de la diagonale et rapprocher la descente de l'axe de la hampe.
- [ ] Contrôler le guide pointillé sur une nouvelle capture avant toute autre modification.
- [ ] Ajuster une dernière fois les coordonnées si nécessaire et tester sur plusieurs tailles d'écran.


## Guide du chiffre 1 — nouvelle approche géométrique
- [x] Remplacer le chiffre rendu par une police par une silhouette SVG explicite.
- [x] Faire calculer le guide pointillé et l'animation dans le même repère géométrique que la silhouette.
- [ ] Vérifier visuellement le centrage sur la capture locale avant de poursuivre.
- [ ] Tester la zone tactile et le redimensionnement.
- [ ] Concevoir ensuite des tracés spécifiques par caractère; ne pas extrapoler une seule forme aux lettres et chiffres.


## Nouvelle exigence — choix du thème visuel
- [x] Ajouter au cahier des charges les trois choix retenus : garçon, fille et mixte.
- [ ] Concevoir les trois ambiances visuelles avec des illustrations originales et une interface inclusive.
- [ ] Ajouter le choix de thème dans les paramètres de l'éducateur.
- [ ] Vérifier que le changement de thème ne modifie ni les exercices, ni la difficulté, ni les récompenses et qu'il peut être effectué à tout moment.
- [ ] Tester l'affichage et la lisibilité de chaque thème sur téléphone, tablette et ordinateur.

Principe : ces thèmes sont des préférences d'apparence uniquement. Aucun contenu éducatif ou capacité n'est associé à un genre.


## Étape suivante — sélecteur de thèmes visuels
- [x] Ajouter un sélecteur Garçon, Fille et Mixte dans le prototype.
- [x] Ajouter une première palette visuelle par thème et des repères décoratifs temporaires.
- [x] Garder les mêmes exercices et règles pédagogiques quel que soit le thème.
- [ ] Vérifier la mise en page du sélecteur sur téléphone, tablette et ordinateur.
- [ ] Remplacer progressivement les emojis temporaires par des illustrations originales.
- [ ] Tester le changement de thème avec le mode Sérénité et pendant/après un tracé.
- [ ] Mettre à jour l'état après validation visuelle.


## Étape — sélection des chiffres 0 à 9 (implémentation initiale)
- [x] Ajouter un sélecteur pour les chiffres 0 à 9.
- [x] Adapter le titre, le chiffre affiché et le chemin de démonstration selon le chiffre choisi.
- [x] Effacer le tracé précédent au changement de chiffre.
- [x] Ajouter une première route dédiée à chaque chiffre.
- [ ] Vérifier visuellement les dix chiffres dans un navigateur réel.
- [ ] Corriger les routes qui ne suivent pas précisément le glyphe affiché.
- [ ] Tester la démonstration, le dessin, la remise à zéro, le son, les thèmes et le mode Sérénité.
- [ ] Améliorer et tester la validation du tracé; la heuristique actuelle n'est pas encore une validation pédagogique fiable.


## Correctif visuel — courbes et contraste des chiffres
- [x] Ajouter une interpolation lissée entre les points des routes de démonstration pour réduire l'effet saccadé des chiffres arrondis.
- [x] Augmenter le contraste du chiffre-guide afin qu'il reste visible sous les pointillés.
- [ ] Vérifier le rendu de 0, 2, 3, 6, 8 et 9 dans le navigateur et ajuster les routes au besoin.
- [ ] Vérifier que le lissage n'introduit pas de dépassement gênant dans les angles ou aux extrémités.


## Ajustement des routes après captures des chiffres 1 et 3
- [x] Recentrer les routes du 1 et du 3 pour viser la ligne médiane du glyphe plutôt que son bord.
- [x] Désactiver le lissage automatique pour les chiffres 1, 4 et 7 afin de préserver leurs segments angulaires.
- [ ] Vérifier les routes sur capture et ajuster encore les points de départ, de jonction et d'arrivée.
- [ ] Étendre la vérification de centrage aux autres chiffres et à plusieurs polices/tailles d'écran.


## Retour de validation visuelle — chiffre 5 et centrage
- [x] Désactiver le lissage automatique du 5 afin de conserver sa barre supérieure et ses changements de direction.
- [x] Ajuster légèrement la route du 5 pour mieux suivre la structure du glyphe.
- [ ] Revoir la géométrie de toutes les routes à partir de la ligne médiane réelle de chaque glyphe, et non d'une approximation générique.
- [ ] Tester chaque chiffre séparément; certains combinent des segments droits et des courbes et ne doivent pas être classés entièrement anguleux ou entièrement arrondis.


## Reprise des lignes médianes — chiffres 0 à 3 et 6
- [x] Repositionner les points de départ et les courbes des chiffres 0, 2, 3 et 6 à partir des captures de démonstration.
- [x] Ajuster la fin de la verticale du 1 pour qu'elle se termine plus près du modèle visible.
- [ ] Revalider chaque chemin après actualisation forcée; les coordonnées restent une première approximation.
- [ ] Comparer les lignes pointillées aux lignes médianes du glyphe sur les captures de 0 à 9, pas uniquement sur 1 à 6.


## Changement de méthode — modèle et guide sur un même chemin
- [x] Supprimer la dépendance visuelle entre un glyphe de police distinct et une route dessinée à la main.
- [x] Afficher le modèle pédagogique comme un trait large translucide et le pointillé exactement sur la même géométrie.
- [ ] Vérifier visuellement les formes et l'épaisseur des dix chiffres dans le navigateur.
- [ ] Affiner les routes elles-mêmes uniquement après cette vérification, chiffre par chiffre.


## Raffinement visuel des chiffres arrondis
- [x] Resserrer l'épaisseur du modèle translucide pour éviter l'aspect trop massif.
- [x] Revoir les routes des chiffres 0, 2, 3, 6, 8 et 9 pour obtenir des boucles plus compactes et régulières.
- [ ] Vérifier visuellement ces six chiffres après actualisation forcée et contrôler que les pointillés restent centrés.
- [ ] Confirmer que le nouveau poids visuel reste lisible sur petit écran et en mode Sérénité.


## Traçage pédagogique du chiffre 1 en deux traits
- [x] Séparer le chiffre 1 en deux traits indépendants : diagonale en premier, verticale en second.
- [x] Afficher le modèle translucide et le pointillé sur ces mêmes deux segments.
- [x] Adapter la démonstration pour suivre les traits dans l'ordre sans relier artificiellement leurs extrémités.
- [ ] Vérifier dans le navigateur que l'animation et le dessin manuel montrent bien les deux gestes distincts.
- [ ] Étendre ensuite le modèle multi-traits aux chiffres qui en ont besoin, avec ordre pédagogique défini.


## Incident de régression — script bloqué
- [x] Supprimer la déclaration `const smooth` en double dans `tracePaths()` qui empêchait le chargement du JavaScript.
- [x] Conserver le modèle du chiffre 1 en deux traits distincts.
- [ ] Après `git pull` et actualisation forcée, vérifier les clics sur les chiffres, la démonstration, recommencer, vérifier le tracé et les thèmes.
- [ ] Ajouter une vérification syntaxique JavaScript avant chaque futur push de modification du prototype.
