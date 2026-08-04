# Document d'Exigences

## Introduction

Ce document définit les exigences fonctionnelles et non fonctionnelles du portail web institutionnel officiel de la Mairie de Pita (Commune Urbaine de Pita, Guinée). La plateforme vise à renforcer la transparence administrative, à rapprocher l'institution de ses citoyens (résidents et diaspora) et à valoriser le dynamisme de la commune à travers une interface moderne, ergonomique et accessible.

Le projet est développé avec Next.js 16, React 19 et Tailwind CSS v4. L'identité visuelle repose sur les teintes institutionnelles : vert foncé, blanc et touches dorées/jaunes, en cohérence avec l'emblème national et local.

---

## Glossaire

- **Portail** : L'application web institutionnelle officielle de la Mairie de Pita accessible via un navigateur.
- **Visiteur** : Tout utilisateur non authentifié qui consulte le Portail (résident, membre de la diaspora, partenaire, journaliste, etc.).
- **Agent** : Employé de la Mairie de Pita disposant d'un accès au panneau d'administration du Portail.
- **Administrateur** : Agent disposant des droits les plus élevés dans le panneau d'administration.
- **Top_Bar** : La barre d'informations pratiques affichée en haut de chaque page du Portail.
- **Navbar** : La barre de navigation principale contenant le logo, le slogan et les rubriques du Portail.
- **Hero** : La section bannière principale de la page d'accueil présentant un visuel immersif et un message fort.
- **Barre_Acces_Rapide** : La section de la page d'accueil présentant des icônes interactives vers les services clés.
- **Mot_du_Maire** : Le bloc éditorial de la page d'accueil contenant la photo officielle et le message du Maire.
- **Carrousel** : Le composant d'affichage rotatif des actualités majeures dans la section "À la Une".
- **CMS** : Système de Gestion de Contenu (Content Management System) headless permettant aux Agents de publier du contenu de manière autonome.
- **Actualite** : Article publié par un Agent via le CMS, associé à une catégorie, une date et un titre.
- **Document_Officiel** : Fichier (PDF, Word, etc.) mis à disposition des Visiteurs via la rubrique Transparence.
- **Appel_Offre** : Avis d'appel d'offres publié par un Agent et consultable par les Visiteurs.
- **Newsletter** : Service d'abonnement par e-mail permettant aux Visiteurs de recevoir les actualités de la Mairie.
- **Footer** : Le pied de page complet affiché en bas de chaque page du Portail.
- **Formulaire_Contact** : Le formulaire de prise de contact rapide intégré au Footer et à la page Contact.
- **SEO** : Optimisation pour les moteurs de recherche (Search Engine Optimization).
- **ARIA** : Accessible Rich Internet Applications — standard d'accessibilité web.
- **SSR** : Server-Side Rendering — rendu côté serveur via Next.js.
- **SSG** : Static Site Generation — génération de pages statiques via Next.js.

---

## Requirements

### Requirement 1 : Top Bar et Informations Pratiques

**User Story:** En tant que Visiteur, je veux accéder immédiatement aux coordonnées de la Mairie et aux liens vers les réseaux sociaux, afin de pouvoir contacter l'institution ou la suivre sur les plateformes sociales sans chercher dans les pages internes.

#### Acceptance Criteria

1. THE Portail SHALL afficher une Top_Bar en haut de chaque page contenant le numéro de téléphone (+224 123 45 67 89), l'adresse e-mail officielle (contact@mairiepita.gov.gn) et les horaires d'ouverture (Lundi - Vendredi : 08h00 - 17h00).
2. THE Top_Bar SHALL afficher des liens vers les profils officiels de la Mairie sur Facebook, Twitter, YouTube et Instagram, chacun s'ouvrant dans un nouvel onglet.
3. WHILE la largeur d'écran est inférieure à 640px, THE Top_Bar SHALL masquer les informations secondaires et n'afficher que les icônes des réseaux sociaux pour préserver la lisibilité sur mobile.
4. IF le lien d'un réseau social n'est pas renseigné, THEN THE Top_Bar SHALL masquer l'icône correspondante sans laisser d'espace vide.
5. THE Top_Bar SHALL afficher les coordonnées avec des attributs ARIA appropriés pour garantir l'accessibilité aux lecteurs d'écran.

---

### Requirement 2 : Navbar et Navigation Principale

**User Story:** En tant que Visiteur, je veux naviguer facilement entre les rubriques du Portail depuis n'importe quel appareil, afin de trouver rapidement l'information recherchée.

