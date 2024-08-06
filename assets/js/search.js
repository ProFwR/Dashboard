import { getUserByName } from './data.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getApps } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrCY6F7oVyghrYT_QAPE-oycFzUriCvOU",
  authDomain: "dashboard-2ed10.firebaseapp.com",
  databaseURL: "https://dashboard-2ed10-default-rtdb.firebaseio.com",
  projectId: "dashboard-2ed10",
  storageBucket: "dashboard-2ed10.appspot.com",
  messagingSenderId: "303994675790",
  appId: "1:303994675790:web:29a145cb8c843852e7591f",
  measurementId: "G-7NL5K9DM4V"
};

// let app;
// if (!getApps().length) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApps()[0];
// }

// const database = getDatabase(app);
// const usersRef = ref(database, 'Users');

// // إنشاء مرجع جديد ومعرف فريد
// const newUserRef = push(usersRef);


// set(newUserRef, {
//   name: "علي محسن ثامر",
//   phone : "0771170308",
//   address : "Basrah",
//   email: "ali@profwr.io",
//   startDate: "2004/",
//   class: "Collge",
//   Installment: "2350$",
//   first_month_grades: [100,100,96,70,100,100,80,0]
// }).then(() => {
//   alert('User data saved successfully!');
//   userForm.reset();
// }).catch((error) => {
//   alert('Error saving user data: ' + error.message);
// });

// const uniqueUserCode = newUserRef.key;
// console.log('Generated User Code:', uniqueUserCode);


document.addEventListener('DOMContentLoaded', () => {
    // الحصول على عناصر من DOM
    const searchInput = document.getElementById('input');
    const searchButton = document.getElementById('search-btn');
    const inputValue = searchInput.value.trim(); // استخدام trim لإزالة المسافات الزائدة
    function handleSearch() {
        // الحصول على قيمة مدخل البحث
        const inputValue = searchInput.value.trim(); // استخدام trim لإزالة المسافات الزائدة
        getUserByName(inputValue)
        .then(value => {
            const userData = value[0];
            if (value.length > 0) {
                document.getElementById('main').style.display = 'block';
                document.getElementById('footer').style.display = 'block';

                console.log("User Details:", userData);
                document.getElementById("NameLable").innerHTML  = userData.name;
                document.getElementById("Name").innerHTML  = userData.name;
                document.getElementById("Phone").innerHTML  = userData.phone;
                document.getElementById("Address").innerHTML  = userData.address;
                document.getElementById("Email").innerHTML  = userData.email;
                document.getElementById("class").innerHTML  = userData.class;
                document.getElementById("Installment").innerHTML  = userData.Installment;

                new Chart(document.querySelector('#barChart'), {
                    type: 'bar',
                    data: {
                    labels: ['الاسلامية', 'العربي', 'الانكليزي', 'الرياضيات', 'الاحياء', 'الفيزياء', 'الكيمياء'],
                    datasets: [{
                        label: 'درجات الشهر الاول',
                        data: userData.first_month_grades,
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                        beginAtZero: false
                        }
                    }
                    }
            });
                // You can process the user data here
            } else {
                console.log("No user found with the name: Khalid");
            }
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });
      }
    
      // إضافة مستمع الحدث إلى زر البحث
      searchButton.addEventListener('click', handleSearch);
  });




  document.getElementById('main').style.display = 'none';
  document.getElementById('footer').style.display = 'none';


