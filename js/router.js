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
  
  function handleleaderboard() 
  {
    const leaderboardData = [
      { id: 1, name: "John Doe", wins: 150, losses: 30, score: 1500 },
      { id: 2, name: "Jane Smith", wins: 140, losses: 35, score: 1450 },
      { id: 3, name: "Bob Johnson", wins: 130, losses: 40, score: 1400 },
      { id: 4, name: "Alice Brown", wins: 120, losses: 45, score: 1350 },
      { id: 5, name: "Charlie Wilson", wins: 110, losses: 50, score: 1300 },
      { id: 6, name: "David Lee", wins: 105, losses: 55, score: 1250 },
      { id: 7, name: "Eva Garcia", wins: 100, losses: 60, score: 1200 },
      { id: 8, name: "Frank Martin", wins: 95, losses: 65, score: 1150 },
      { id: 9, name: "Grace Kim", wins: 90, losses: 70, score: 1100 },
      { id: 10, name: "Henry Chen", wins: 85, losses: 75, score: 1050 }
    ];
    const tbody = document.getElementById("leaderboardBody")
    
    function updateLeaderboard() {
      const tbody = document.getElementById('leaderboardBody');
      tbody.innerHTML = '';
    
      leaderboardData.forEach((player, index) => {
        const winRate = ((player.wins / (player.wins + player.losses)) * 100).toFixed(1);
        const row = document.createElement('tr');
        
        let rankDisplay = '';
        if (index === 0) {
          rankDisplay = '<i class="fas fa-trophy trophy-gold"></i> <span class="rank-number">1</span>';
        } else if (index === 1) {
          rankDisplay = '<i class="fas fa-trophy trophy-silver"></i> <span class="rank-number">2</span>';
        } else if (index === 2) {
          rankDisplay = '<i class="fas fa-trophy trophy-bronze"></i> <span class="rank-number">3</span>';
        } else {
          rankDisplay = (index + 1).toString();
        }
    
        row.innerHTML = `
          <td class="px-4">${rankDisplay}</td>
          <td>
            <div class="d-flex align-items-center">
              <div class="player-avatar me-2">${player.name.charAt(0)}</div>
              <span class="player-name">${player.name}</span>
            </div>
          </td>
          <td>${player.wins}</td>
          <td>${player.losses}</td>
          <td>${winRate}%</td>
          <td class="animate-score">${player.score}</td>
        `;
        tbody.appendChild(row);
      });
    
      const totalGames = leaderboardData.reduce((acc, player) => acc + player.wins + player.losses, 0);
      const avgWinRate = leaderboardData.reduce((acc, player) => {
        return acc + (player.wins / (player.wins + player.losses));
      }, 0) / leaderboardData.length * 100;
    
      document.getElementById('totalGames').textContent = totalGames;
      document.getElementById('activePlayers').textContent = leaderboardData.length;
      document.getElementById('avgWinRate').textContent = avgWinRate.toFixed(1) + '%';
    }
    
    // Initial update
    updateLeaderboard();
    
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      leaderboardData.forEach(player => {
        if (Math.random() > 0.5) {
          player.wins++;
          player.score += Math.floor(Math.random() * 10);
        } else {
          player.losses++;
          player.score -= Math.floor(Math.random() * 5);
        }
      });
      
      leaderboardData.sort((a, b) => b.score - a.score);
      
      updateLeaderboard();
    }, 30000);
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
