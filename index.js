//===========change pages=================================================================
document.getElementById("changetosignupbtn").addEventListener("click", function(){
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
});

document.getElementById("changetologinbtn").addEventListener("click", function(){
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
});

document.getElementById("writedatabtn").addEventListener("click", function(){
});

/*document.getElementById("enter").addEventListener("click", function(){
    
    
    document.getElementById("pageone").style.display = "none";
    document.getElementById("pagetwo").style.display = "block";
});*/
//======================================================================================





//===========login , logout, signup===================================================
document.getElementById("loginbtn").addEventListener("click", function(){
    //Get Email and Pass
    const email = document.getElementById("loginemail").value;
    const pass = document.getElementById("loginpassword").value;
    const auth = firebase.auth();
    
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
});


//=====================================================================================
document.getElementById("signupbtn").addEventListener("click", function(){
    //Get Email and Pass
    const email = document.getElementById("signupemail").value;
    const pass = document.getElementById("signuppassword").value;
    const uname = document.getElementById("signupusername").value;
    const auth = firebase.auth();
    
    //Sign up
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise
        .then(user => {
        const uid = firebase.auth().currentUser.uid;
        const mydbref = firebase.database().ref().child('users').child(uid);
        mydbref.set({
                username: uname
            });
        })
        .catch(e => console.log(e.message));
});


//==================================================================================
document.getElementById("logout").addEventListener("click", function(){
    firebase.auth().signOut();
});
//===========================================================================================





//===============================onAuthStateChange===========================================
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser);
        document.getElementById("firstpage").style.display = "none";
        document.getElementById("homepage").style.display = "block";
        
        var readval = document.getElementById("readuname");
        const uid = firebase.auth().currentUser.uid;
        const mydbref = firebase.database().ref().child('users').child(uid);
        
        mydbref.on('value', snap => {
            readval.innerHTML = snap.val().username;
        });
        
    }else{
        console.log("not Logged in");
        document.getElementById("firstpage").style.display = "block";
        document.getElementById("homepage").style.display = "none";
    }
});
//===============================================================================================