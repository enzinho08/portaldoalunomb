document.addEventListener('DOMContentLoaded', () => {
    const menuOptions = ['vegetariano', 'vegano', 'tradicional', 'sem-gluten'];
    const dishOptions = {
        'vegetariano': ['Feijoada Vegetariana', 'Salada de Grão-de-Bico'],
        'vegano': ['Tofu Grelhado', 'Strogonoff Vegano'],
        'tradicional': ['Feijoada', 'Strogonoff de Frango'],
        'sem-gluten': ['Galinhada', 'Risoto de Quinoa']
    };

    function calculatePercentage() {
        let totalVotes = 0;
        let menuCounts = {
            'vegetariano': 0,
            'vegano': 0,
            'tradicional': 0,
            'sem-gluten': 0
        };

        let dishCounts = {
            'vegetariano': {},
            'vegano': {},
            'tradicional': {},
            'sem-gluten': {}
        };

        menuOptions.forEach(menu => {
            dishOptions[menu].forEach(dish => {
                dishCounts[menu][dish] = parseInt(localStorage.getItem(menu + '-' + dish + '-count')) || 0;
                menuCounts[menu] += dishCounts[menu][dish];
            });
            totalVotes += menuCounts[menu];
        });

        menuOptions.forEach(menu => {
            const percentage = totalVotes === 0 ? 0 : (menuCounts[menu] / totalVotes * 100).toFixed(2);
            updateProgressBar(menu, percentage);

            let mostVotedDish = '';
            let highestVotes = 0;
            Object.keys(dishCounts[menu]).forEach(dish => {
                if (dishCounts[menu][dish] > highestVotes) {
                    highestVotes = dishCounts[menu][dish];
                    mostVotedDish = dish;
                }
            });

            const dishPercentage = menuCounts[menu] === 0 ? 0 : (highestVotes / menuCounts[menu] * 100).toFixed(2);
            updateDishResults(menu, mostVotedDish, dishPercentage);
        });
    }

    function updateProgressBar(menuType, percentage) {
        const progressBar = document.getElementById(menuType + '-progress');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
            progressBar.textContent = menuType + ': ' + percentage + '%';
        }
    }

    function updateDishResults(menuType, dish, percentage) {
        const dishResult = document.getElementById(menuType + '-dish-result');
        if (dishResult) {
            dishResult.textContent = dish ? `${dish}: ${percentage}%` : 'Nenhum prato votado ainda';
        }
    }

    window.redirectToMenuOptions = function() {
        const selectedMenu = document.querySelector('input[name="menu"]:checked').value;
        if (selectedMenu) {
            window.location.href = selectedMenu + '.html';
        }
    }

    window.voteForDish = function(menu) {
        const selectedDish = document.querySelector('input[name="dish"]:checked').value;
        if (selectedDish) {
            const currentCount = parseInt(localStorage.getItem(menu + '-' + selectedDish + '-count')) || 0;
            localStorage.setItem(menu + '-' + selectedDish + '-count', currentCount + 1);
            calculatePercentage();
            document.getElementById('voteMessage').textContent = 'Voto registrado com sucesso!';
            document.getElementById('voteMessage').style.color = 'green';
        } else {
            alert('Por favor, selecione um prato.');
        }
    }

    if (window.location.pathname.includes('portal.html')) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'login.html';
        } else {
            calculatePercentage();
        }
        
       document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
});

function redirectToMenuOptions() {
    const selectedMenu = document.querySelector('input[name="menu"]:checked');
    if (selectedMenu) {
        const menuType = selectedMenu.value;
        window.location.href = menuType + '.html';
    } else {
        alert('Por favor, selecione um tipo de cardápio.');
    }
}

function voteForDish(menuType) {
    const selectedDish = document.querySelector('input[name="dish"]:checked');
    if (selectedDish) {
        const dishName = selectedDish.value;
        let votes = JSON.parse(localStorage.getItem(menuType + 'Votes')) || {};
        votes[dishName] = (votes[dishName] || 0) + 1;
        localStorage.setItem(menuType + 'Votes', JSON.stringify(votes));
        document.getElementById('voteMessage').textContent = 'Voto registrado com sucesso!';
        updateResults();
    } else {
        alert('Por favor, selecione um prato.');
    }
}

function updateResults() {
    const menus = ['vegetariano', 'vegano', 'tradicional', 'sem-gluten'];
    menus.forEach(menuType => {
        let votes = JSON.parse(localStorage.getItem(menuType + 'Votes')) || {};
        let totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
        let leadingDish = 'Nenhum prato votado ainda';
        let maxVotes = 0;

        Object.keys(votes).forEach(dish => {
            let percentage = (votes[dish] / totalVotes) * 100;
            document.getElementById(menuType + '-progress').style.width = percentage + '%';
            document.getElementById(menuType + '-progress').textContent = menuType.charAt(0).toUpperCase() + menuType.slice(1) + ': ' + percentage.toFixed(2) + '%';
            if (votes[dish] > maxVotes) {
                maxVotes = votes[dish];
                leadingDish = dish + ': ' + percentage.toFixed(2) + '%';
            }
        });

        document.getElementById(menuType + '-dish-result').textContent = leadingDish;
    });
}

function resetVotes(){
    const menus = ['vegetariano', 'vegano', 'tradicional', 'sem-gluten'];
    menus.forEach(menuType => {
        localStorage.removeItem(menuType + 'resetButton');
        // Atualizar a barra de progresso e os resultados após remover os votos
        document.getElementById(menuType + '-progress').style.width = '0%';
        document.getElementById(menuType + '-progress').textContent = menuType.charAt(0).toUpperCase() + menuType.slice(1) + ': 0%';
        document.getElementById(menuType + '-dish-result').textContent = 'Nenhum prato votado ainda';
    });
    alert('Votos zerados com sucesso!');

   
}

            
    }
});
