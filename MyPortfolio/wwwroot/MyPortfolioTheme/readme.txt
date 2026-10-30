MyPortfolioTheme
Personal portfolio theme for Göktuğ Talha Coşkunsoy
Single page, HTML5 + CSS3 + Bootstrap 5.3.3 + vanilla JavaScript. No build step.

FOLDER STRUCTURE
----------------
css/
  vendor.css   Bootstrap 5.3.3 (third-party)
  base.css     fonts, reset, design tokens, typography, buttons
  main.css     page sections (navigation, hero, about, skills, experience,
               projects, education, philosophy, contact, footer) and responsive rules
fonts/         Inter variable font, self-hosted (license: fonts/LICENSE.txt)
images/        your photos and project images
js/
  motion.js    loaded in <head>; turns on scroll animations
  main.js      typing effect, navbar, mobile menu, active link, scroll reveal,
               project filters, contact form validation
files/         your CV PDF (ozgecmis.pdf)
favicon.ico    site icon
index.html     the page

CSS LOAD ORDER
--------------
vendor.css -> base.css -> main.css
vendor.css must come first so that base.css and main.css can override Bootstrap's defaults.

USING THE THEME IN ASP.NET CORE MVC
-----------------------------------
1. Drag the MyPortfolioTheme folder into wwwroot.
2. In your layout or view, reference the files with the ~/MyPortfolioTheme/ prefix:
     <link rel="stylesheet" href="~/MyPortfolioTheme/css/vendor.css" />
     <link rel="stylesheet" href="~/MyPortfolioTheme/css/base.css" />
     <link rel="stylesheet" href="~/MyPortfolioTheme/css/main.css" />
     <script src="~/MyPortfolioTheme/js/motion.js"></script>   (in <head>)
     <script src="~/MyPortfolioTheme/js/main.js"></script>     (at the end of <body>)
3. Contact form: set data-backend-ready="true" on the form when the
   /Home/Contact POST action is ready.
