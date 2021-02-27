document.addEventListener("DOMContentLoaded",() =>{

    var imgArr = [];
    var selectedImageId = 0;
    var matchedImages = 0;

    for(let cnt=1;cnt < 13;cnt++){
        imgArr[cnt]=`img/${cnt}.png`;
        if(cnt > 6) {
            imgArr[cnt]=`img/${cnt-6}.png`;
        }
    }

    //select div element
    function draw() {
        const grid = document.querySelector(".grid");
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }
        for(let i=1;i<13;i++) {
            const baseImg = document.createElement('img');
            baseImg.src = "img/base.png"
            baseImg.setAttribute('id',i);
            baseImg.style.height = '100px';
            baseImg.style.width = '100px';
            grid.appendChild(baseImg);
            baseImg.addEventListener('click',flipCard);
        }
    }
    draw();

    function flipCard(event) {
        let currentImgId = event.srcElement.id;
        
        updateImg(currentImgId,imgArr[currentImgId]);
        
        setTimeout(function(){
            if(currentImgId != selectedImageId) {
                if(selectedImageId > 0) {
                        if(imgArr[currentImgId] == imgArr[selectedImageId]) {
                            correctSelection(currentImgId,selectedImageId);
                        } else {
                            wrongSelection(currentImgId,selectedImageId);
                        }
                        selectedImageId =0;
                    } else {
                        selectedImageId = currentImgId;
                    }
                }
                if(matchedImages == 12) {
                    alert('You won !');
                    draw();
                    matchedImages = 0;
                }
        
        },100);

    }

    function updateImg(id,src){
        const img = document.getElementById(id);
        img.src = src;
        img.style.height = '100px';
        img.style.width = '100px';
    }

    function disableClickEvent(id){
        const img2 = document.getElementById(id);
        img2.style.pointerEvents = 'none';
    }

    function correctSelection(currentImgId,selectedImageId){
        alert(' You got match');
        disableClickEvent(currentImgId);
        disableClickEvent(selectedImageId);
        matchedImages = matchedImages + 2;
    }

    function wrongSelection(currentImgId,selectedImageId){
        alert(' Wrong card selected !');
        updateImg(currentImgId,"img/base.png");
        updateImg(selectedImageId,"img/base.png");
    }

})