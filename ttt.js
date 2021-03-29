//구조짜기
var body = document.body,
    container = document.createElement('div'),
    table = document.createElement('table'),
    btn = document.getElementById('reset'),
    blocks = [],
    lines = [],
    turn = "X",
    result = document.createElement('p');
    /*
    blocks = [
        [첫칸, 두칸, 세칸],
        [첫칸, 두칸, 세칸],
        [첫칸, 두칸, 세칸]
    ] //이차원 배열
    */
result.style.display="none";
var asCallback = function(ev){
    //console.log(ev.target); 내가 클릭한 대상 → block !!!
    //console.log(ev.target.parentNode); 내가 클릭한 대상의 부모태그 → line !!!
    //console.log(ev.target.parentNode.parentNode); 내가 클릭한 대상의 부모태그의 부모태그 → table !!!
    var whatLine = lines.indexOf(ev.target.parentNode);
    console.log("whatLine", whatLine);
    var whatBlock = blocks[whatLine].indexOf(ev.target);
    console.log("whatBlock", whatBlock);

    //칸이 이미 채워져 있는가?
    if (blocks[whatLine][whatBlock].textContent !== ""){ //빈칸이 아니면
        console.log("빈칸이 아닙니다.")
    } else { //빈칸이면
        blocks[whatLine][whatBlock].textContent = turn;

        //세칸이 다 채워졌나?
        var fill = false;
        //가로줄 검사
        if (
            blocks[whatLine][0].textContent === turn &&
            blocks[whatLine][1].textContent === turn &&
            blocks[whatLine][2].textContent === turn 
        ){
            fill = true;
        }
        //세로줄 검사
         if (
            blocks[0][whatBlock].textContent === turn &&
            blocks[1][whatBlock].textContent === turn &&
            blocks[2][whatBlock].textContent === turn 
        ){
            fill = true;
        }
        //대각선검사
        //whatLine - whatBlock 시 -를 제외한 절대값이 0 또는 2 이다
        if (whatLine - whatBlock === 0){ //0일때
            if (
                blocks[0][0].textContent === turn &&
                blocks[1][1].textContent === turn &&
                blocks[2][2].textContent === turn 
            ){
                fill = true;
            }
        }
        if (Math.abs(whatLine - whatBlock) === 2){ //2일때 (-2일경우를 대비해 절대값으로 만들어주는 Math.abs 사용)
            if (
                blocks[0][2].textContent === turn &&
                blocks[1][1].textContent === turn &&
                blocks[2][0].textContent === turn 
            ){
                fill = true;
            }
        }

        //다찼으면
        if(fill){
            result.style.display="flex";
            result.textContent = "Player" + turn + " WIN";
            // 리셋
            turn = 'X';
            blocks.forEach(function (line) {
                line.forEach(function (block) {
                    block.textContent = '';
                });
            });
        } else{ //다안찼으면
            result.style.display="none";
            if(turn === "X"){
                turn = "O";
            } else {
                turn = "X";
            }
        }
    }
};
for (var i = 1; i<=3; i+=1){
    var line = document.createElement('tr');
    lines.push(line);
    blocks.push([]);
    for (var j = 1; j <= 3; j += 1){
        var block = document.createElement('td');
        //click 이벤트
        block.addEventListener('click', asCallback); //변수에 저장해 좋은 비동기 콜백함수를 불러오기
        blocks[i - 1].push(block);
        line.appendChild(block);
    }
    table.appendChild(line);
}
body.appendChild(container);
container.appendChild(table);
container.appendChild(btn);
body.appendChild(result);
// console.log(blocks);

//rest 버튼
btn.addEventListener('click', function() {
    turn = 'X';
    result.style.display="none";
    blocks.forEach(function (line) {
        line.forEach(function (block) {
            block.textContent = '';
        });
    });
});