#### Acceptance Criteria

1. THE Navbar SHALL afficher le logo officiel de la Mairie de Pita avec le blason et le slogan "Travail - Solidarité - Développement".
2. THE Navbar SHALL contenir les rubriques : Accueil, La Commune, Conseil Communal, Actualités, Services, Transparence, Contact.
3. WHEN un Visiteur clique sur une rubrique de la Navbar, THE Portail SHALL naviguer vers la page correspondante sans rechargement complet de la page.
4. WHILE la largeur d'écran est inférieure à 768px, THE Navbar SHALL remplacer le menu horizontal par un menu hamburger déployable.
5. WHEN un Visiteur ouvre le menu hamburger, THE Navbar SHALL afficher toutes les rubriques dans un panneau vertical accessible.
6. WHILE le Visiteur fait défiler la page vers le bas, THE Navbar SHALL rester visible en position fixe en haut de l'écran avec un fond opaque.
7. THE Navbar SHALL indiquer visuellement la rubrique active correspondant à la page courante.
8. THE Navbar SHALL être navigable au clavier avec une navigation par tabulation conforme aux standards ARIA.

---

### Requirement 3 : Section Héro (Bannière Principale)

**User Story:** En tant que Visiteur, je veux être accueilli par une bannière visuellement impactante sur la page d'accueil, afin de comprendre immédiatement l'identité et les valeurs de la commune.

#### Acceptance Criteria

1. THE Hero SHALL afficher un visuel plein-écran représentant une vue emblématique de la ville de Pita avec un overlay semi-transparent aux couleurs institutionnelles.
2. THE Hero SHALL afficher le message principal "Ensemble, construisons le Pita de demain" avec une typographie épurée et lisible sur le visuel.
3. THE Hero SHALL afficher un bouton CTA intitulé "Découvrir la commune" renvoyant vers la page La Commune.
4. WHEN un Visiteur clique sur le bouton CTA du Hero, THE Portail SHALL naviguer vers la page La Commune.
5. WHILE la largeur d'écran est inférieure à 768px, THE Hero SHALL adapter la taille du texte et du bouton CTA pour rester lisible et accessible sur mobile.
6. THE Hero SHALL charger le visuel principal via le composant next/image de Next.js avec la priorité de chargement activée pour optimiser le LCP (Largest Contentful Paint).

---

### Requirement 4 : Barre d'Accès Rapide aux Services Clés

**User Story:** En tant que Visiteur, je veux accéder en un clic aux sections les plus utilisées du Portail depuis la page d'accueil, afin de gagner du temps et d'atteindre directement l'information dont j'ai besoin.

#### Acceptance Criteria

1. THE Barre_Acces_Rapide SHALL afficher cinq entrées interactives : Services aux citoyens, Appels d'offres, Communiqués officiels, Documents à télécharger et Événements à venir.
2. THE Portail SHALL afficher chaque entrée de la Barre_Acces_Rapide avec une icône distincte, un libellé court et un lien vers la section concernée.
3. WHEN un Visiteur clique sur une entrée de la Barre_Acces_Rapide, THE Portail SHALL naviguer vers la page ou la section correspondante.
4. WHILE la largeur d'écran est inférieure à 640px, THE Barre_Acces_Rapide SHALL passer d'un affichage horizontal à une grille de deux colonnes.
5. THE Barre_Acces_Rapide SHALL appliquer un effet de survol visuel sur chaque entrée pour indiquer son caractère cliquable.

---

### Requirement 5 : Bloc Mot du Maire

**User Story:** En tant que Visiteur, je veux lire un message de bienvenue personnalisé du Maire sur la page d'accueil, afin de percevoir l'engagement humain et politique de l'institution envers ses citoyens.

#### Acceptance Criteria

1. THE Mot_du_Maire SHALL afficher la photo officielle du Maire, son message de bienvenue et la signature Le Maire.
2. THE Agent SHALL pouvoir mettre à jour le texte du message et la photo du Maire via le CMS sans modifier le code source.
3. WHILE la largeur d'écran est inférieure à 768px, THE Mot_du_Maire SHALL afficher la photo au-dessus du texte en pleine largeur.
4. THE Mot_du_Maire SHALL utiliser des attributs alt descriptifs pour la photo du Maire afin de garantir l'accessibilité aux technologies d'assistance.

---

### Requirement 6 : Carrousel À la Une

