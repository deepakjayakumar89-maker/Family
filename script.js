/* =========================================================
   AMMINI VILASAM — script.js
   Vanilla JS. No dependencies.

   HOW TO ADD YOUR OWN PHOTOS (no other code changes needed):
   1) Drop your photos into the /images/gallery/ folder, named
      photo25.webp, photo26.webp, photo27.webp ... (sequential).
      Gallery photos use the WebP format for faster loading — convert
      your JPG/PNG photos to .webp before adding them (any free image
      converter or "Export as WebP" in most photo editors works).
   2) Raise TOTAL_PHOTOS below to match how many files you have.
   3) That's it — "See More Memories" will reveal them automatically.

   To replace the 3 featured family photos or the family tree
   photos, just overwrite the existing files in
   /images/featured/ and /images/tree/ with your own photos
   using the exact same file names.

   TO CHANGE THE BACKGROUND MUSIC:
   Replace /audio/lullaby-theme.mp3 with your own track, keeping
   the exact same file name — no code changes needed.
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     0. CONFIG — edit these numbers as your family album grows
     --------------------------------------------------------- */
  const TOTAL_PHOTOS = 24;      // total files present in images/gallery/
  const PHOTOS_PER_LOAD = 8;    // how many photos to reveal per click

  const galleryImages = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
    num: i + 1,
    src: `images/gallery/photo${i + 1}.webp`
  }));

  let renderedCount = 0;

  /* ---------------------------------------------------------
     0.5 TRANSLATIONS — English / Malayalam
     --------------------------------------------------------- */
  const TRANSLATIONS = {
    en: {
          "brand": "Ammini <span>Vilasam</span>",
          "skip": "Skip to memory gallery",
          "nav.home": "Home",
          "nav.family": "Little Miracles",
          "nav.memories": "Memories",
          "nav.tree": "Family Tree",
          "nav.contact": "Contact",
          "hero.eyebrow": "Est. in the heart of our home",
          "hero.tagline": "Every smile tells a story, every picture keeps a memory alive.",
          "hero.cta": "Step Into Our Story",
          "featured.eyebrow": "The Hearts of Our Home",
          "featured.heading": "Our Beloved Three",
          "featured.sub": "The faces that made every ordinary day feel like a page from a storybook.",
          "featured.kujammu.name": "Kujammu",
          "featured.kujammu.role": "The heart that holds our stories",
          "featured.shankaran.name": "Shankaran",
          "featured.shankaran.role": "The roots that hold us steady",
          "featured.paru.name": "Paru",
          "featured.paru.role": "The laughter that fills every room",
          "gallery.eyebrow": "A Chapter for Every Moment",
          "gallery.heading": "Our Gallery of Memories",
          "gallery.sub": "A gentle scroll through the days worth remembering.",
          "gallery.seeMore": "See More Memories",
          "gallery.seenAll": "You've Seen It All \ud83d\udc9b",
          "gallery.remaining": "{n} more waiting to be remembered",
          "gallery.memoryLabel": "Memory",
          "gallery.altTemplate": "A cherished family memory, photo {n}",
          "gallery.openAria": "Open photo: {caption}",
          "tree.eyebrow": "Where Our Story Began",
          "tree.heading": "Our Family Tree",
          "tree.sub": "Every branch a family, every leaf a name we love.",
          "tree.familyA.label": "Family of Shilpa Jayakumar",
          "tree.familyB.label": "Family of Deepak Jayakumar",
          "tree.relation.grandfather": "Grandfather",
          "tree.relation.grandmother": "Grandmother",
          "tree.relation.father": "Father",
          "tree.relation.mother": "Mother",
          "tree.relation.son": "Son",
          "tree.relation.daughter": "Daughter",
          "tree.name.grandfather": "Jayakumar",
          "tree.name.grandmother": "SreeDevi",
          "tree.name.fatherA": "Gokul",
          "tree.name.motherA": "Shilpa",
          "tree.name.childA1": "Jaahnavi",
          "tree.name.childA2": "Jagannatha",
          "tree.name.fatherB": "Deepak",
          "tree.name.motherB": "Gayathri",
          "tree.name.childB1": "Vamika",
          "footer.tagline": "A little house built from a lifetime of memories.",
          "footer.note": "Made with \ud83e\udd0e for our family, today and for every family yet to come.",
          "lightbox.close": "Close photo viewer",
          "lightbox.prev": "Previous photo",
          "lightbox.next": "Next photo",
          "backToTop": "Back to top",
          "music.play": "Play soft background music",
          "music.pause": "Pause background music",
          "langToggle": "Switch language / \u0d2d\u0d3e\u0d37 \u0d2e\u0d3e\u0d31\u0d4d\u0d31\u0d41\u0d15"
    },
    ml: {
          "brand": "\u0d05\u0d2e\u0d4d\u0d2e\u0d3f\u0d23\u0d3f <span>\u0d35\u0d3f\u0d32\u0d3e\u0d38\u0d02</span>",
          "skip": "\u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d1a\u0d4d\u0d1a\u0d3f\u0d24\u0d4d\u0d30 \u0d36\u0d3e\u0d32\u0d2f\u0d3f\u0d32\u0d47\u0d15\u0d4d\u0d15\u0d4d \u0d2a\u0d4b\u0d15\u0d41\u0d15",
          "nav.home": "\u0d39\u0d4b\u0d02",
          "nav.family": "\u0d15\u0d4a\u0d1a\u0d4d\u0d1a\u0d41 \u0d05\u0d24\u0d4d\u0d2d\u0d41\u0d24\u0d19\u0d4d\u0d19\u0d7e",
          "nav.memories": "\u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d15\u0d7e",
          "nav.tree": "\u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c \u0d35\u0d43\u0d15\u0d4d\u0d37\u0d02",
          "nav.contact": "\u0d2c\u0d28\u0d4d\u0d27\u0d2a\u0d4d\u0d2a\u0d46\u0d1f\u0d41\u0d15",
          "hero.eyebrow": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d39\u0d43\u0d26\u0d2f\u0d24\u0d4d\u0d24\u0d3f\u0d7d \u0d38\u0d4d\u0d25\u0d3e\u0d2a\u0d3f\u0d24\u0d02",
          "hero.tagline": "\u0d13\u0d30\u0d4b \u0d1a\u0d3f\u0d30\u0d3f\u0d2f\u0d41\u0d02 \u0d12\u0d30\u0d41 \u0d15\u0d25 \u0d2a\u0d31\u0d2f\u0d41\u0d28\u0d4d\u0d28\u0d41, \u0d13\u0d30\u0d4b \u0d1a\u0d3f\u0d24\u0d4d\u0d30\u0d35\u0d41\u0d02 \u0d12\u0d30\u0d41 \u0d13\u0d7c\u0d2e\u0d4d\u0d2e \u0d1c\u0d40\u0d35\u0d28\u0d4b\u0d1f\u0d46 \u0d28\u0d3f\u0d32\u0d28\u0d3f\u0d7c\u0d24\u0d4d\u0d24\u0d41\u0d28\u0d4d\u0d28\u0d41.",
          "hero.cta": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d15\u0d25\u0d2f\u0d3f\u0d32\u0d47\u0d15\u0d4d\u0d15\u0d4d",
          "featured.eyebrow": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d39\u0d43\u0d26\u0d2f\u0d19\u0d4d\u0d19\u0d7e",
          "featured.heading": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d2a\u0d4d\u0d30\u0d3f\u0d2f\u0d2a\u0d4d\u0d2a\u0d46\u0d1f\u0d4d\u0d1f \u0d2e\u0d42\u0d35\u0d7c",
          "featured.sub": "\u0d38\u0d3e\u0d27\u0d3e\u0d30\u0d23 \u0d26\u0d3f\u0d35\u0d38\u0d19\u0d4d\u0d19\u0d33\u0d46 \u0d12\u0d30\u0d41 \u0d15\u0d25\u0d3e\u0d2a\u0d41\u0d38\u0d4d\u0d24\u0d15\u0d24\u0d4d\u0d24\u0d3f\u0d28\u0d4d\u0d31\u0d46 \u0d0f\u0d1f\u0d3e\u0d15\u0d4d\u0d15\u0d3f\u0d2f \u0d2e\u0d41\u0d16\u0d19\u0d4d\u0d19\u0d7e.",
          "featured.kujammu.name": "\u0d15\u0d41\u0d1e\u0d4d\u0d1e\u0d2e\u0d4d\u0d2e\u0d41",
          "featured.kujammu.role": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d15\u0d25\u0d15\u0d7e \u0d38\u0d42\u0d15\u0d4d\u0d37\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28 \u0d39\u0d43\u0d26\u0d2f\u0d02",
          "featured.shankaran.name": "\u0d36\u0d19\u0d4d\u0d15\u0d30\u0d7b",
          "featured.shankaran.role": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d46 \u0d09\u0d31\u0d2a\u0d4d\u0d2a\u0d4b\u0d1f\u0d46 \u0d28\u0d3f\u0d7c\u0d24\u0d4d\u0d24\u0d41\u0d28\u0d4d\u0d28 \u0d35\u0d47\u0d30\u0d41\u0d15\u0d7e",
          "featured.paru.name": "\u0d2a\u0d3e\u0d31\u0d41",
          "featured.paru.role": "\u0d0e\u0d32\u0d4d\u0d32\u0d3e \u0d2e\u0d41\u0d31\u0d3f\u0d2f\u0d41\u0d02 \u0d28\u0d3f\u0d31\u0d2f\u0d4d\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28 \u0d1a\u0d3f\u0d30\u0d3f",
          "gallery.eyebrow": "\u0d13\u0d30\u0d4b \u0d28\u0d3f\u0d2e\u0d3f\u0d37\u0d24\u0d4d\u0d24\u0d3f\u0d28\u0d41\u0d02 \u0d12\u0d30\u0d41 \u0d05\u0d27\u0d4d\u0d2f\u0d3e\u0d2f\u0d02",
          "gallery.heading": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d1a\u0d4d\u0d1a\u0d3f\u0d24\u0d4d\u0d30 \u0d36\u0d3e\u0d32",
          "gallery.sub": "\u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d3f\u0d15\u0d4d\u0d15\u0d3e\u0d7b \u0d2f\u0d4b\u0d17\u0d4d\u0d2f\u0d2e\u0d3e\u0d2f \u0d26\u0d3f\u0d28\u0d19\u0d4d\u0d19\u0d33\u0d3f\u0d32\u0d42\u0d1f\u0d46 \u0d12\u0d30\u0d41 \u0d38\u0d57\u0d2e\u0d4d\u0d2f \u0d2f\u0d3e\u0d24\u0d4d\u0d30.",
          "gallery.seeMore": "\u0d15\u0d42\u0d1f\u0d41\u0d24\u0d7d \u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d15\u0d7e \u0d15\u0d3e\u0d23\u0d41\u0d15",
          "gallery.seenAll": "\u0d0e\u0d32\u0d4d\u0d32\u0d3e\u0d02 \u0d15\u0d23\u0d4d\u0d1f\u0d41 \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d41 \ud83d\udc9b",
          "gallery.remaining": "\u0d07\u0d28\u0d3f\u0d2f\u0d41\u0d02 {n} \u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d15\u0d7e \u0d15\u0d3e\u0d24\u0d4d\u0d24\u0d3f\u0d30\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d41",
          "gallery.memoryLabel": "\u0d13\u0d7c\u0d2e\u0d4d\u0d2e",
          "gallery.altTemplate": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d2a\u0d4d\u0d30\u0d3f\u0d2f\u0d2a\u0d4d\u0d2a\u0d46\u0d1f\u0d4d\u0d1f \u0d12\u0d30\u0d41 \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c \u0d13\u0d7c\u0d2e\u0d4d\u0d2e, \u0d1a\u0d3f\u0d24\u0d4d\u0d30\u0d02 {n}",
          "gallery.openAria": "\u0d1a\u0d3f\u0d24\u0d4d\u0d30\u0d02 \u0d24\u0d41\u0d31\u0d15\u0d4d\u0d15\u0d41\u0d15: {caption}",
          "tree.eyebrow": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d15\u0d25 \u0d06\u0d30\u0d02\u0d2d\u0d3f\u0d1a\u0d4d\u0d1a\u0d3f\u0d1f\u0d02",
          "tree.heading": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c \u0d35\u0d43\u0d15\u0d4d\u0d37\u0d02",
          "tree.sub": "\u0d13\u0d30\u0d4b \u0d36\u0d3e\u0d16\u0d2f\u0d41\u0d02 \u0d12\u0d30\u0d41 \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c\u0d02, \u0d13\u0d30\u0d4b \u0d07\u0d32\u0d2f\u0d41\u0d02 \u0d1e\u0d19\u0d4d\u0d19\u0d7e \u0d38\u0d4d\u0d28\u0d47\u0d39\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28 \u0d12\u0d30\u0d41 \u0d2a\u0d47\u0d30\u0d4d.",
          "tree.familyA.label": "\u0d36\u0d3f\u0d32\u0d4d\u0d2a \u0d1c\u0d2f\u0d15\u0d41\u0d2e\u0d3e\u0d31\u0d3f\u0d28\u0d4d\u0d31\u0d46 \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c\u0d02",
          "tree.familyB.label": "\u0d26\u0d40\u0d2a\u0d15\u0d4d \u0d1c\u0d2f\u0d15\u0d41\u0d2e\u0d3e\u0d31\u0d3f\u0d28\u0d4d\u0d31\u0d46 \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c\u0d02",
          "tree.relation.grandfather": "\u0d2e\u0d41\u0d24\u0d4d\u0d24\u0d36\u0d4d\u0d36\u0d7b",
          "tree.relation.grandmother": "\u0d2e\u0d41\u0d24\u0d4d\u0d24\u0d36\u0d4d\u0d36\u0d3f",
          "tree.relation.father": "\u0d05\u0d1a\u0d4d\u0d1b\u0d7b",
          "tree.relation.mother": "\u0d05\u0d2e\u0d4d\u0d2e",
          "tree.relation.son": "\u0d2e\u0d15\u0d7b",
          "tree.relation.daughter": "\u0d2e\u0d15\u0d7e",
          "tree.name.grandfather": "\u0d1c\u0d2f\u0d15\u0d41\u0d2e\u0d3e\u0d7c",
          "tree.name.grandmother": "\u0d36\u0d4d\u0d30\u0d40\u0d26\u0d47\u0d35\u0d3f",
          "tree.name.fatherA": "\u0d17\u0d4b\u0d15\u0d41\u0d7d",
          "tree.name.motherA": "\u0d36\u0d3f\u0d32\u0d4d\u0d2a",
          "tree.name.childA1": "\u0d1c\u0d3e\u0d39\u0d4d\u0d28\u0d35\u0d3f",
          "tree.name.childA2": "\u0d1c\u0d17\u0d28\u0d4d\u0d28\u0d3e\u0d25",
          "tree.name.fatherB": "\u0d26\u0d40\u0d2a\u0d15\u0d4d",
          "tree.name.motherB": "\u0d17\u0d3e\u0d2f\u0d24\u0d4d\u0d30\u0d3f",
          "tree.name.childB1": "\u0d35\u0d3e\u0d2e\u0d3f\u0d15",
          "footer.tagline": "\u0d12\u0d30\u0d41 \u0d1c\u0d40\u0d35\u0d3f\u0d24\u0d15\u0d3e\u0d32 \u0d13\u0d7c\u0d2e\u0d4d\u0d2e\u0d15\u0d33\u0d3e\u0d7d \u0d2a\u0d23\u0d3f\u0d24 \u0d12\u0d30\u0d41 \u0d15\u0d4a\u0d1a\u0d4d\u0d1a\u0d41 \u0d35\u0d40\u0d1f\u0d4d.",
          "footer.note": "\u0d1e\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c\u0d24\u0d4d\u0d24\u0d3f\u0d28\u0d3e\u0d2f\u0d3f, \u0d07\u0d28\u0d4d\u0d28\u0d41\u0d02 \u0d35\u0d30\u0d3e\u0d28\u0d3f\u0d30\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28 \u0d0e\u0d32\u0d4d\u0d32\u0d3e \u0d15\u0d41\u0d1f\u0d41\u0d02\u0d2c\u0d19\u0d4d\u0d19\u0d7e\u0d15\u0d4d\u0d15\u0d41\u0d2e\u0d3e\u0d2f\u0d3f \ud83e\udd0e \u0d28\u0d3f\u0d7c\u0d2e\u0d4d\u0d2e\u0d3f\u0d1a\u0d4d\u0d1a\u0d24\u0d4d.",
          "lightbox.close": "\u0d1a\u0d3f\u0d24\u0d4d\u0d30 \u0d15\u0d3e\u0d34\u0d4d\u0d1a \u0d05\u0d1f\u0d2f\u0d4d\u0d15\u0d4d\u0d15\u0d41\u0d15",
          "lightbox.prev": "\u0d2e\u0d41\u0d7b \u0d1a\u0d3f\u0d24\u0d4d\u0d30\u0d02",
          "lightbox.next": "\u0d05\u0d1f\u0d41\u0d24\u0d4d\u0d24 \u0d1a\u0d3f\u0d24\u0d4d\u0d30\u0d02",
          "backToTop": "\u0d2e\u0d41\u0d15\u0d33\u0d3f\u0d32\u0d47\u0d15\u0d4d\u0d15\u0d4d \u0d2a\u0d4b\u0d15\u0d41\u0d15",
          "music.play": "\u0d36\u0d3e\u0d28\u0d4d\u0d24\u0d2e\u0d3e\u0d2f \u0d38\u0d02\u0d17\u0d40\u0d24\u0d02 \u0d2a\u0d4d\u0d32\u0d47 \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
          "music.pause": "\u0d38\u0d02\u0d17\u0d40\u0d24\u0d02 \u0d24\u0d3e\u0d7d\u0d15\u0d4d\u0d15\u0d3e\u0d32\u0d3f\u0d15\u0d2e\u0d3e\u0d2f\u0d3f \u0d28\u0d3f\u0d7c\u0d24\u0d4d\u0d24\u0d41\u0d15",
          "langToggle": "\u0d2d\u0d3e\u0d37 \u0d2e\u0d3e\u0d31\u0d4d\u0d31\u0d41\u0d15 / Switch language"
    }
  };

  let currentLang = localStorage.getItem("ammini-lang") || "en";

  function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.en[key] || "";
  }
  function captionFor(num) {
    return `${t("gallery.memoryLabel")} ${String(num).padStart(2, "0")}`;
  }
  function altFor(num) {
    return t("gallery.altTemplate").replace("{n}", num);
  }

  /* ---------------------------------------------------------
     1. LOADER
     Hides on DOMContentLoaded (HTML/CSS ready) rather than the
     full window "load" event, so a slow-loading background music
     file, web font, or flaky mobile connection can never leave
     this stuck on screen. A hard safety-net timeout guarantees it
     always disappears no matter what.
     --------------------------------------------------------- */
  const loader = document.getElementById("loader");
  let loaderHidden = false;
  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    loader.classList.add("is-hidden");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(hideLoader, 400));
  } else {
    setTimeout(hideLoader, 200);
  }
  // Absolute safety net: never let the loader stay up more than 3s.
  setTimeout(hideLoader, 3000);

  /* ---------------------------------------------------------
     2. AMBIENT PARTICLES (hearts, sparkles, petals, fireflies)
     --------------------------------------------------------- */
  const particleField = document.getElementById("particleField");
  const PARTICLE_GLYPHS = ["\uD83D\uDC97", "\u2728", "\uD83C\uDF38", "\uD83C\uDF6E", "\uD83C\uDF1F"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnParticle() {
    if (prefersReducedMotion) return;
    const el = document.createElement("span");
    const isFirefly = Math.random() < 0.18;

    if (isFirefly) {
      el.className = "particle firefly";
      const size = 6 + Math.random() * 6;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = `${20 + Math.random() * 60}vh`;
      el.style.animationDuration = `${4 + Math.random() * 3}s`;
    } else {
      el.className = "particle";
      el.textContent = PARTICLE_GLYPHS[Math.floor(Math.random() * PARTICLE_GLYPHS.length)];
      el.style.left = `${Math.random() * 100}vw`;
      el.style.fontSize = `${12 + Math.random() * 14}px`;
      el.style.setProperty("--drift-x", `${(Math.random() * 160 - 80).toFixed(0)}px`);
      el.style.setProperty("--rotate", `${(Math.random() * 360).toFixed(0)}deg`);
      el.style.animationDuration = `${10 + Math.random() * 10}s`;
    }
    el.style.animationDelay = "0s";
    particleField.appendChild(el);
    window.setTimeout(() => el.remove(), 20000);
  }

  if (!prefersReducedMotion) {
    for (let i = 0; i < 14; i++) {
      window.setTimeout(spawnParticle, i * 400);
    }
    window.setInterval(spawnParticle, 1400);
  }

  /* ---------------------------------------------------------
     3. NAVBAR — scroll shadow + mobile toggle
     --------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const langToggle = document.getElementById("langToggle");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 20);
    if (window.scrollY > 500) {
      backToTop.hidden = false;
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  });

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     3.5 LANGUAGE TOGGLE — English / Malayalam
     --------------------------------------------------------- */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("ammini-lang", lang);
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-ml", lang === "ml");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = TRANSLATIONS[lang][key];
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const val = TRANSLATIONS[lang][key];
      if (val !== undefined) el.innerHTML = val;
    });

    langToggle.querySelectorAll(".lang-option").forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.langLabel === lang);
    });
    langToggle.setAttribute("aria-label", t("langToggle"));

    lightboxClose.setAttribute("aria-label", t("lightbox.close"));
    lightboxPrev.setAttribute("aria-label", t("lightbox.prev"));
    lightboxNext.setAttribute("aria-label", t("lightbox.next"));
    backToTop.setAttribute("aria-label", t("backToTop"));

    setMusicUI(bgMusic && !bgMusic.paused);
    refreshGalleryTexts();
    updateSeeMoreState();
    if (!lightbox.hidden) renderLightboxImage();
  }

  langToggle.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "ml" : "en");
  });

  /* ---------------------------------------------------------
     3.8 BACKGROUND MUSIC — soft ambient loop
     --------------------------------------------------------- */
  let musicUserPaused = false;

  function setMusicUI(isPlaying) {
    musicToggle.classList.toggle("is-playing", isPlaying);
    if (isPlaying) musicToggle.classList.remove("invite-pulse");
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.querySelector(".music-icon").textContent = isPlaying ? "\uD83C\uDFB5" : "\uD83D\uDD07";
    musicToggle.setAttribute("aria-label", t(isPlaying ? "music.pause" : "music.play"));
  }

  function tryAutoplay() {
    if (!bgMusic) return;
    bgMusic.volume = 0.55;
    bgMusic
      .play()
      .then(() => setMusicUI(true))
      .catch(() => {
        setMusicUI(false);
        musicToggle.classList.add("invite-pulse");
      });
  }

  function tryResumeOnFirstGesture() {
    if (!bgMusic.paused || musicUserPaused) return;
    bgMusic
      .play()
      .then(() => setMusicUI(true))
      .catch(() => {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(tryAutoplay, 900));
  } else {
    setTimeout(tryAutoplay, 900);
  }

  ["click", "touchstart", "keydown"].forEach((evt) => {
    document.addEventListener(evt, tryResumeOnFirstGesture, { once: true, passive: true });
  });

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      musicUserPaused = false;
      bgMusic.play().then(() => setMusicUI(true)).catch(() => {});
    } else {
      musicUserPaused = true;
      bgMusic.pause();
      setMusicUI(false);
    }
  });

  /* ---------------------------------------------------------
     4. FEATURED FAMILY — fade in on scroll
     --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  document.querySelectorAll(".feature-card").forEach((card) => revealObserver.observe(card));

  /* ---------------------------------------------------------
     5. FAMILY TREE — grow animation on scroll into view
     --------------------------------------------------------- */
  const treeSection = document.getElementById("tree");
  const treeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          treeSection.classList.add("in-view");
          treeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  treeObserver.observe(treeSection);

  /* ---------------------------------------------------------
     6. MASONRY GALLERY — render + "See More Memories"
     --------------------------------------------------------- */
  const masonryGrid = document.getElementById("masonryGrid");
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const seeMoreNote = document.getElementById("seeMoreNote");

  function createGalleryItem(photo, index) {
    const item = document.createElement("figure");
    item.className = "gallery-item";
    item.dataset.num = String(photo.num);
    item.style.animationDelay = `${(index % PHOTOS_PER_LOAD) * 0.06}s`;
    item.setAttribute("role", "listitem");
    item.tabIndex = 0;

    const caption = captionFor(photo.num);
    item.setAttribute("aria-label", t("gallery.openAria").replace("{caption}", caption));

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = altFor(photo.num);
    img.loading = "lazy";
    img.decoding = "async";

    const hint = document.createElement("figcaption");
    hint.className = "zoom-hint";
    hint.textContent = caption;

    item.appendChild(img);
    item.appendChild(hint);

    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    return item;
  }

  function refreshGalleryTexts() {
    Array.from(masonryGrid.children).forEach((item) => {
      const num = Number(item.dataset.num);
      const caption = captionFor(num);
      const hint = item.querySelector(".zoom-hint");
      const img = item.querySelector("img");
      if (hint) hint.textContent = caption;
      if (img) img.alt = altFor(num);
      item.setAttribute("aria-label", t("gallery.openAria").replace("{caption}", caption));
    });
  }

  function updateSeeMoreState() {
    const remaining = galleryImages.length - renderedCount;
    if (remaining <= 0) {
      seeMoreBtn.setAttribute("disabled", "true");
      seeMoreBtn.querySelector("span").textContent = t("gallery.seenAll");
      seeMoreNote.textContent = "";
    } else {
      seeMoreBtn.removeAttribute("disabled");
      seeMoreBtn.querySelector("span").textContent = t("gallery.seeMore");
      seeMoreNote.textContent = t("gallery.remaining").replace("{n}", remaining);
    }
  }

  function loadMorePhotos() {
    const next = galleryImages.slice(renderedCount, renderedCount + PHOTOS_PER_LOAD);
    next.forEach((photo, i) => {
      const el = createGalleryItem(photo, renderedCount + i);
      masonryGrid.appendChild(el);
    });
    renderedCount += next.length;
    updateSeeMoreState();
  }

  seeMoreBtn.addEventListener("click", loadMorePhotos);

  // initial batch
  loadMorePhotos();

  /* ---------------------------------------------------------
     7. LIGHTBOX — fullscreen viewer with nav, keyboard, swipe
     --------------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");

  let currentIndex = 0;
  let lastFocusedElement = null;

  function openLightbox(index) {
    currentIndex = index;
    renderLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lastFocusedElement = document.activeElement;
    lightboxClose.focus();
  }

  function renderLightboxImage() {
    const photo = galleryImages[currentIndex];
    // restart zoom animation
    lightboxImg.style.animation = "none";
    // force reflow
    void lightboxImg.offsetWidth;
    lightboxImg.style.animation = "";
    lightboxImg.src = photo.src;
    lightboxImg.alt = altFor(photo.num);
    lightboxCaption.textContent = `${captionFor(photo.num)} \u00B7 ${currentIndex + 1}/${galleryImages.length}`;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % Math.max(renderedCount, 1);
    renderLightboxImage();
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + Math.max(renderedCount, 1)) % Math.max(renderedCount, 1);
    renderLightboxImage();
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNext);
  lightboxPrev.addEventListener("click", showPrev);

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const SWIPE_THRESHOLD = 50;

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff < 0) showNext();
        else showPrev();
      }
    },
    { passive: true }
  );

  /* ---------------------------------------------------------
     8. BACK TO TOP
     --------------------------------------------------------- */
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------
     9. INITIAL LANGUAGE SYNC
     --------------------------------------------------------- */
  applyLanguage(currentLang);
})();
