let bod = document.querySelector('body')
let btn = [], br = [], hr = [], num = [], count = 0, freedom = 0
let complete=[[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,'']]
let check = [[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8], [2,4,6]]
let strbtn = ['start', 'end', 'reset', 'upload','download']
let 색 = ['red','blue','white']

    //[[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8], [2,4,6]]
    //a1[a2[a3[ii,jj]]]
    //a3 => com (가로 세로 대각선 2차원 배열)
    //a2 => 작은 박스 (칸)
    //a1 => 버튼
    //info, chat status chat oo xx,
    //info에 먼저 들어있는 사람이 선공, oo : "1, 0-80, 1" and xx : "1, 0-80, 2", 관전 모드

for(let ii=0; ii<81+9; ii++) {

    num[ii] = 0
    btn[ii] = document.createElement('button')
    btn[ii].innerText = '　'
    btn[ii].style.backgroundColor = 'gray'
    btn[ii].id = "b"+ii


    if(ii != 0) {
        if(ii % 9 == 0) {  //9번째마다 줄바꿈
            br[ii] = document.createElement('br')
            bod.appendChild(br[ii])
        }

        if(ii % 27 == 0) {  //27번째마다 줄바꿈
            hr[ii] = document.createElement('hr')
            bod.appendChild(hr[ii])
        }
    }

    btn[ii].style = "margin-left: 20px; margin-bottom: 10px; width: 100px; height: 50px; font-size: 30px; background-color: gray;"

    if(ii % 3 == 2 && ii != 0) {
        btn[ii].style.marginRight = '20px';
    }

    bod.appendChild(btn[ii])


    btn[ii].onclick = (jj => {
        return() => click(jj)
    }) (ii)


    if(ii >= 81) {
        document.getElementById('b'+ii).style.backgroundColor = 'yellow'
        document.getElementById('b'+ii).innerHTML = strbtn[ii-9 ** 2]
    }
}


let 이전좌표들 = [0,0,0,0,0,0,0,0,0]
function click(aa) {
    let 눌린가로좌표, 눌린세로좌표, 이동할가로좌표, 이동할세로좌표, 완성된공식

    눌린가로좌표 = (aa - Math.floor(aa/9)*9)  %  3  //옮길 가로 위치를 0 or 1 or 2로 반환
    눌린세로좌표 = Math.floor(aa/9)  %  3  //옮길 세로 위치를 0 or 1 or 2로 반환

    이동할가로좌표 = 눌린가로좌표 * 3   //0 or 3 or 6
    이동할세로좌표 = 눌린세로좌표 * 27  //0 or 27 or 54

    if(count == 0) {  //맨 처음에는 무(無)제한
        document.getElementById(`b${aa}`).innerHTML = 'O'

        for(let ii=0; ii<9; ii++) {
            완성된공식 = Math.floor(ii/3)*9%27 + ii%3 + 이동할가로좌표 + 이동할세로좌표
            이전좌표들[ii] = 완성된공식
            document.getElementById(`b${완성된공식}`).style.backgroundColor = 'white'
        }
        count = 1
    } else {
         if(document.getElementById(`b${aa}`).style.backgroundColor == 'white' &&
            document.getElementById(`b${aa}`).style.backgroundColor != 'pink' &&   
            document.getElementById(`b${aa}`).innerHTML == '　') {  //클릭할 곳 제한
                for(let ii=0; ii<9; ii++) {  //흔적 지우기
                    document.getElementById(`b${이전좌표들[ii]}`).style.backgroundColor = 'gray';
                }

                if(count++ % 2 == 0) {
                    document.getElementById(`b${aa}`).innerHTML = 'O'
                } else {
                    document.getElementById(`b${aa}`).innerHTML = 'X'
                }
            
                checkComplete(aa)

                if(document.getElementById(`b${이동할가로좌표+이동할세로좌표}`).style.backgroundColor == 'pink') {  //이전 놈이 클릭한 곳이 지옥이면
                    freedom = 1

                    for(let ii=0; ii<81; ii++) {
                        if(document.getElementById(`b${ii}`).style.backgroundColor == 'gray') {
                            document.getElementById(`b${ii}`).style.backgroundColor = 'white'
                        }
                    }






                } else {
                    if(freedom == 1) {
                        for(let ii=0; ii<81; ii++) {
                            if(document.getElementById(`b${ii}`).style.backgroundColor == 'white') {
                                document.getElementById(`b${ii}`).style.backgroundColor = 'gray'
                            }
                        }
                    }
                    
                    
                    for(let ii=0; ii<9; ii++) {  //이동 & 색칠
                        완성된공식 = Math.floor(ii/3)*9%27 + ii%3 + 이동할가로좌표 + 이동할세로좌표
                        이전좌표들[ii] = 완성된공식
                        document.getElementById(`b${완성된공식}`).style.backgroundColor = 'white'
                    }
                }


        }
    } 
}