**User Story:** En tant que Visiteur, je veux parcourir les actualités majeures de la commune dans un carrousel dynamique sur la page d'accueil, afin d'être informé des événements importants sans naviguer vers la page Actualités.

#### Acceptance Criteria

1. THE Carrousel SHALL afficher les Actualites marquées comme À la Une par un Agent dans le CMS, avec leur titre, une image de couverture, une étiquette thématique et leur date de publication.
2. WHEN un Visiteur clique sur un article du Carrousel, THE Portail SHALL naviguer vers la page de détail de l'Actualite correspondante.
3. THE Carrousel SHALL proposer des contrôles de navigation (précédent/suivant) et des indicateurs de position accessibles au clavier.
4. THE Carrousel SHALL défiler automatiquement toutes les 5 secondes lorsqu'aucune interaction Visiteur n'est en cours.
5. WHEN un Visiteur interagit avec le Carrousel (survol ou clic sur contrôle), THE Carrousel SHALL suspendre le défilement automatique pour la durée de l'interaction.
6. IF aucune Actualite n'est marquée À la Une, THEN THE Portail SHALL afficher les trois dernières Actualites publiées à la place.
7. THE Carrousel SHALL fournir des attributs ARIA (aria-live, aria-label) pour informer les lecteurs d'écran des changements de contenu.

---

### Requirement 7 : Grille des Actualités Récentes

**User Story:** En tant que Visiteur, je veux consulter les dernières actualités classées par catégorie sur la page d'accueil, afin de filtrer rapidement les informations qui m'intéressent.

#### Acceptance Criteria

1. THE Portail SHALL afficher une grille présentant les quatre Actualites les plus récentes publiées dans le CMS.
2. THE Portail SHALL associer à chaque Actualite une étiquette de catégorie colorée parmi : Conseil communal, Environnement, Éducation, Eau et Assainissement.
3. WHEN un Visiteur clique sur une Actualite de la grille, THE Portail SHALL naviguer vers la page de détail de l'Actualite correspondante.
4. THE Portail SHALL afficher un bouton Voir toutes les actualités sous la grille renvoyant vers la page Actualités.
5. WHILE la largeur d'écran est inférieure à 768px, THE Portail SHALL passer la grille à une colonne unique.
6. WHILE la largeur d'écran est comprise entre 768px et 1024px, THE Portail SHALL passer la grille à deux colonnes.
7. THE Agent SHALL pouvoir créer, modifier et supprimer des Actualites et leurs catégories via le CMS sans modifier le code source.

---

### Requirement 8 : Page Actualités et Page de Détail d'un Article

**User Story:** En tant que Visiteur, je veux consulter la liste complète des actualités et lire le détail d'un article, afin d'être pleinement informé des activités et décisions de la commune.

#### Acceptance Criteria

1. THE Portail SHALL afficher une page dédiée listant toutes les Actualites publiées, triées par date décroissante.
2. THE Portail SHALL permettre au Visiteur de filtrer les Actualites par catégorie sur la page Actualités.
3. WHEN un Visiteur sélectionne une catégorie, THE Portail SHALL afficher uniquement les Actualites appartenant à cette catégorie.
4. THE Portail SHALL afficher une page de détail pour chaque Actualite contenant son titre, son image de couverture, sa date, sa catégorie, son contenu complet et un lien retour vers la liste.
5. THE Portail SHALL générer les pages de détail des Actualites en SSG pour optimiser les performances et le SEO.
6. IF une Actualite n'existe pas ou a été supprimée, THEN THE Portail SHALL rediriger le Visiteur vers une page 404 personnalisée aux couleurs de la Mairie.

---

### Requirement 9 : Services aux Citoyens

**User Story:** En tant que Visiteur, je veux connaître les services proposés par la Mairie et les démarches à effectuer, afin de réaliser mes formalités administratives efficacement.

#### Acceptance Criteria

1. THE Portail SHALL afficher une page Services listant les services communaux : État civil, Urbanisme, Recette communale, Déchets et salubrité, Eau et assainissement.
2. THE Portail SHALL afficher pour chaque service une description claire des démarches à effectuer, des pièces à fournir et des horaires spécifiques si applicables.
3. THE Agent SHALL pouvoir mettre à jour les informations de chaque service via le CMS sans modifier le code source.

---

### Requirement 10 : Transparence, Documents Officiels et Appels d'Offres

**User Story:** En tant que Visiteur, je veux consulter et télécharger les documents officiels et les appels d'offres publiés par la Mairie, afin d'exercer mon droit d'accès à l'information publique.

