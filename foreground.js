
// var script = document.createElement('script');
// script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);


// var svm = new SVM(options);

if (document.querySelectorAll("ul.k9GMp li span.g47SY").length !== 0)
{
    var present = document.querySelectorAll("ul.k9GMp li span.g47SY")
    var num_of_posts = present[0].textContent
    console.log(num_of_posts)
    chrome.storage.local.set({'num_of_posts':num_of_posts})
    var num_of_followers = present[1].textContent
    console.log(num_of_followers)
    chrome.storage.local.set({'num_of_followers':num_of_followers})
    var num_of_following = present[2].textContent
    console.log(num_of_following)
    var description = ""
    chrome.storage.local.set({'num_of_following':num_of_following})
    if (document.querySelectorAll("div.-vDIg span").length !== 0)
    {
        var description = document.querySelectorAll("div.-vDIg span")[0].textContent;
        console.log(description)
        chrome.storage.local.set({'description':description})

    }
    else{
        console.log(description)
        chrome.storage.local.set({'description':description})
    }
}



chrome.runtime.sendMessage({message:"check the storage"})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   console.log(request.message)
});



if (document.getElementById("first") === null)
{ 
    const first = document.createElement("button");
    first.innerText = "Check for Scammer" ;
    first.id = "first";
    document.querySelector('div.nZSzR').appendChild(first);
}


var URL1 = 'http://127.0.0.1:5000/';
// var data = {"payload": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};
// var data = '{"payload": [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]}';
var p = '{"payload":['.concat('"',description,'"',',','"',num_of_followers,'"',',','"',num_of_following,'"',',','"',num_of_posts,'"',']}')



first.addEventListener("click", function(e){
    e.preventDefault();

    const req = new XMLHttpRequest();
    const baseUrl = "http://127.0.0.1:5000/";
    // const urlParams = '{"payload": [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]}';
    req.open("POST", URL1, true);
    req.setRequestHeader("Content-type", "application/json");
    console.log(p)
    req.send(p);

    req.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) 
        {
            console.log(this.responseText);
        
    
                if (document.getElementById("banner") === null)
                { 
                    const ban = document.createElement("div");
                    var result = this.responseText
                    var benign_chance = result.split(/[[,]/)[1]
                    var scam_chance = result.split(/[,\]]/)[1]
                    message_to_user1 = "The probability of this account being scam is ".concat(scam_chance*100)
                    message_to_user2 = "\nThe probability of this account being bengin is ".concat(benign_chance*100)
                    if(benign_chance < scam_chance){
                        ban.innerText = message_to_user1.concat(message_to_user2, ".\n Please tread cautiously")
                    }
                    else{
                        ban.innerText = message_to_user1.concat(message_to_user2)
                    }

                    
                    
                    ban.id = "banner";
                    document.querySelector('section._9eogI').appendChild(ban);


                    } 
                }
        }
});   
    



// function doWork() {
//     // ajax the JSON to the server
//     jQuery.post("receiver", account_attributes, function(){
//     });
//     // stop link reloading the page
//     event.preventDefault();
// }

// // window.onload = function() {
// // 	// setup the button click
// // 	document.getElementById("first").onclick = function() {
// // 		doWork()
// // 	};
// // }


// first.addEventListener('click', () => {
//     console.log("damn")
//     doWork();
// });

// async function xor() {
//     const SVM = await
//     require('libsvm-js');
//     const svm = new SVM({
//         kernel: SVM.KERNEL_TYPES.RBF, // The type of kernel I want to use
//         type: SVM.SVM_TYPES.C_SVC,    // The type of SVM I want to run
//         gamma: 1,                     // RBF kernel gamma parameter
//         cost: 1                       // C_SVC cost parameter
//     });}

// fetch('http://127.0.0.1:5000', {method: 'Post', body :'{"payload": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}'})
// .then(result => results.json)
// .then(console.log);
// https://wmdkccnw05.execute-api.us-east-1.amazonaws.com/dev


// {"payload":["Bringing you closer to the people and things you love. ❤️For up-to-date COVID-19 information visit:","392m","52","6,756"]}