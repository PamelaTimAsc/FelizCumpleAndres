document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const welcomeScreen = document.getElementById('welcome-screen');
    const openLetterBtn = document.getElementById('open-letter');
    const letter = document.getElementById('letter');
    const letterContent = document.querySelector('.letter');
    const showPhotoBtn = document.getElementById('show-photo');
    const showMessageBtn = document.getElementById('show-message');
    const photoContainer = document.getElementById('photo-container');
    const specialMessage = document.getElementById('special-message');
    const bgMusic = document.getElementById('bg-music');
    const birthdayVideo = document.getElementById('birthday-video');

    // Variable para controlar si la música ya se ha reproducido
    let hasPlayedMusic = false;

    // Función para reproducir música
    function playMedia() {
        if (!hasPlayedMusic) {
            // Reproducir música
            bgMusic.volume = 0.3;
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("La reproducción automática de audio fue prevenida.");
                });
            }
            
            // Reproducir video
            const videoPromise = birthdayVideo.play();
            if (videoPromise !== undefined) {
                videoPromise.catch(error => {
                    console.log("La reproducción automática de video fue prevenida.");
                });
            }
            
            hasPlayedMusic = true;
        }
    }

    // Función para crear confeti
    function createConfetti() {
        const colors = ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#ffd1ff', '#a6c1ee'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(confetti);
            
            // Eliminar el confeti después de la animación
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Evento para abrir la carta
    openLetterBtn.addEventListener('click', function() {
        // Reproducir música al abrir la carta
        playMedia();
        
        // Ocultar pantalla de bienvenida con fade out
        welcomeScreen.style.opacity = '0';
        
        // Mostrar la carta después de la animación
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            letter.classList.remove('hidden');
            
            // Animación de apertura de la carta
            setTimeout(() => {
                letterContent.style.transform = 'rotateY(0)';
                
                // Mostrar botones de sorpresa después del mensaje
                setTimeout(() => {
                    document.querySelector('.surprise-buttons').style.opacity = '1';
                }, 10000); // Ajusta este tiempo según la duración del mensaje
                
            }, 100);
        }, 1000);
    });

    // Evento para mostrar la foto
    showPhotoBtn.addEventListener('click', function() {
        // Ocultar mensaje especial si está visible
        specialMessage.classList.add('hidden');
        
        // Mostrar contenedor de foto
        photoContainer.classList.toggle('hidden');
        
        // Si se va a mostrar la foto, establecer la fuente de la imagen
        if (!photoContainer.classList.contains('hidden')) {
            // Reemplaza con la ruta de tu imagen
            document.getElementById('surprise-photo').src = '24.png';
        }
    });

    // Evento para mostrar el mensaje especial
    showMessageBtn.addEventListener('click', function() {
        // Ocultar foto si está visible
        photoContainer.classList.add('hidden');
        
        // Mostrar/ocultar mensaje especial
        specialMessage.classList.toggle('hidden');
        
        // Si se muestra el mensaje, lanzar confeti
        if (!specialMessage.classList.contains('hidden')) {
            createConfetti();
        }
    });

    // Permitir que el usuario reproduzca la música al hacer clic en cualquier parte de la carta
    letter.addEventListener('click', function() {
        if (bgMusic.paused && hasPlayedMusic) {
            bgMusic.play();
        }
    });
});