#### Acceptance Criteria

1. THE Portail SHALL afficher une page Transparence listant les Document_Officiel disponibles au téléchargement, classés par type : Budget communal, Délibérations, Règlements.
2. THE Portail SHALL afficher une section dédiée aux Appel_Offre sur la page Transparence, avec pour chaque avis : l'intitulé, la date de publication, la date limite de soumission et le Document_Officiel associé.
3. WHEN un Visiteur clique sur un Document_Officiel, THE Portail SHALL déclencher le téléchargement du fichier ou l'ouvrir dans un nouvel onglet du navigateur.
4. THE Agent SHALL pouvoir publier, modifier et retirer des Document_Officiel et des Appel_Offre via le CMS sans modifier le code source.
5. WHEN un Agent publie un Appel_Offre dans le CMS, THE Portail SHALL afficher l'avis sur la page Transparence dans un délai maximal de 5 minutes.
6. IF la date limite de soumission d'un Appel_Offre est dépassée, THEN THE Portail SHALL afficher l'avis avec un marqueur visuel Clôturé et désactiver le téléchargement du document associé.

---

### Requirement 11 : Footer Complet

**User Story:** En tant que Visiteur, je veux trouver dans le pied de page toutes les informations institutionnelles, les liens utiles et les moyens de contact, afin d'accéder facilement aux ressources et de contacter la Mairie depuis n'importe quelle page.

#### Acceptance Criteria

1. THE Footer SHALL afficher l'adresse physique de la Mairie (Rue Administrative, Quartier Daremagnan, Commune Urbaine de Pita) avec un lien vers une carte interactive.
2. THE Footer SHALL afficher les horaires détaillés : Lundi-Vendredi 08h00 - 17h00 et Samedi 08h00 - 12h00.
3. THE Footer SHALL afficher les Liens Utiles : État civil, Urbanisme, Recette communale, Déchets et salubrité, Eau et assainissement, Budget communal, Délibérations, Règlements.
4. THE Footer SHALL afficher des liens vers les pages Mentions Légales et Politique de confidentialité.
5. THE Footer SHALL afficher le Formulaire_Contact et le formulaire d'inscription à la Newsletter dans des colonnes distinctes.
6. WHILE la largeur d'écran est inférieure à 768px, THE Footer SHALL passer de quatre colonnes à une colonne unique empilée.
7. THE Footer SHALL afficher une bande finale contenant la mention de copyright avec l'année en cours et le libellé Mairie de Pita — Tous droits réservés.

---

### Requirement 12 : Formulaire de Contact et Newsletter

**User Story:** En tant que Visiteur, je veux envoyer un message à la Mairie et m'abonner à la newsletter directement depuis le Footer, afin de communiquer avec l'institution et rester informé des actualités sans visiter le Portail régulièrement.

#### Acceptance Criteria

1. THE Formulaire_Contact SHALL collecter le nom complet, l'adresse e-mail, l'objet et le message du Visiteur.
2. WHEN un Visiteur soumet le Formulaire_Contact avec des données valides, THE Portail SHALL envoyer le message vers l'adresse contact@mairiepita.gov.gn et afficher un message de confirmation au Visiteur.
3. IF un Visiteur soumet le Formulaire_Contact avec des champs obligatoires manquants ou un e-mail invalide, THEN THE Portail SHALL afficher un message d'erreur explicite à côté du champ concerné sans effacer les données saisies.
4. THE Portail SHALL afficher un champ de saisie d'e-mail et un bouton S'abonner pour l'inscription à la Newsletter.
5. WHEN un Visiteur soumet une adresse e-mail valide pour la Newsletter, THE Portail SHALL enregistrer l'adresse et afficher un message de confirmation.
6. IF un Visiteur soumet une adresse e-mail déjà enregistrée pour la Newsletter, THEN THE Portail SHALL afficher un message informant le Visiteur qu'il est déjà abonné sans créer de doublon.
7. IF un Visiteur soumet une adresse e-mail invalide pour la Newsletter, THEN THE Portail SHALL afficher un message d'erreur explicite.
8. THE Formulaire_Contact SHALL protéger contre les soumissions automatisées via un mécanisme de protection de type honeypot ou rate limiting.

---

### Requirement 13 : Page Contact

**User Story:** En tant que Visiteur, je veux accéder à une page dédiée au contact avec toutes les informations pour joindre la Mairie, afin de choisir le moyen de communication qui me convient le mieux.

