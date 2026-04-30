import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      "nav": {
        "home": "Accueil",
        "about": "À propos",
        "contact": "Contact",
        "explore": "Explorer",
        "press": "Relation Presse",
        "fact-checking": "Fact Checking",
        "collaboration": "Collaboration"
      },
      "hero": {
        "title": "L'info brute, certifiée.",
        "subtitle": "Informations vérifiées et exclusives de nos correspondants locaux.",
        "commitment": "L'information, notre engagement.",
        "strength": "Les journalistes, notre force.",
        "propose": "Proposez",
        "buy": "Achetez",
        "order": "Commandez"
      },
      "marketplace": {
        "title": "Marché des Médias",
        "subtitle": "Contenus Disponibles",
        "description": "Parcourez les derniers reportages exclusifs, interviews et vidéos brutes disponibles à l'achat immédiat."
      },
      "auth": {
        "login": "Connexion",
        "signup": "S'inscrire",
        "welcome": "Bienvenue",
        "staff": "Staff",
        "media": "Média",
        "correspondant": "Correspondant",
        "name": "Nom & Prénom",
        "media_name": "Nom du Média / Organisation",
        "email": "Identifiant (Email)",
        "password": "Mot de passe",
        "country": "Pays",
        "city": "Ville",
        "find_country": "Rechercher un pays...",
        "select_city": "Sélectionner une ville",
        "access": "Accéder",
        "agree": "J'accepte les Termes & Conditions",
        "not_staff": "Désolé, l'inscription Staff n'est pas autorisée via ce formulaire."
      },
      "common": {
        "all": "Tout",
        "search": "Rechercher...",
        "back": "Retour",
        "view_all": "Tout voir",
        "validated": "Validé",
        "pending": "En cours de validation",
        "price": "Prix",
        "date": "Date",
        "category": "Catégorie",
        "author": "Auteur",
        "duration": "Durée",
        "subscribe": "S'abonner",
        "message": "Envoyer un message",
        "view_profile": "Voir le profil",
        "details": "Détails",
        "categories": {
          "Experts": "Experts",
          "Médias": "Médias",
          "Organisations": "Organisations",
          "Particuliers": "Particuliers"
        }
      },
      "sections": {
        "feed_title": "DERNIÈRES PUBLICATIONS",
        "feed_subtitle": "Le Flux d'Info",
        "info": "NOS SECTIONS D'INFORMATION",
        "latest": "DERNIÈRES PUBLICATIONS",
        "video": "L'ACTU EN IMAGES",
        "profiles": "NOS TYPES DE PROFILS"
      },
      "dashboard": {
        "admin": {
          "title": "Administration Centrale",
          "subtitle": "Gestion plateforme & Sécurité",
          "pending": "En attente",
          "logout": "Déconnexion",
          "stats": {
            "media": "Médias actifs",
            "journalists": "Journalistes",
            "revenue": "CA Total",
            "security": "Score Sécurité"
          },
          "tabs": {
            "moderation": "Modération",
            "payments": "Paiements",
            "system": "Système",
            "users": "Utilisateurs"
          },
          "moderation": {
            "title": "Contenus en attente",
            "empty": "Tout est à jour ! Aucune publication en attente.",
            "validate": "Valider",
            "reject": "Rejeter"
          }
        },
        "media": {
          "title": "Espace Média",
          "welcome": "Bonjour,",
          "stats": {
            "reports": "Reportages achetés",
            "balance": "Solde disponible",
            "orders": "Commandes en cours",
            "network": "Journalistes suivis"
          },
          "tabs": {
            "inventory": "Mes Licences",
            "orders": "Mes Commandes",
            "suggest": "Suggestions"
          }
        },
        "correspondant": {
          "title": "Espace Journaliste",
          "new_report": "Nouveau Reportage",
          "logout": "Déconnexion",
          "stats": {
            "articles": "Articles",
            "followers": "Followers",
            "balance": "Solde actuel",
            "pending_gain": "Gain en attente"
          },
          "tabs": {
            "overview": "Surveillance",
            "create": "Rédaction",
            "archives": "Mes Archives",
            "network": "Mon Réseau"
          },
          "overview": {
            "tracking": "Suivi des publications",
            "last_30_days": "30 derniers jours",
            "interactions": "Dernières interactions"
          },
          "wallet": {
            "title": "Retrait de Gains",
            "available": "Disponible",
            "next_payout": "Prochain virement automatique :",
            "request_withdrawal": "Demander un virement"
          },
          "missions": {
            "title": "Mission en cours",
            "remaining": "restants"
          }
        }
      },
      "footer": {
        "desc": "Une plateforme dédiée à la centralisation de l'information utile. Curation intelligente pour un monde complexe.",
        "platform": "Plateforme",
        "company": "Compagnie",
        "rights": "Tous droits réservés. Designé avec passion."
      },
      "order": {
        "title": "Commander un Reportage",
        "subtitle": "Commandes Médias",
        "success_title": "Commande Envoyée !",
        "success_desc": "Votre demande de reportage a été transmise à notre équipe. Une copie vous a été envoyée par email.",
        "company": "Nom Entreprise",
        "manager": "Responsable Projet",
        "project_title": "Titre du Projet",
        "budget": "Budget Estimé (€)",
        "deadline": "Deadline de Livraison",
        "details": "Détails de la mission",
        "attach": "Joindre des documents",
        "attach_desc": "PDF, DOCX (Cahier des charges...)",
        "cancel": "Annuler",
        "submit": "Envoyer la commande",
        "home": "Retour à l'accueil"
      },
      "chat": {
        "expert": "Expert IA",
        "online": "En ligne",
        "placeholder": "Posez votre question en français...",
        "loading": "L'expert réfléchit...",
        "error": "Une erreur est survenue lors de la communication avec l'expert. Veuillez réessayer.",
        "welcome": "Bienvenue ! En tant qu'expert sur CollectInfos, je suis là pour répondre à toutes vos questions en français. Comment puis-je vous aider aujourd'hui ?",
        "system": "Tu es un expert journaliste sur la plateforme CollectInfos. Tu réponds TOUJOURS en français, même si on te sollicite dans une autre langue. Ton but est d'aider les utilisateurs à naviguer sur la plateforme ou à obtenir des informations certifiées. Ne sors jamais de ton rôle d'expert en journalisme."
      },
      "payment": {
        "title": "Paiement par Virement",
        "amount": "Montant à régler",
        "ref": "Référence obligatoire",
        "desc": "Veuillez effectuer le virement bancaire sous 48h. Votre licence sera activée dès confirmation de notre service financier.",
        "holder": "Titulaire du compte",
        "warning": "* Note: Toute commande non réglée sous 72h sera automatiquement annulée. La TVA est incluse dans le prix affiché.",
        "confirm": "Confirmer l'ordre de virement"
      },
      "product": {
        "diffusion": "Droit de diffusion TV inclus",
        "raw": "Fichiers RAW disponibles",
        "lifetime": "Licence à vie",
        "total": "Prix Total",
        "buy": "ACHETEZ LA LICENCE ET PAYER PAR VIREMENT BANCAIRE"
      },
      "newsletter": {
        "title1": "RESTEZ À LA POINTE",
        "title2": "DE L'INFO",
        "description": "Rejoignez notre réseau exclusif et recevez les reportages les plus pertinents directement.",
        "placeholder": "Votre email professionnel",
        "button": "S'abonner"
      },
      "cta": {
        "title1": "PRÊT À RÉVOLUTIONNER",
        "title2": "VOTRE RÉDACTION ?",
        "description": "Rejoignez la première plateforme de mise en relation directe entre journalistes de terrain et médias internationaux.",
        "button_primary": "Lancer l'expérience",
        "button_secondary": "En savoir plus"
      }
    }
  },
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "about": "About",
        "contact": "Contact",
        "explore": "Explore",
        "press": "Press Relations",
        "fact-checking": "Fact Checking",
        "collaboration": "Collaboration"
      },
      "hero": {
        "title": "Raw, certified info.",
        "subtitle": "Verified and exclusive information from our local correspondents.",
        "commitment": "Information, our commitment.",
        "strength": "Journalists, our strength.",
        "propose": "Submit",
        "buy": "Buy",
        "order": "Order"
      },
      "marketplace": {
        "title": "Media Marketplace",
        "subtitle": "Available Content",
        "description": "Browse the latest exclusive reports, interviews, and raw videos available for immediate purchase."
      },
      "auth": {
        "login": "Login",
        "signup": "Sign Up",
        "welcome": "Welcome",
        "staff": "Staff",
        "media": "Media",
        "correspondant": "Correspondent",
        "name": "Full Name",
        "media_name": "Media/Organization Name",
        "email": "ID (Email)",
        "password": "Password",
        "country": "Country",
        "city": "City",
        "find_country": "Search for a country...",
        "select_city": "Select a city",
        "access": "Access",
        "agree": "I agree to the Terms & Conditions",
        "not_staff": "Sorry, Staff registration is not allowed via this form."
      },
      "common": {
        "all": "All",
        "search": "Search...",
        "back": "Back",
        "view_all": "View all",
        "validated": "Validated",
        "pending": "Pending validation",
        "price": "Price",
        "date": "Date",
        "category": "Category",
        "author": "Author",
        "duration": "Duration",
        "subscribe": "Subscribe",
        "message": "Send message",
        "view_profile": "View profile",
        "details": "Details",
        "categories": {
          "Experts": "Experts",
          "Médias": "Media",
          "Organisations": "Organizations",
          "Particuliers": "Individuals"
        }
      },
      "sections": {
        "feed_title": "LATEST PUBLICATIONS",
        "feed_subtitle": "The News Feed",
        "info": "OUR INFORMATION SECTIONS",
        "latest": "LATEST PUBLICATIONS",
        "video": "NEWS IN IMAGES",
        "profiles": "OUR PROFILE TYPES"
      },
      "dashboard": {
        "admin": {
          "title": "Central Administration",
          "subtitle": "Platform Management & Security",
          "pending": "Pending",
          "logout": "Logout",
          "stats": {
            "media": "Active Media",
            "journalists": "Journalists",
            "revenue": "Total Revenue",
            "security": "Security Score"
          },
          "tabs": {
            "moderation": "Moderation",
            "payments": "Payments",
            "system": "System",
            "users": "Users"
          },
          "moderation": {
            "title": "Pending Content",
            "empty": "Everything is up to date! No pending publications.",
            "validate": "Validate",
            "reject": "Reject"
          }
        },
        "media": {
          "title": "Media Space",
          "welcome": "Hello,",
          "stats": {
            "reports": "Purchased Reports",
            "balance": "Available Balance",
            "orders": "Ongoing Orders",
            "network": "Followed Journalists"
          },
          "tabs": {
            "inventory": "My Licenses",
            "orders": "My Orders",
            "suggest": "Suggestions"
          }
        },
        "correspondant": {
          "title": "Journalist Space",
          "new_report": "New Report",
          "logout": "Logout",
          "stats": {
            "articles": "Articles",
            "followers": "Followers",
            "balance": "Current Balance",
            "pending_gain": "Pending Gain"
          },
          "tabs": {
            "overview": "Monitoring",
            "create": "Writing",
            "archives": "My Archives",
            "network": "My Network"
          },
          "overview": {
            "tracking": "Publication Tracking",
            "last_30_days": "Last 30 days",
            "interactions": "Latest interactions"
          },
          "wallet": {
            "title": "Earnings Withdrawal",
            "available": "Available",
            "next_payout": "Next automatic transfer:",
            "request_withdrawal": "Request transfer"
          },
          "missions": {
            "title": "Current Mission",
            "remaining": "remaining"
          }
        }
      },
      "footer": {
        "desc": "A platform dedicated to centralizing useful information. Intelligent curation for a complex world.",
        "platform": "Platform",
        "company": "Company",
        "rights": "All rights reserved. Designed with passion."
      },
      "order": {
        "title": "Order a Report",
        "subtitle": "Media Orders",
        "success_title": "Order Sent!",
        "success_desc": "Your report request has been transmitted to our team. A copy has been sent to you by email.",
        "company": "Company Name",
        "manager": "Project Manager",
        "project_title": "Project Title",
        "budget": "Estimated Budget (€)",
        "deadline": "Delivery Deadline",
        "details": "Mission details",
        "attach": "Attach documents",
        "attach_desc": "PDF, DOCX (Specifications...)",
        "cancel": "Cancel",
        "submit": "Send order",
        "home": "Back to Home"
      },
      "chat": {
        "expert": "AI Expert",
        "online": "Online",
        "placeholder": "Posez votre question en français...",
        "loading": "L'expert réfléchit...",
        "error": "Une erreur est survenue lors de la communication avec l'expert. Veuillez réessayer.",
        "welcome": "Bienvenue ! En tant qu'expert sur CollectInfos, je suis là pour répondre à toutes vos questions en français. Comment puis-je vous aider aujourd'hui ?",
        "system": "Tu es un expert journaliste sur la plateforme CollectInfos. Tu réponds TOUJOURS en français, même si on te sollicite dans une autre langue. Ton but est d'aider les utilisateurs à naviguer sur la plateforme ou à obtenir des informations certifiées. Ne sors jamais de ton rôle d'expert en journalisme."
      },
      "payment": {
        "title": "Bank Transfer Payment",
        "amount": "Amount to pay",
        "ref": "Mandatory reference",
        "desc": "Please make the bank transfer within 48 hours. Your license will be activated upon confirmation from our financial department.",
        "holder": "Account Holder",
        "warning": "* Note: Any order not paid within 72 hours will be automatically cancelled. VAT is included in the shown price.",
        "confirm": "Confirm transfer order"
      },
      "product": {
        "diffusion": "TV broadcast rights included",
        "raw": "RAW files available",
        "lifetime": "Lifetime license",
        "total": "Total Price",
        "buy": "BUY LICENSE AND PAY BY BANK TRANSFER"
      },
      "newsletter": {
        "title1": "STAY AT THE FOREFRONT",
        "title2": "OF NEWS",
        "description": "Join our exclusive network and receive the most relevant reports directly.",
        "placeholder": "Your professional email",
        "button": "Subscribe"
      },
      "cta": {
        "title1": "READY TO REVOLUTIONIZE",
        "title2": "YOUR NEWSROOM?",
        "description": "Join the first direct matching platform between field journalists and international media.",
        "button_primary": "Launch Experience",
        "button_secondary": "Learn more"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