(function () {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach((e) => e.addEventListener(type, listener));
      } else {
        select(el, all).addEventListener(type, listener);
      }
    };
  
    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener("scroll", listener);
    };
  
    /**
     * Sidebar toggle
     */
    if (select(".toggle-sidebar-btn")) {
      on("click", ".toggle-sidebar-btn", function (e) {
        select("body").classList.toggle("toggle-sidebar");
      });
    }
  
    /**
     * Search bar toggle
     */
    if (select(".search-bar-toggle")) {
      on("click", ".search-bar-toggle", function (e) {
        select(".search-bar").classList.toggle("search-bar-show");
      });
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select("#header");
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add("header-scrolled");
        } else {
          selectHeader.classList.remove("header-scrolled");
        }
      };
      window.addEventListener("load", headerScrolled);
      onscroll(document, headerScrolled);
    }
  
    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };
      window.addEventListener("load", toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }
  
    /**
     * Initiate tooltips
     */
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    /**
     * Initiate quill editors
     */
    if (select(".quill-editor-default")) {
      new Quill(".quill-editor-default", {
        theme: "snow",
      });
    }
  
    if (select(".quill-editor-bubble")) {
      new Quill(".quill-editor-bubble", {
        theme: "bubble",
      });
    }
  
    if (select(".quill-editor-full")) {
      new Quill(".quill-editor-full", {
        modules: {
          toolbar: [
            [
              {
                font: [],
              },
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],
            [
              {
                color: [],
              },
              {
                background: [],
              },
            ],
            [
              {
                script: "super",
              },
              {
                script: "sub",
              },
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
              {
                indent: "-1",
              },
              {
                indent: "+1",
              },
            ],
            [
              "direction",
              {
                align: [],
              },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
        theme: "snow",
      });
    }
  
    /**
     * Initiate TinyMCE Editor
     */
  
    const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;
  
    tinymce.init({
      selector: "textarea.tinymce-editor",
      plugins:
        "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
      editimage_cors_hosts: ["picsum.photos"],
      menubar: "file edit view insert format tools table help",
      toolbar:
        "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
      autosave_ask_before_unload: true,
      autosave_interval: "30s",
      autosave_prefix: "{path}{query}-{id}-",
      autosave_restore_when_empty: false,
      autosave_retention: "2m",
      image_advtab: true,
      link_list: [
        {
          title: "My page 1",
          value: "https://www.tiny.cloud",
        },
        {
          title: "My page 2",
          value: "http://www.moxiecode.com",
        },
      ],
      image_list: [
        {
          title: "My page 1",
          value: "https://www.tiny.cloud",
        },
        {
          title: "My page 2",
          value: "http://www.moxiecode.com",
        },
      ],
      image_class_list: [
        {
          title: "None",
          value: "",
        },
        {
          title: "Some class",
          value: "class-name",
        },
      ],
      importcss_append: true,
      file_picker_callback: (callback, value, meta) => {
        /* Provide file and text for the link dialog */
        if (meta.filetype === "file") {
          callback("https://www.google.com/logos/google.jpg", {
            text: "My text",
          });
        }
  
        /* Provide image and alt text for the image dialog */
        if (meta.filetype === "image") {
          callback("https://www.google.com/logos/google.jpg", {
            alt: "My alt text",
          });
        }
  
        /* Provide alternative source and posted for the media dialog */
        if (meta.filetype === "media") {
          callback("movie.mp4", {
            source2: "alt.ogg",
            poster: "https://www.google.com/logos/google.jpg",
          });
        }
      },
      height: 600,
      image_caption: true,
      quickbars_selection_toolbar:
        "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
      noneditable_class: "mceNonEditable",
      toolbar_mode: "sliding",
      contextmenu: "link image table",
      skin: useDarkMode ? "oxide-dark" : "oxide",
      content_css: useDarkMode ? "dark" : "default",
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
    });
  
    /**
     * Initiate Bootstrap validation check
     */
    var needsValidation = document.querySelectorAll(".needs-validation");
  
    Array.prototype.slice.call(needsValidation).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
  
          form.classList.add("was-validated");
        },
        false
      );
    });
  
    /**
     * Initiate Datatables
     */
    const datatables = select(".datatable", true);
    datatables.forEach((datatable) => {
      new simpleDatatables.DataTable(datatable, {
        perPageSelect: [5, 10, 15, ["All", -1]],
        columns: [
          {
            select: 2,
            sortSequence: ["desc", "asc"],
          },
          {
            select: 3,
            sortSequence: ["desc"],
          },
          {
            select: 4,
            cellClass: "green",
            headerClass: "red",
          },
        ],
      });
    });
  
    /**
     * Autoresize echart charts
     */
    const mainContainer = select("#main");
    if (mainContainer) {
      setTimeout(() => {
        new ResizeObserver(function () {
          select(".echart", true).forEach((getEchart) => {
            echarts.getInstanceByDom(getEchart).resize();
          });
        }).observe(mainContainer);
      }, 200);
    }
  })();