#### Acceptance Criteria

1. THE Portail SHALL afficher une page Contact avec le numéro de téléphone, l'adresse e-mail, l'adresse physique et une carte interactive intégrée.
2. THE Portail SHALL afficher un formulaire de contact complet sur la page Contact avec les mêmes règles de validation que le Formulaire_Contact du Footer.
3. THE Portail SHALL afficher les horaires d'ouverture de la Mairie sur la page Contact.

---

### Requirement 14 : Performance, SEO et Accessibilité

**User Story:** En tant que Visiteur, je veux que le Portail se charge rapidement, soit référencé sur les moteurs de recherche et soit utilisable quelle que soit ma situation de handicap ou mon débit de connexion, afin de bénéficier d'une expérience de qualité.

#### Acceptance Criteria

1. THE Portail SHALL générer les pages statiques ou semi-statiques en SSG ou SSR via Next.js pour minimiser le temps de chargement perçu.
2. THE Portail SHALL obtenir un score Lighthouse supérieur ou égal à 90 dans les catégories Performance, Accessibilité et SEO sur la page d'accueil.
3. THE Portail SHALL définir des balises méta (title, description, Open Graph) pour chaque page pour permettre un partage correct sur les réseaux sociaux.
4. THE Portail SHALL charger toutes les images via le composant next/image de Next.js avec des attributs alt descriptifs et des formats modernes (WebP ou AVIF).
5. THE Portail SHALL être navigable entièrement au clavier avec un indicateur de focus visible conforme aux standards WCAG 2.1 niveau AA.
6. THE Portail SHALL afficher les contenus en français avec l'attribut lang défini à fr sur la balise HTML.
7. WHILE la largeur d'écran est inférieure à 640px, THE Portail SHALL afficher tous les composants dans une mise en page mobile sans débordement horizontal.

---

### Requirement 15 : Panneau d'Administration (CMS)

**User Story:** En tant qu'Agent, je veux gérer de manière autonome le contenu du Portail (actualités, documents, appels d'offres) via un panneau d'administration, afin de publier des informations sans avoir besoin de compétences techniques en développement.

#### Acceptance Criteria

1. THE CMS SHALL permettre à un Agent authentifié de créer, modifier, publier et supprimer des Actualites avec les champs : titre, contenu, catégorie, image de couverture, date de publication et statut À la Une.
2. THE CMS SHALL permettre à un Agent authentifié de créer, modifier, publier et supprimer des Document_Officiel avec les champs : titre, type, fichier et date de publication.
3. THE CMS SHALL permettre à un Agent authentifié de créer, modifier, publier et supprimer des Appel_Offre avec les champs : intitulé, description, date de publication, date limite de soumission et Document_Officiel associé.
4. THE CMS SHALL restreindre l'accès au panneau d'administration aux seuls Agents disposant de credentials valides.
5. IF un Agent tente de se connecter au CMS avec des credentials invalides, THEN THE CMS SHALL refuser l'accès et afficher un message d'erreur sans révéler lequel des deux champs (identifiant ou mot de passe) est incorrect.
6. THE Administrateur SHALL pouvoir gérer les comptes Agents (création, modification des droits, désactivation) via le CMS.
7. THE CMS SHALL fournir une interface en français accessible depuis un navigateur standard sans installation locale requise.

---

### Requirement 16 : Identité Visuelle et Charte Graphique

**User Story:** En tant que Visiteur, je veux que le Portail reflète fidèlement l'identité institutionnelle de la Mairie de Pita, afin de reconnaître immédiatement l'authenticité et le sérieux de la plateforme.

#### Acceptance Criteria

1. THE Portail SHALL appliquer la palette de couleurs institutionnelle : vert foncé (#1a5632) comme couleur primaire, blanc (#ffffff) comme couleur secondaire, et doré (#c9a227) comme couleur d'accent sur les éléments importants (boutons CTA, étiquettes, séparateurs).
2. THE Portail SHALL utiliser une typographie épurée avec une police sans-serif principale pour les corps de texte et une police adaptée aux titres institutionnels.
3. THE Portail SHALL afficher le logo officiel (blason + texte MAIRIE DE PITA) dans la Navbar et le Footer sur toutes les pages.
4. THE Portail SHALL maintenir une structure aérée avec des espacements généreux et une densité d'information équilibrée pour faciliter la lecture.
5. THE Portail SHALL appliquer des bordures arrondies et des ombres douces sur les cartes et boutons pour un rendu moderne.
