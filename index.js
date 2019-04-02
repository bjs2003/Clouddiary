//===========change pages=================================================================
document.getElementById("changetosignupbtn").addEventListener("click", function(){
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
});

document.getElementById("changetologinbtn").addEventListener("click", function(){
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
});

document.getElementById("newentrybtn").addEventListener("click", function(){
    document.getElementById("pageone").style.display = "none";
    document.getElementById("pagetwo").style.display = "block";
    document.getElementById("backbtn").style.display = "block";
});

document.getElementById("myentriesbtn").addEventListener("click", function(){
    document.getElementById("pageone").style.display = "none";
    document.getElementById("pagethree").style.display = "block";
    document.getElementById("backbtn").style.display = "block";
});

document.getElementById("backbtn").addEventListener("click", function(){
    document.getElementById("pageone").style.display = "block";
    document.getElementById("pagetwo").style.display = "none";
    document.getElementById("pagethree").style.display = "none";
});
//======================================================================================




//==================================read , write data=====================================
document.getElementById("readdatabtn").addEventListener("click", function(){
    
    var entrydate = document.getElementById("inputentrydate").value;
    var entrydata = document.getElementById("oldentries");
    console.log(entrydate);
    
    const uid = firebase.auth().currentUser.uid;
    const mydbref = firebase.database().ref().child('users').child(uid).child("entries").child(entrydate);
    
    const promise = mydbref.once('value')
        .then(function(snapshot){
            entrydata.innerHTML = snapshot.val().entrydata;
        })
        .catch(e => {
            entrydata.innerHTML = "No Entries Found";
        });
});

document.getElementById("writedatabtn").addEventListener("click", function(){
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    
    var entrydate = y + "-" + pad(m) + "-" + pad(d);
    var entrydata = document.getElementById("textentry").value;
    
    const uid = firebase.auth().currentUser.uid;
    const mydbref = firebase.database().ref().child('users').child(uid).child("entries").child(entrydate);
    
    mydbref.set({
            entrydata: entrydata
    });
});
//=========================================================================================






//===========login , logout, signup===================================================
document.getElementById("loginbtn").addEventListener("click", function(){
    //Get Email and Pass
    const email = document.getElementById("loginemail").value;
    const pass = document.getElementById("loginpassword").value;
    const auth = firebase.auth();
    
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => {
        console.log(e.message);
        alert(e.message);
    });
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
        .catch(e => {
            console.log(e.message);
            alert(e.message)
        });
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
        
        mydbref.once('value', snap => {
            readval.innerHTML = snap.val().username;
        });
        
    }else{
        console.log("not Logged in");
        document.getElementById("firstpage").style.display = "block";
        document.getElementById("homepage").style.display = "none";
    }
});
//===============================================================================================