function checkComplete(aa) {
    //세로 3개, 가로 3개, 대각선 2개로 확인



    let 가로, 세로, 겨우찾은숫자들 = [0,0,0,0,0,0,0,0,0]
    
    가로 = Math.floor((aa-Math.floor(aa/9)*9)/3)
    세로 = Math.floor(aa/27)

    for(let ii=0; ii<9; ii++) {  //누른 칸의 수를 구하고
        겨우찾은숫자들[ii] = Math.floor(ii/3)*9%27 + ii%3 + 가로*3 + 세로*27
    }

    for(let ii=0; ii<8; ii++) {
        if(document.getElementById(`b${겨우찾은숫자들[check[ii][0]]}`).innerHTML==document.getElementById(`b${겨우찾은숫자들[check[ii][1]]}`).innerHTML &&
           document.getElementById(`b${겨우찾은숫자들[check[ii][1]]}`).innerHTML==document.getElementById(`b${겨우찾은숫자들[check[ii][2]]}`).innerHTML &&
           document.getElementById(`b${겨우찾은숫자들[check[ii][0]]}`).innerHTML!='　' &&
           document.getElementById(`b${겨우찾은숫자들[check[ii][1]]}`).innerHTML!='　' &&
           document.getElementById(`b${겨우찾은숫자들[check[ii][2]]}`).innerHTML!='　') {
            //현재 클릭한 칸을 좌측 상단으로부터 0,1,2,3,4,5,6,7,8 중 하나로 특정하여 complete의 해당 인덱스에 할당
            
            complete[Math.floor((Math.floor(겨우찾은숫자들[0]-Math.floor(겨우찾은숫자들[0]/9)*9))/3)+(Math.floor(겨우찾은숫자들[0]/27)*3)][0] = 1
            
            if(count % 2 == 0)
                complete[Math.floor((Math.floor(겨우찾은숫자들[0]-Math.floor(겨우찾은숫자들[0]/9)*9))/3)+(Math.floor(겨우찾은숫자들[0]/27)*3)][1] = 'O'
            else
                complete[Math.floor((Math.floor(겨우찾은숫자들[0]-Math.floor(겨우찾은숫자들[0]/9)*9))/3)+(Math.floor(겨우찾은숫자들[0]/27)*3)][1] = 'X'

            for(let ii=0; ii<9; ii++) {
                if(complete[ii][0] == 1) {
                    for(let jj=0; jj<9; jj++) {  //완성한 칸의 색을 변경
                        document.getElementById(`b${(Math.floor(jj/3)*9%27)+(jj%3)+(ii%3*3)+(Math.floor(ii/3)*27)}`).style.backgroundColor = 'pink';
                    }
                }
            }


            //또, 칸들이 완성되면 크게 확인

            for(let ii=0; ii<8; ii++) {
                if(complete[check[ii][0]][0] == complete[check[ii][1]][0] && complete[check[ii][1]][0] == complete[check[ii][2]][0] &&
                   complete[check[ii][0]][0] != 0 && complete[check[ii][1]][0] != 0 && complete[check[ii][2]][0] != 0 &&
                   complete[check[ii][0]][1] == complete[check[ii][1]][1] && complete[check[ii][1]][1] == complete[check[ii][2]][1]) {
                    
                    
                    console.log(`${complete[check[ii][1]][1]}의 승리`);
                    count = 0, complete=[[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,'']]
                    for(let ii=0; ii<81; ii++) { document.getElementById(`b${ii}`).innerHTML = '　' }
                }
            }
        }
    }
}
