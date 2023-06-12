const guessInput=document.getElementById('guess_input');
        const hintArea=document.querySelector('.hint');
        const guessBtn=document.getElementById('guess_btn');
        const restartBtn=document.getElementById('restart_btn');
        const showAnswerBtn=document.getElementById('show_answer_btn');

        let guessInput2, h1Element

        //宣告變數
        let minNum, maxNum, answerNum, guessNum


        

        // window.addEventListener("DOMContentLoaded",function(){
        //     // h1Element=this.document.querySelector("h1");
        //     init();
        // })

        showAnswerBtn.addEventListener('click',function(){
            alert(answerNum);
        })

        restartBtn.addEventListener('click',function(){
            init();
        })
        guessBtn.addEventListener('click',function(){
            guess();
        })

        window.onload=function(){
            init();
        }

        function guess(){
            const val=guessInput.value.trim();
            if(val===""||isNaN(val)||val[0]==="0"){
                alert("請輸入正確數字")
                guessInput.value="";
                return;
            }
            guessNum=parseInt(val)
            
            if(isInValidNumRange())
            return

            if(guessNum===answerNum){
                alert("恭喜答對! 答案就是"+answerNum);
                init();
                return
            }

            else if(guessNum<answerNum){
                minNum=guessNum;
            }
            else if(guessNum>answerNum){
                maxNum=guessNum;
            }
            guessInput.value="";
            showHint();
            
        }

        function isInValidNumRange(){
            if(guessNum<minNum||guessNum>maxNum){
                showHint();
                guessInput.value="";
                alert("請輸入正確範圍")
                return true
            }
            return false
        }
        function showHint(){
            // hintArea.innercontent=`請輸入${minNum} - ${maxNum}之間的數字`
            hintArea.textContent = `請輸入${minNum} - ${maxNum}之間的數字`
        }

        //預設值處理
        function init(){
            guessInput.value="";
            minNum=1;
            maxNum=100;
            answerNum=generateAnswer();
            showHint();
        }

        function generateAnswer(){
            return getRandomIntInclusive(minNum,maxNum)
        }
        function getRandomIntInclusive(min,max){
            min=Math.ceil(min);
            max=Math.floor(max);
            return Math.floor(Math.random()*(max-min+1)+min);
        }