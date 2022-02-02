// Scroll effect
window.addEventListener("scroll", function(){
    var header = document.querySelector('nav')
    header.classList.toggle('sticky', window.scrollY > 0)
})

// Image Zoom
document.querySelectorAll('.image-container .image').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup-image').style.display = 'flex'
        document.querySelector('.popup-image img').src = image.querySelector('img').getAttribute('src')
        document.querySelector('.popup-image a').href = image.querySelector('a').getAttribute('href')
        document.querySelector('.popup-image p').innerHTML = image.querySelector('p').innerHTML
        document.querySelector('body').style.overflow = 'hidden'
    }
})
document.querySelector('.popup-image').onclick =()=>{
    document.querySelector('body').style.overflow = 'auto'
    document.querySelector('.popup-image').style.display = 'none'   
}

// NavBar
const navSlide = () => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-links')


    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active')
        
        nav.onclick = () => {
            nav.classList.toggle('nav-active')
            burger.classList.toggle('toggle')
        }
        burger.classList.toggle('toggle')
    })
}


// FireBase
function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    saveMessage(name, email, message);
    document.getElementById('contactForm').reset();
}
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database()
    .ref('Collected Data');

document.getElementById('contactForm')
    .addEventListener('submit', submitForm);

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
    })
    .then(() => {
        console.log('sent');
        document.querySelector('.reply').style.display = 'inline-flex'
        document.querySelector('.reply').style.backgroundColor = '#04CC00'
        document.querySelector('.img3').src = './images/success.png'
        document.querySelector('#mess').innerHTML = 'SENT SUCCESSFULLY'
        setTimeout(() => document.querySelector('.reply').style.display = 'none', 5000)
    })
    .catch(() => {
        document.querySelector('.reply').style.display = 'inline-flex'
        document.querySelector('.reply').style.backgroundColor = '#BD0000'
        document.querySelector('.img3').src = './images/error.png'
        document.querySelector('#mess').innerHTML = 'ERROR OCCURED PLEASE TRY AGAIN'
        setTimeout(() => document.querySelector('.reply').style.display = 'none', 5000)
    })
}

navSlide()