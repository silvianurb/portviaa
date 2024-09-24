$(document).ready(function() {

  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scrolling and active link management
  $(".header ul li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    var offset = target === "#home" ? 0 : $(target).offset().top - 40;

    $("html, body").animate(
      {
        scrollTop: offset
      },
      500
    );

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Contact form submission
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  if (form) { // Ensure the form exists before adding the event listener
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          msg.innerHTML = "Message sent successfully";
          setTimeout(() => msg.innerHTML = "", 5000);
          form.reset();
        })
        .catch(error => console.error('Error!', error.message));
    });
  }

 // ANIMASI NAMA "SILVIA NUR BAITI"
 const nameElement = document.getElementById('name-animation');
 if (nameElement) {
   const nameText = nameElement.textContent;
   nameElement.textContent = '';

   // Buat elemen span untuk setiap huruf
   for (let i = 0; i < nameText.length; i++) {
     const span = document.createElement('span');
     span.textContent = nameText[i] === ' ' ? '\u00A0' : nameText[i]; // Menangani spasi
     span.classList.add('name-letter');
     nameElement.appendChild(span);
   }

   const letters = document.querySelectorAll('.name-letter');

   function startAnimation() {
     letters.forEach((letter, index) => {
       // Tambahkan kelas animasi dengan delay untuk setiap huruf
       setTimeout(() => {
         letter.classList.add('animate');
       }, index * 100);
     });
   }

   function resetAnimation() {
     letters.forEach((letter) => {
       // Hapus kelas animasi untuk mengulang animasi
       letter.classList.remove('animate');
     });
   }

   // Jalankan animasi pertama kali
   startAnimation();

   // Loop animasi setiap beberapa detik tanpa menghapus elemen
   setInterval(() => {
     resetAnimation();
     setTimeout(startAnimation, 100); // Mulai animasi lagi setelah 100ms
   }, 4000); // Ulangi animasi setiap 4 detik
 }

}); // Penutup document.ready

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function() {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}
