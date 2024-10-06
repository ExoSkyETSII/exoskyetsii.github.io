# Hi !
Welcome to the team ETSII Github Page's.
- [About us](#about-us)
- [Description](#description)
- [Bibliography and technologies employed](#technologies-resources-and-bibliographyy-employed)
## About us:
We're a multidisciplinary engineering and science team (but don't be fooled by our team name, we come from a wide array of disciplines, not just computer science and engineering) composed by: 
- Angelo Sho Moraschi (Team leader).
- Jesús Carrascosa Carro.
- Adrian Rodriguez Rubio.
- Miguel Tejera Lesmes.
- David Rebollo Martinez.
- Manuel Jesús Rebollo Salas.

Below you will find the following information related to our proposed solution to the  NASA's Space Apps  *Exosky!* challenge.

## Description
At Constellation Forge, users will be able to explore the vast sky as seen from an exoplanet, creating their own constellations and learning about the latest discoveries in the field of astronomy.
To achieve this, we first obtained the RA (Right Ascension), DEC (Declination), and parallax of the selected exoplanet using NASA’s Exoplanet Archive. Then, we used the Gaia Archive to gather a large amount of stars visible from that exoplanet and retrieved their data. Finally, using Matlab, we developed code to transform the data into Cartesian coordinates and obtain the relative position of the stars with respect to the selected exoplanet.
Subsequently, these relative positions, along with some other data from the stars, were saved in a .json file to be represented through a Three.js 3D library, which could draw the thousands of stars in a 3D skybox. Then, the user can select the different stars to link them and create custom constellations with custom names, which later can be exported and imported in custom JSON files to visualize them in different devices. On top of that, the page is able to cross-check with the Gaia ID and the SIMBAD Astronomical Database to redirect the user to the database which can offer more interesting data on the star.

## Technologies, resources and bibliographyy employed
Gaia Archive, NASA Exoplanet Archive, Nasa Images, SIMBAD Astronomical Database



