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


## Régression d'interactivité — correctif poussé, vérification requise
Une déclaration `const smooth` en double dans `tracePaths()` empêchait le chargement de `prototype/app.js`. Elle a été supprimée dans le commit `6a8c1ba`. Cela devrait rétablir l'exécution du script et les interactions, mais le navigateur doit encore être testé après `git pull origin main` et `Ctrl+F5`. Une validation syntaxique préalable aux prochains changements est désormais une action requise.


## Chiffres arrondis — deuxième passe en attente de retour
Les routes 0, 2, 3, 6, 8 et 9 ont été redessinées pour améliorer leur équilibre et leurs courbes, et l'épaisseur du modèle translucide a été réduite (commit `b3d3455`). Les chiffres angulaires approuvés restent inchangés. Le résultat doit être contrôlé dans le navigateur; ne pas considérer les formes arrondies comme finalisées avant comparaison à la référence Zazimo.


## Chiffres colorés et expressifs — expérimentation à valider
Les chiffres ont maintenant des silhouettes vectorielles colorées, un contour sombre et de petits yeux, inspirés de la référence fournie mais dessinés avec des formes internes. Le chemin pointillé reste séparé et visible au-dessus. Commits `ae4e58a` et `f7852d1`. La qualité des formes et les interactions ne sont pas encore validées dans le navigateur.


## Correctif style des chiffres — à valider
Les silhouettes remplies indépendantes étaient incorrectes et ont été retirées. Le rendu ludique utilise maintenant directement les routes pédagogiques pour le contour et la couleur (commit `98046fc`), ce qui évite la divergence entre silhouette et pointillé. Confirmer le résultat visuel et les interactions dans le navigateur avant validation finale.


## Chiffres épais et animation de réussite — à valider
Le rendu initial est désormais neutre et épais, sans yeux ni couleur vive. Après la réussite de la validation existante, le chiffre se colore et reçoit une animation aléatoire parmi clignement, clin d'œil et petit saut. Commits `e3655cf` et `e6b9621`. Les routes pédagogiques n'ont pas été redessinées dans cette passe. Le contrôle statique a confirmé l'absence de déclaration `smooth` en double et des accolades équilibrées; les tests navigateur et moteur JavaScript restent à faire.


## Validation automatique — code poussé, test navigateur requis
Le code déclenche maintenant `validateTrace()` à la fin d'un geste et efface les points/traits temporaires après réussite avant la célébration (commit `d8d4f3f`). Le bouton manuel est conservé en secours. Les contrôles statiques ont confirmé les liaisons attendues et des accolades équilibrées; aucune validation navigateur n'a été effectuée. La forme des chiffres n'est pas encore conforme à la référence finale Zazimo Épais.


## Validation automatique — correctif de refactorisation
Un fragment résiduel de l'ancien gestionnaire de clic a été retiré dans le commit `c701b07`. Le bloc `validateTrace()` et la fin du fichier ont été relus; la validation syntaxique avec un moteur JavaScript et les tests navigateur restent à effectuer. Ne pas considérer cette modification comme validée en production.


## Réparation urgente — interactions restaurées dans le code
Le bloc de validation avait été accidentellement placé dans le gestionnaire de clic des chiffres, provoquant une erreur de syntaxe. Les commits `7376c24` et `0d7db61` rétablissent la structure des fonctions et vérifient les distances sur toutes les routes. `new Function(appJs)` réussit sur le fichier récupéré après les commits; les handlers de sélection, validation manuelle et validation automatique sont présents. Le rendu et les interactions doivent encore être confirmés dans le navigateur réel.


## Modèle Zazimo Épais — ajustement appliqué
Commit `f8e7c3c` : silhouettes épaissies, yeux/pupilles agrandis, et état coloré de réussite persistant jusqu'au changement de chiffre ou à Recommencer. Contrôle syntaxique JavaScript et vérification statique des états effectués; validation visuelle dans le navigateur à faire.


## Personnages après réussite — mise à jour
Commit `ce249a6` : yeux/pupilles agrandis et positionnés depuis le point supérieur du chiffre; bouche aléatoire sourire/langue tirée; démonstration ralentie à 3,2 secondes. Contrôle syntaxique effectué, rendu visuel à confirmer dans le navigateur.


