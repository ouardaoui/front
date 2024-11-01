let isLog = true

const routes = {
    '*': '/pages/home.html',
    404: "/pages/404.html",
    "#": "/pages/home.html",
    "#home": "/pages/home.html",
    "#login": "/pages/login.html",
    "#register": "/pages/register.html",
    "#leaderboard": "/pages/leaderboard.html",
    "#chat" : "/pages/chat.html",
    "#profile" : "/pages/profile.html",
    };
  

  updateNavigation();
  function showHome()
  {
    console.log("home")
  }

  function handleLogin()
  {
    console.log("login")
  }
  
  

  const handleLocation = async () => {
    let path = window.location.hash || '#'; 
    const questionMarkIndex = path.indexOf('?');
    if (questionMarkIndex !== -1) {
      path = path.slice(0, questionMarkIndex);
    }
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("app").innerHTML = html;
  
    switch(path) {
      
      case "#":
      case "#home":
        showHome();
        break;
      case "#login":
        handleLogin();
        break;
      case "#leaderboard":
        handleleaderboard();
        break;
      case "#Profile":
        handleProfilePage();
        break; 
    }
  };
  
  window.addEventListener('hashchange', handleLocation);
  handleLocation();
  
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('nav');
  
  const showNavMenu = () => {
    navMenu.style.display = 'block';
  };
  
  
  const hideNavMenu = () => {
    navMenu.style.display = 'none';
  };
  
  
  
  
  const toggleNavMenu = () => {
    if (navMenu.style.display === 'none' || navMenu.style.display === '') {
      showNavMenu();
    } else {
      hideNavMenu();
    }
  };
  
  
  navToggle.addEventListener('click', toggleNavMenu);
  
  const route = (event) => {
      event = event || window.event;
      event.preventDefault();
      
      window.history.pushState({}, "", event.target.href);
      handleLocation();
  };
  
  
  window.onpopstate = () => {
      handleLocation();
      showNavMenu();
  };
  
  
  
  function updateNavigation() {
    let isLoggedIn = isLog;
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = ''; 
    //navMenu.style.display = 'block';
  
  
  
    const menuItems = isLoggedIn ? ['Play', 'Chat', 'Leaderboard', 'Profile', 'Logout'] : ['Home', 'Login'];
  
  
    menuItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('nav-item');
     a.href = `/#${item.toLowerCase()}`;
    a.id = `${item.toLowerCase()}title`;
    a.textContent = item;
  
    a.onclick = (event) => route(event, a.href); 
    li.appendChild(a);
     navMenu.appendChild(li);
  }); 
  }
  
  
  window.addEventListener('load', () => {
    updateNavigation();
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
      
      showNavMenu();
    } else {
      
      hideNavMenu();
    }
  });

  window.route = route;
