async function showProblemDetails(probId){

  let dataPanel = document.getElementById("dataPanel");
  dataPanel.innerHTML = "";

  fetch(`/api/solvedac?problemId=${probId}`)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log(data);

    let nameP = document.createElement("p");
    nameP.textContent = "문제 제목 : " + data.titleKo;
    
    let levelP = document.createElement("p");
    levelP.textContent = "문제 난이도 : " + levelToTier(data.level);
    
    let solveUsersP = document.createElement("p");
    solveUsersP.textContent = "정답자 수 : " + data.acceptedUserCount;
    
    let avgTriesP = document.createElement("p");
    avgTriesP.textContent = "평균 시도 횟수 : " + data.averageTries;
    
    let tagP = document.createElement("p");
    tagP.textContent = "태그 : " + stringifyDataTags(data);

    dataPanel.appendChild(nameP);
    dataPanel.appendChild(levelP);
    dataPanel.appendChild(solveUsersP);
    dataPanel.appendChild(avgTriesP);
    dataPanel.appendChild(tagP);
  })
  .catch(error => {
    let warning = document.createElement("p");
    warning.innerText = error;
    dataPanel.appendChild(warning);
  });
}

function levelToTier(level){
  const tierList = ["브론즈 ", "실버 ", "골드 ", "플레티넘 ", "다이아몬드 ", "루비 "];
  const roman = ["", "I", "II", "III", "IV", "V"];

  if(level == 0) return "난이도 정보 없음";

  let tier = "";
  tier += tierList[Math.floor((level - 1) / 5)];
  tier += roman[5 - (level - 1) % 5];
  return tier;
}

function stringifyDataTags(data){

  if(data.tags.length == 0) return "태그 없음";

  let result = "";
  for(let i = 0 ; i < data.tags.length ; i++){
    if(i != data.tags.length - 1) result += data.tags[i].key + ", ";
    else result += data.tags[i].key;
  }
  return result;
}

document.getElementById("problemForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const probId = document.getElementById("probCode").value;
  showProblemDetails(probId);
});