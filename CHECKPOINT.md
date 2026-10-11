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