## Ajustement du visage — appliqué
Commit `3ebea8c` : yeux écartés, traits du visage regroupés autour d'un ancrage commun, bouche animée et clignements/mouvement discrets maintenus tant que le chiffre est en état de réussite. Contrôle de syntaxe effectué; validation visuelle réelle encore requise.


## Bouche du personnage — mise à jour
Commit `b80d3f5` : expressions de bouche redessinées en formes cartoon plus lisibles, sourire avec dents et langue tirée animée. Contrôle de syntaxe effectué; rendu visuel à confirmer dans le navigateur.


## Placement facial et couleurs — mise à jour
Commit `6cda271` : points d'ancrage dédiés aux chiffres 0–9, yeux légèrement plus écartés et couleur aléatoire mémorisée pour chaque chiffre. Contrôle syntaxique effectué; vérification visuelle réelle encore requise.


## Correctif de rendu — 2026-10-11
Commit `5b3c1c0` : correction de la variable de couleur non définie dans le rendu de la célébration. Vérification syntaxique effectuée; validation visuelle navigateur encore à effectuer.


## Couleurs et animations — 2026-10-11
Commit `f2b678b` : les couleurs et combinaisons d’animations varient désormais à chaque réussite. Syntaxe JavaScript vérifiée; contrôle visuel dans le navigateur encore requis.


## Ajustement du visage — 2026-10-11
Commit `7d3d887` : position de bouche adaptée individuellement aux chiffres. Syntaxe JavaScript vérifiée; vérification visuelle navigateur en attente.


## Visage des chiffres — 2026-10-11
Commit `c9ad5d6` : position de bouche définie individuellement pour chaque chiffre et convertie depuis le repère commun du tracé. Syntaxe vérifiée; validation visuelle des dix chiffres encore à faire.


## Correctif du visage — 2026-10-11
Commit `87aeadb` : positions de bouche alignées sur les coordonnées du tracé de chaque chiffre, dans le même repère 450×250. Syntaxe vérifiée; revue visuelle navigateur restant à effectuer.


## Visage — correctif du 2026-10-11
Commit `f7ab154` : yeux sur la partie supérieure du chiffre, bouche immédiatement dessous et ancrée au trait. Syntaxe vérifiée; contrôle visuel navigateur toujours requis.


Correctif supplémentaire `f484350` : bouche rapprochée du trait supérieur et réduite. Syntaxe JavaScript vérifiée, mais confirmation visuelle navigateur encore nécessaire.


Correctif `2e1fdcc` : bouche descendue et élargie pour ne plus toucher les yeux; syntaxe vérifiée. La validation visuelle des dix chiffres reste à effectuer.


Dernier correctif `6d45527` : ancres des yeux et de la bouche calibrées manuellement pour chaque chiffre, sans placement aléatoire. Syntaxe vérifiée; validation visuelle réelle des dix chiffres non encore effectuée.


Dernier changement `55b6244` : couche SVG séparée pour les visages; le Canvas conserve le tracé et la validation. Ancres des yeux et bouches individualisées pour les chiffres 0 à 9. Syntaxe vérifiée; contrôle visuel navigateur encore nécessaire.


Correctif récent `e46d203` : masquage du SVG décoratif qui recouvrait le Canvas et masquait le chemin de guidage. La syntaxe JavaScript passe; validation visuelle dans le navigateur encore requise.


Dernière modification : commits `2b6fb20` et `8842e2f`. Trois animations de réussite aléatoires (rebond, balancement, pulsation) appliquent une transformation partagée au chiffre Canvas et au visage SVG. L’animation CSS autonome du visage a été retirée. La syntaxe JavaScript a été vérifiée; aucun test navigateur n’a encore été exécuté. Les fonctions de tracé et de validation n’ont pas été remplacées.


Correctif le plus récent — commit `0f71423` : les yeux et la bouche sont maintenant dessinés directement dans le Canvas du chiffre. Le visage et le chiffre partagent la même transformation, ce qui évite le décalage inhérent à deux couches animées séparément. Syntaxe JavaScript vérifiée et fonctions de tracé/validation présentes. Prochaine vérification : test visuel des chiffres 0 à 9 dans le navigateur.


Correctif `9f35fe7` : la cause du visage qui flottait en haut à gauche a été identifiée : les ancres du visage utilisaient des coordonnées fixes alors que le chiffre était mis à l’échelle selon la taille du canevas. Les ancres sont maintenant transformées dans le même repère responsive, et le centre des animations suit les dimensions réelles. Syntaxe JavaScript vérifiée. Le placement visuel doit encore être confirmé dans le navigateur sur les chiffres 0 à 9; aucune validation visuelle n’est revendiquée.


