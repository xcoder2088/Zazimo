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
