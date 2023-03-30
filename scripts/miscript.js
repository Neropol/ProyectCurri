'use strict';
const foto = document.getElementById('imagen1');
const buttons = document.querySelectorAll('.btn');
const navs = document.querySelectorAll('.nav__link');
const datos1 = document.getElementById('text1');
const datos2 = document.getElementById('text2');
const ContentS = document.querySelector('.contenedorS');
const conteNav = document.querySelector('.nav_Conteiner');
const conteNavSub = document.querySelector('.nav_Conteiner_Sub');
const hambur = document.querySelector('.toggle');

///var inicializadora para unica vez---------
let primer = 0;
let conexion = 1;

////Plabntilla por si no se puede conectar con API---------
const plantilla = function () {
  alert(`Error:
  No se pudo cargar API, se mostrara una plantilla de datos.`);

  const dataF = {
    picture: {
      large: './imagenes/picplan.jpg',
    },
    id: {
      name: 'Pepe',
      value: 21321,
    },
    name: {
      first: 'Pepito',
      last: 'Corso',
    },
    dob: {
      date: '25/12/1993',
      age: 30,
    },
    gender: 'Male',
    location: {
      city: 'Tierra del Fuego',
      country: 'Argentina',
      street: {
        name: 'Av. Siemnpre Viva',
        number: 4544,
      },
    },
  };

  renderDatosP(dataF);
};
///consumiendo api de datos con funcion flecha es lo mismo porque devuelve la promesa

const renderDatosP = function (data) {
  ///carga foto
  foto.setAttribute('src', data.picture.large);

  ////datos en el el p-------------------------------------------
  datos1.insertAdjacentHTML(
    'afterbegin',
    ` <H2><span style="color:#db9c12">Mi información</span></H2><br>id: ${data.id.name} (${data.id.value}) <br>Nombre: ${data.name.last} ${data.name.first}<br>
  Fecha de nacimiento: ${data.dob.date}<br>Edad: ${data.dob.age}<br>
  Genero: ${data.gender}<br>Localidad: ${data.location.city}<br>
  Pais: ${data.location.country}<br>calle: ${data.location.street.name} ${data.location.street.number}`
  );
  /////-------
  datos2.insertAdjacentHTML(
    'afterbegin',
    ` <H2><span style="color:#db9c12">Sobre mí:</span></H2>
  Soy <span style="color:#c262fa">${data.name.last} ${data.name.first}</span>`
  );
};

/////---------consume api para traer los datos de la persona----------
const getPersonData = function () {
  const getDato = async () => {
    try {
      let peticion = await fetch('https://randomuser.me/api/');
      let resultado = await peticion.json();
      renderDatosP(resultado.results[0]);
    } catch (e) {
      console.log('entro a catch');
      conexion = 0;
      plantilla();
    }
  };
  getDato();
};

const moverVentana = function (id) {
  //////////ventanas horizontales de home ------------------------

  // busca los botones con id btn recorre lacoleccion y aplica eleventlistener, borra elactivo y agrega al nuevo el active....---
  const slides = document.querySelectorAll('.slide');
  /////este if acomoda la primera vez que se carga la pagina
  if (primer === 0) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${150 * (i - 1 + 1)}%)`)
    );
    primer++;
  } else
    slides.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${150 * (i - id.slice(4) + 1)}%)`)
    );
};

////----inicializa botones y n bar
const haceBoton = function () {
  ////inicializa botones y nav eventlistener
  console.log(conexion);
  if ((conexion = 1)) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (button.classList.contains('active')) {
          moverVentana(button.id);
        }
      });
    });
  } else {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        button.textContent(button.id);

        if (button.classList.contains('active')) {
          moverVentana(button.id);
        }
      });
    });
  }

  navs.forEach(Navbutton => {
    Navbutton.value = navs.id;
    Navbutton.addEventListener('click', function (e) {
      navs.forEach(nv => nv.classList.remove('active'));
      Navbutton.classList.add('active');
    });
  });
};

hambur.addEventListener('click', function () {
  hambur.classList.toggle('rotate');
  conteNav.classList.toggle('active');
  conteNavSub.style.display = 'flex';
});

////inicializa data----------------------------------
getPersonData();

////inicializa dexplazables----------------------------------
moverVentana(1);

haceBoton();