## Extension des nombres — implémentée, validation en attente
Le prototype inclut maintenant un champ pour saisir un nombre de 1 à 4 chiffres et compose ses routes dans le canevas. Le chiffre 5 reçoit un échantillonnage d'interpolation plus dense. Commits `8f3dab8`, `911c36c`, `735cd50`. Les tests réels de démonstration, validation, placement du visage et rendu multi-chiffres doivent encore être exécutés; cette fonctionnalité n'est pas déclarée validée.


## Mise à jour — sélecteur et nombres composés
Le prototype propose maintenant les nombres de 0 à 100 dans le sélecteur. Le champ personnalisé reste disponible jusqu’à quatre chiffres. Après réussite, les chiffres d’un nombre composé sont colorés et animés individuellement, avec des couleurs et mouvements choisis aléatoirement par chiffre. Tests visuels réels encore requis avant de déclarer cette évolution validée.


## Ajustement du sélecteur
La grille de 101 nombres a été remplacée par un carrousel compact avec flèches précédent/suivant, nombre courant visible et limites de 0 à 100. La saisie personnalisée reste en place. Validation visuelle dans le navigateur encore requise.

## Visibilité du glyphe — correction partielle
Le chiffre complet est désormais affiché en gris neutre avant la réussite, et le visage reste masqué avant validation. La validation indépendante et l'animation individuelle des chiffres composés restent à implémenter et tester; cette étape n'est pas considérée comme terminée.

## Validation individuelle des nombres composés
Le prototype suit maintenant la réussite caractère par caractère : seuls les chiffres tracés correctement passent en couleur et s'animent; leurs pointillés disparaissent individuellement. La saisie personnalisée met à jour l'aperçu en direct. Le lissage des routes est déterminé par le chiffre concerné, même au sein d'un nombre composé. La syntaxe JavaScript a été vérifiée avant le push; les tests interactifs dans le navigateur restent nécessaires.

## Sélecteur de nombres et formes composées
Le sélecteur présente maintenant dix nombres sélectionnables et se décale d'une position par clic sur une flèche (1–10, puis 2–11, etc.). Une saisie manuelle entre 1 et 100 recentre la plage. Les nombres à quatre chiffres utilisent une épaisseur et une échelle ajustées, et la route du 5 a été affinée. La syntaxe JavaScript est vérifiée; les essais dans le navigateur local restent à faire.

## Proportions des chiffres composés
L'épaisseur du contour et du remplissage est désormais proportionnelle à l'échelle géométrique du chiffre dans un nombre composé, afin que le chiffre 5 conserve une silhouette cohérente avec son affichage seul. Syntaxe vérifiée; essai visuel réel encore nécessaire.
\n\n## Lettres majuscules — première intégration\nLe mode Lettres permet de choisir A à Z et réutilise le moteur de dessin, la démonstration et la validation. Les tracés constituent une première base technique et doivent être contrôlés visuellement et pédagogiquement dans le navigateur avant d’être considérés comme validés.\n

## Ajustement du visage des lettres
Les positions des yeux et de la bouche sont désormais définies explicitement pour chaque lettre A–Z dans `prototype/app.js`. Cette correction n'est pas encore confirmée par un essai visuel navigateur; les lettres doivent être vérifiées individuellement avant validation.


## Correction du guide pointillé des lettres
Le rendu du guide prend maintenant en compte tous les traits définis pour chaque lettre. Le défaut visible sur A et B provenait du découpage du guide, qui n'affichait qu'un trait. Le contrôle visuel complet des 26 lettres reste à effectuer dans le navigateur.


## Ajustement de la forme des lettres
Le moteur conserve désormais les segments géométriques des lettres au lieu d'appliquer un lissage uniforme, source de barres courbées et de formes déformées. Le visage de A–F est repositionné avec les yeux sur le haut et la bouche dans la zone colorée. Une inspection navigateur des 26 lettres reste nécessaire.


Correction ciblée : B et D ne passent plus par le lissage spline qui déformait leur géométrie. La vérification visuelle complète de A–Z reste à faire.


Le moteur de guides lisse maintenant les parcours des lettres à courbes, notamment D et J, et préserve les segments des lettres géométriques. La validation visuelle complète de A à Z reste à effectuer.
